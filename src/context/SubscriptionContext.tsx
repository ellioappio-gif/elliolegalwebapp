/**
 * Subscription Context
 * 
 * Manages user subscription state, ad metrics, and provides hooks for
 * subscription-related functionality across the application
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { adManager, AdMetrics, UserBehavior, TriggerType, UpgradeModalConfig } from '../services/AdManager';
import type { UserTier } from '../services/AdManager';

export interface SubscriptionContextType {
  // Subscription state
  tier: UserTier;
  isPremium: boolean;
  isLoading: boolean;
  
  // Ad metrics
  adMetrics: AdMetrics;
  userBehavior: UserBehavior;
  
  // Ad management
  shouldShowAds: boolean;
  isAdBlockerDetected: boolean;
  
  // Actions
  updateTier: (newTier: UserTier) => void;
  trackAdImpression: (format: string, slot?: string) => void;
  trackTaskCompletion: (taskType: string) => void;
  trackUpgradePrompt: (trigger: TriggerType) => Promise<boolean>;
  updateUserBehavior: (updates: Partial<UserBehavior>) => void;
  
  // Upgrade flow
  showUpgradeModal: (config: UpgradeModalConfig) => Promise<boolean>;
  setUpgradeModalHandler: (handler: (config: UpgradeModalConfig) => Promise<boolean>) => void;
  
  // Analytics
  trackEvent: (event: string, data: any) => void;
  setAnalyticsHandler: (handler: (event: string, data: any) => void) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export interface SubscriptionProviderProps {
  children: ReactNode;
  initialTier?: UserTier;
  userId?: string;
  analyticsEnabled?: boolean;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
  initialTier = 'free',
  userId,
  analyticsEnabled = true
}) => {
  const [tier, setTier] = useState<UserTier>(initialTier);
  const [isLoading, setIsLoading] = useState(true);
  const [adMetrics, setAdMetrics] = useState<AdMetrics>(adManager.getMetrics());
  const [userBehavior, setUserBehavior] = useState<UserBehavior>(adManager.getUserBehavior());
  const [upgradeModalHandler, setUpgradeModalHandler] = useState<((config: UpgradeModalConfig) => Promise<boolean>) | null>(null);
  const [analyticsHandler, setAnalyticsHandler] = useState<((event: string, data: any) => void) | null>(null);

  const isPremium = tier !== 'free';
  const shouldShowAds = tier === 'free';
  const isAdBlockerDetected = adManager.isAdBlockerDetected();

  // Initialize ad manager
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      
      try {
        // Initialize ad manager with current configuration
        adManager.initialize({
          userTier: tier,
          upgradeModalCallback: upgradeModalHandler || undefined,
          analyticsCallback: analyticsHandler || undefined
        });

        // Load current metrics
        setAdMetrics(adManager.getMetrics());
        setUserBehavior(adManager.getUserBehavior());
        
        console.log(`✅ Subscription context initialized for ${tier} user`);
      } catch (error) {
        console.error('Failed to initialize subscription context:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [tier, upgradeModalHandler, analyticsHandler]);

  // Update tier and reinitialize ad manager
  const updateTier = useCallback((newTier: UserTier) => {
    console.log(`🔄 Updating subscription tier: ${tier} → ${newTier}`);
    
    const wasUpgrade = tier === 'free' && newTier !== 'free';
    
    setTier(newTier);
    
    // Track conversion if upgraded from free
    if (wasUpgrade && analyticsHandler) {
      analyticsHandler('free_to_paid_conversion', {
        fromTier: tier,
        toTier: newTier,
        userId,
        timestamp: Date.now(),
        metrics: adManager.getMetrics()
      });
    }
    
    // Reset ad manager for new tier
    if (newTier !== 'free') {
      adManager.resetSession();
    }
  }, [tier, userId, analyticsHandler]);

  // Track ad impression wrapper
  const trackAdImpression = useCallback((format: string, slot?: string) => {
    if (!shouldShowAds) return;
    
    adManager.trackAdImpression(format as any, slot);
    setAdMetrics(adManager.getMetrics());
    
    // Optional: Real-time sync to backend
    if (analyticsHandler) {
      analyticsHandler('ad_impression', {
        format,
        slot,
        userId,
        timestamp: Date.now()
      });
    }
  }, [shouldShowAds, userId, analyticsHandler]);

  // Track task completion wrapper
  const trackTaskCompletion = useCallback((taskType: string) => {
    adManager.trackTaskCompletion(taskType);
    setAdMetrics(adManager.getMetrics());
    setUserBehavior(adManager.getUserBehavior());
    
    if (analyticsHandler) {
      analyticsHandler('task_completed', {
        taskType,
        userId,
        timestamp: Date.now()
      });
    }
  }, [userId, analyticsHandler]);

  // Track upgrade prompt
  const trackUpgradePrompt = useCallback(async (trigger: TriggerType): Promise<boolean> => {
    if (!shouldShowAds) return false;
    
    try {
      const converted = await adManager.showUpgradeModal(trigger);
      setAdMetrics(adManager.getMetrics());
      
      return converted;
    } catch (error) {
      console.error('Error showing upgrade modal:', error);
      return false;
    }
  }, [shouldShowAds]);

  // Update user behavior
  const updateUserBehavior = useCallback((updates: Partial<UserBehavior>) => {
    adManager.updateUserBehavior(updates);
    setUserBehavior(adManager.getUserBehavior());
  }, []);

  // Show upgrade modal (direct call)
  const showUpgradeModal = useCallback(async (config: UpgradeModalConfig): Promise<boolean> => {
    if (!upgradeModalHandler) {
      console.warn('⚠️ No upgrade modal handler set');
      return false;
    }
    
    try {
      const result = await upgradeModalHandler(config);
      setAdMetrics(adManager.getMetrics());
      return result;
    } catch (error) {
      console.error('Error showing upgrade modal:', error);
      return false;
    }
  }, [upgradeModalHandler]);

  // Set upgrade modal handler
  const setUpgradeModalHandlerCallback = useCallback((handler: (config: UpgradeModalConfig) => Promise<boolean>) => {
    setUpgradeModalHandler(() => handler);
  }, []);

  // Track generic event
  const trackEvent = useCallback((event: string, data: any) => {
    if (analyticsHandler) {
      analyticsHandler(event, {
        ...data,
        userId,
        userTier: tier,
        timestamp: Date.now()
      });
    }
  }, [analyticsHandler, userId, tier]);

  // Set analytics handler
  const setAnalyticsHandlerCallback = useCallback((handler: (event: string, data: any) => void) => {
    setAnalyticsHandler(() => handler);
  }, []);

  // Periodic metrics refresh
  useEffect(() => {
    if (!shouldShowAds) return;
    
    const interval = setInterval(() => {
      setAdMetrics(adManager.getMetrics());
      setUserBehavior(adManager.getUserBehavior());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [shouldShowAds]);

  const contextValue: SubscriptionContextType = {
    // Subscription state
    tier,
    isPremium,
    isLoading,
    
    // Ad metrics
    adMetrics,
    userBehavior,
    
    // Ad management
    shouldShowAds,
    isAdBlockerDetected,
    
    // Actions
    updateTier,
    trackAdImpression,
    trackTaskCompletion,
    trackUpgradePrompt,
    updateUserBehavior,
    
    // Upgrade flow
    showUpgradeModal,
    setUpgradeModalHandler: setUpgradeModalHandlerCallback,
    
    // Analytics
    trackEvent,
    setAnalyticsHandler: setAnalyticsHandlerCallback
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Hook for using subscription context
export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  
  return context;
};

// Additional convenience hooks
export const useAdMetrics = () => {
  const { adMetrics, trackAdImpression, trackTaskCompletion } = useSubscription();
  return { adMetrics, trackAdImpression, trackTaskCompletion };
};

export const usePremiumCheck = () => {
  const { isPremium, tier, shouldShowAds } = useSubscription();
  return { isPremium, tier, shouldShowAds };
};

export const useUpgradeFlow = () => {
  const { 
    showUpgradeModal, 
    setUpgradeModalHandler, 
    trackUpgradePrompt,
    tier,
    isPremium 
  } = useSubscription();
  
  return { 
    showUpgradeModal, 
    setUpgradeModalHandler, 
    trackUpgradePrompt,
    tier,
    isPremium 
  };
};

// HOC for premium content protection
export function withPremiumCheck<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<P>
) {
  return function PremiumProtectedComponent(props: P) {
    const { isPremium, isLoading } = useSubscription();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!isPremium && fallback) {
      const FallbackComponent = fallback;
      return <FallbackComponent {...props} />;
    }
    
    if (!isPremium) {
      return <div>Premium feature - upgrade to access</div>;
    }
    
    return <Component {...props} />;
  };
}

export default SubscriptionContext;