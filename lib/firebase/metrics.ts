/**
 * Firebase Firestore Integration for Ad Metrics
 * 
 * Stores detailed ad performance data and user behavior for analysis
 */

import { db } from './config';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  increment, 
  serverTimestamp, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  writeBatch,
  onSnapshot
} from 'firebase/firestore';

// Collection names
const COLLECTIONS = {
  users: 'users',
  adMetrics: 'ad_metrics',
  conversions: 'conversions',
  sessions: 'user_sessions',
  experiments: 'ab_experiments'
} as const;

// User profile for ad targeting
export interface UserProfile {
  userId: string;
  email?: string;
  subscriptionTier: 'free' | 'basic' | 'pro' | 'attorney';
  createdAt: Date;
  lastActive: Date;
  totalAdImpressions: number;
  totalUpgradePrompts: number;
  conversionEvents: number;
  preferences: {
    cookiesAccepted: boolean;
    personalizedAds: boolean;
    marketingEmails: boolean;
  };
  behavior: {
    averageSessionDuration: number;
    pagesPerSession: number;
    featuresUsed: string[];
    lastUpgradePrompt: Date | null;
  };
}

// Ad metrics for performance tracking
export interface AdMetricsDocument {
  date: string; // YYYY-MM-DD
  metrics: {
    [adSlot: string]: {
      impressions: number;
      clicks: number;
      revenue: number;
      ctr: number; // click-through rate
      viewability: number; // percentage viewed
      uniqueUsers: number;
      conversions: number; // upgrades attributed to this ad
    };
  };
  totals: {
    impressions: number;
    clicks: number;
    revenue: number;
    conversions: number;
    uniqueUsers: number;
  };
}

class FirebaseAdMetrics {
  private static instance: FirebaseAdMetrics;

  private constructor() {}

  static getInstance(): FirebaseAdMetrics {
    if (!FirebaseAdMetrics.instance) {
      FirebaseAdMetrics.instance = new FirebaseAdMetrics();
    }
    return FirebaseAdMetrics.instance;
  }

  // Create or update user profile
  async upsertUserProfile(profile: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, COLLECTIONS.users, profile.userId!);
      
      await setDoc(userRef, {
        ...profile,
        lastActive: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });

    } catch (error) {
      console.error('Firestore: Error upserting user profile:', error);
      throw error;
    }
  }

  // Track ad impression in Firestore
  async trackAdImpression(data: {
    userId?: string;
    sessionId: string;
    adSlot: string;
    adSize: string;
    page: string;
    userTier: string;
    timestamp: Date;
    viewportSize: { width: number; height: number };
    adBlockerDetected: boolean;
  }): Promise<void> {
    try {
      const batch = writeBatch(db);

      // Update daily metrics
      const today = new Date().toISOString().split('T')[0];
      const metricsRef = doc(db, COLLECTIONS.adMetrics, today);
      
      batch.set(metricsRef, {
        date: today,
        [`metrics.${data.adSlot}.impressions`]: increment(1),
        [`metrics.${data.adSlot}.uniqueUsers`]: increment(data.userId ? 1 : 0),
        'totals.impressions': increment(1),
        'totals.uniqueUsers': increment(data.userId ? 1 : 0),
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update user profile if user is logged in
      if (data.userId) {
        const userRef = doc(db, COLLECTIONS.users, data.userId);
        batch.update(userRef, {
          totalAdImpressions: increment(1),
          lastActive: serverTimestamp()
        });
      }

      await batch.commit();

    } catch (error) {
      console.error('Firestore: Error tracking ad impression:', error);
    }
  }

  // Track subscription conversion
  async trackConversion(data: {
    userId: string;
    fromTier: string;
    toTier: string;
    conversionSource: string;
    adInteractions: number;
    sessionDuration: number;
    subscriptionValue: number;
    attributedAdSlot?: string;
  }): Promise<void> {
    try {
      const batch = writeBatch(db);

      // Create conversion record
      const conversionRef = doc(collection(db, COLLECTIONS.conversions));
      batch.set(conversionRef, {
        ...data,
        timestamp: serverTimestamp(),
        conversionId: conversionRef.id
      });

      // Update user profile
      const userRef = doc(db, COLLECTIONS.users, data.userId);
      batch.update(userRef, {
        subscriptionTier: data.toTier,
        conversionEvents: increment(1),
        lastUpgrade: serverTimestamp()
      });

      // Update daily metrics
      const today = new Date().toISOString().split('T')[0];
      const metricsRef = doc(db, COLLECTIONS.adMetrics, today);
      
      batch.set(metricsRef, {
        'totals.conversions': increment(1),
        'totals.revenue': increment(data.subscriptionValue),
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update specific ad slot metrics if attributed
      if (data.attributedAdSlot) {
        batch.set(metricsRef, {
          [`metrics.${data.attributedAdSlot}.conversions`]: increment(1),
          [`metrics.${data.attributedAdSlot}.revenue`]: increment(data.subscriptionValue)
        }, { merge: true });
      }

      await batch.commit();

    } catch (error) {
      console.error('Firestore: Error tracking conversion:', error);
      throw error;
    }
  }

  // Track upgrade modal interactions
  async trackUpgradeModal(data: {
    userId?: string;
    sessionId: string;
    action: 'shown' | 'dismissed' | 'upgraded';
    triggerReason: string;
    adImpressionsSinceLast: number;
    modalVariation?: string;
  }): Promise<void> {
    try {
      // Create interaction record
      const interactionRef = doc(collection(db, 'upgrade_modal_interactions'));
      await setDoc(interactionRef, {
        ...data,
        timestamp: serverTimestamp()
      });

      // Update user profile if available
      if (data.userId) {
        const userRef = doc(db, COLLECTIONS.users, data.userId);
        await updateDoc(userRef, {
          totalUpgradePrompts: increment(1),
          'behavior.lastUpgradePrompt': serverTimestamp()
        });
      }

    } catch (error) {
      console.error('Firestore: Error tracking upgrade modal:', error);
    }
  }

  // Get user's ad performance metrics
  async getUserAdMetrics(userId: string, days: number = 30): Promise<{
    impressions: number;
    clicks: number;
    upgradePrompts: number;
    conversions: number;
    averageSessionDuration: number;
  }> {
    try {
      const userRef = doc(db, COLLECTIONS.users, userId);
      const userDoc = await getDocs(query(
        collection(db, COLLECTIONS.users),
        where('userId', '==', userId),
        limit(1)
      ));

      if (userDoc.empty) {
        return {
          impressions: 0,
          clicks: 0,
          upgradePrompts: 0,
          conversions: 0,
          averageSessionDuration: 0
        };
      }

      const userData = userDoc.docs[0].data() as UserProfile;
      
      return {
        impressions: userData.totalAdImpressions || 0,
        clicks: 0, // Would need to implement click tracking
        upgradePrompts: userData.totalUpgradePrompts || 0,
        conversions: userData.conversionEvents || 0,
        averageSessionDuration: userData.behavior?.averageSessionDuration || 0
      };

    } catch (error) {
      console.error('Firestore: Error getting user ad metrics:', error);
      return {
        impressions: 0,
        clicks: 0,
        upgradePrompts: 0,
        conversions: 0,
        averageSessionDuration: 0
      };
    }
  }

  // Get overall ad performance metrics
  async getAdPerformance(days: number = 7): Promise<AdMetricsDocument[]> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);

      const metricsQuery = query(
        collection(db, COLLECTIONS.adMetrics),
        where('date', '>=', startDate.toISOString().split('T')[0]),
        where('date', '<=', endDate.toISOString().split('T')[0]),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(metricsQuery);
      return querySnapshot.docs.map(doc => doc.data() as AdMetricsDocument);

    } catch (error) {
      console.error('Firestore: Error getting ad performance:', error);
      return [];
    }
  }

  // Real-time subscription to conversion events
  subscribeToConversions(callback: (conversions: any[]) => void): () => void {
    const conversionsQuery = query(
      collection(db, COLLECTIONS.conversions),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    return onSnapshot(conversionsQuery, (snapshot) => {
      const conversions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(conversions);
    });
  }

  // A/B test management
  async trackABTestParticipation(data: {
    userId?: string;
    testName: string;
    variant: string;
    outcome?: 'converted' | 'dismissed';
  }): Promise<void> {
    try {
      const experimentRef = doc(collection(db, COLLECTIONS.experiments));
      await setDoc(experimentRef, {
        ...data,
        timestamp: serverTimestamp()
      });

    } catch (error) {
      console.error('Firestore: Error tracking A/B test:', error);
    }
  }

  // Bulk update for performance
  async batchUpdateMetrics(updates: Array<{
    collection: string;
    docId: string;
    data: any;
  }>): Promise<void> {
    try {
      const batch = writeBatch(db);

      updates.forEach(update => {
        const docRef = doc(db, update.collection, update.docId);
        batch.set(docRef, update.data, { merge: true });
      });

      await batch.commit();

    } catch (error) {
      console.error('Firestore: Error in batch update:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const firebaseAdMetrics = FirebaseAdMetrics.getInstance();

// Convenience functions
export const trackUserProfile = (profile: Partial<UserProfile>) => 
  firebaseAdMetrics.upsertUserProfile(profile);

export const trackAdImpressionFirestore = (data: Parameters<typeof firebaseAdMetrics.trackAdImpression>[0]) => 
  firebaseAdMetrics.trackAdImpression(data);

export const trackConversionFirestore = (data: Parameters<typeof firebaseAdMetrics.trackConversion>[0]) => 
  firebaseAdMetrics.trackConversion(data);

export const trackUpgradeModalFirestore = (data: Parameters<typeof firebaseAdMetrics.trackUpgradeModal>[0]) => 
  firebaseAdMetrics.trackUpgradeModal(data);