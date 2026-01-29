/**
 * Firebase Analytics Integration for Ad System
 * 
 * Tracks ad impressions, conversions, and user behavior using Firebase Analytics
 */

import { analytics } from './config';
import { logEvent, setUserProperties, setUserId } from 'firebase/analytics';

// User subscription tiers
export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'attorney';

// Ad event types
export interface AdImpressionEvent {
  ad_slot: string;
  ad_size: string;
  page_location: string;
  user_tier: SubscriptionTier;
  ad_blocker_detected: boolean;
  viewport_width: number;
  viewport_height: number;
}

export interface ConversionEvent {
  from_tier: SubscriptionTier;
  to_tier: SubscriptionTier;
  conversion_source: 'upgrade_modal' | 'ad_click' | 'feature_gate' | 'direct';
  ad_interactions_count: number;
  session_duration: number;
  subscription_value: number;
}

export interface UpgradeModalEvent {
  modal_action: 'shown' | 'dismissed' | 'upgraded';
  trigger_reason: string;
  ad_impressions_since_last: number;
  modal_variation?: string;
  user_tier: SubscriptionTier;
}

class FirebaseAdAnalytics {
  private static instance: FirebaseAdAnalytics;

  private constructor() {}

  static getInstance(): FirebaseAdAnalytics {
    if (!FirebaseAdAnalytics.instance) {
      FirebaseAdAnalytics.instance = new FirebaseAdAnalytics();
    }
    return FirebaseAdAnalytics.instance;
  }

  // Initialize user tracking
  initializeUser(userId: string, tier: SubscriptionTier): void {
    if (!analytics) return;

    try {
      setUserId(analytics, userId);
      setUserProperties(analytics, {
        subscription_tier: tier,
        user_type: tier === 'free' ? 'free_user' : 'paid_user',
        last_activity: new Date().toISOString()
      });

      logEvent(analytics, 'user_initialized', {
        user_id: userId,
        subscription_tier: tier
      });
    } catch (error) {
      console.error('Firebase Analytics: Error initializing user:', error);
    }
  }

  // Track ad impressions
  trackAdImpression(event: AdImpressionEvent): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'ad_impression', {
        ...event,
        event_category: 'ads',
        timestamp: Date.now()
      });

      // Also track as custom event for detailed analysis
      logEvent(analytics, `ad_impression_${event.ad_size}`, {
        ad_slot: event.ad_slot,
        page_location: event.page_location,
        user_tier: event.user_tier
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking ad impression:', error);
    }
  }

  // Track subscription conversions
  trackConversion(event: ConversionEvent): void {
    if (!analytics) return;

    try {
      // Standard conversion event
      logEvent(analytics, 'purchase', {
        transaction_id: `${Date.now()}_${event.to_tier}`,
        value: event.subscription_value,
        currency: 'USD',
        items: [{
          item_id: event.to_tier,
          item_name: `${event.to_tier} Subscription`,
          category: 'subscription',
          quantity: 1,
          price: event.subscription_value
        }]
      });

      // Custom conversion tracking
      logEvent(analytics, 'subscription_upgrade', {
        ...event,
        event_category: 'conversion',
        timestamp: Date.now()
      });

      // Update user properties
      setUserProperties(analytics, {
        subscription_tier: event.to_tier,
        user_type: 'paid_user',
        conversion_source: event.conversion_source,
        last_upgrade: new Date().toISOString()
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking conversion:', error);
    }
  }

  // Track upgrade modal interactions
  trackUpgradeModal(event: UpgradeModalEvent): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'upgrade_modal_interaction', {
        ...event,
        event_category: 'engagement',
        timestamp: Date.now()
      });

      // Track specific modal actions
      if (event.modal_action === 'shown') {
        logEvent(analytics, 'upgrade_modal_shown', {
          trigger_reason: event.trigger_reason,
          user_tier: event.user_tier
        });
      } else if (event.modal_action === 'upgraded') {
        logEvent(analytics, 'upgrade_modal_conversion', {
          trigger_reason: event.trigger_reason,
          user_tier: event.user_tier,
          modal_variation: event.modal_variation
        });
      }
    } catch (error) {
      console.error('Firebase Analytics: Error tracking upgrade modal:', error);
    }
  }

  // Track ad blocker detection
  trackAdBlocker(detected: boolean, userAction?: 'disabled' | 'upgraded'): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'ad_blocker_detected', {
        ad_blocker_present: detected,
        user_action: userAction || 'none',
        event_category: 'ads',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking ad blocker:', error);
    }
  }

  // Track user engagement with ads
  trackAdEngagement(adSlot: string, engagementType: 'view' | 'click' | 'close'): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'ad_engagement', {
        ad_slot: adSlot,
        engagement_type: engagementType,
        event_category: 'ads',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking ad engagement:', error);
    }
  }

  // Track page views with ad context
  trackPageView(page: string, hasAds: boolean, adCount: number): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'page_view', {
        page_title: page,
        page_location: window.location.href,
        has_ads: hasAds,
        ad_count: adCount,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking page view:', error);
    }
  }

  // Track feature usage (for conversion attribution)
  trackFeatureUsage(feature: string, userTier: SubscriptionTier, adsSeen: number): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'feature_usage', {
        feature_name: feature,
        user_tier: userTier,
        ads_seen_in_session: adsSeen,
        event_category: 'engagement',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking feature usage:', error);
    }
  }

  // Custom events for A/B testing
  trackABTest(testName: string, variant: string, outcome?: 'converted' | 'dismissed'): void {
    if (!analytics) return;

    try {
      logEvent(analytics, 'ab_test_event', {
        test_name: testName,
        variant: variant,
        outcome: outcome || 'viewed',
        event_category: 'experiments',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Firebase Analytics: Error tracking A/B test:', error);
    }
  }
}

// Export singleton instance
export const firebaseAdAnalytics = FirebaseAdAnalytics.getInstance();

// Convenience functions for common events
export const trackAdImpression = (event: AdImpressionEvent) => 
  firebaseAdAnalytics.trackAdImpression(event);

export const trackConversion = (event: ConversionEvent) => 
  firebaseAdAnalytics.trackConversion(event);

export const trackUpgradeModal = (event: UpgradeModalEvent) => 
  firebaseAdAnalytics.trackUpgradeModal(event);

export const trackAdBlocker = (detected: boolean, userAction?: 'disabled' | 'upgraded') => 
  firebaseAdAnalytics.trackAdBlocker(detected, userAction);

export const initializeUserTracking = (userId: string, tier: SubscriptionTier) => 
  firebaseAdAnalytics.initializeUser(userId, tier);