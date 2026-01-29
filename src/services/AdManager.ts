/**
 * Ad Manager Service
 * 
 * Manages ad display rules, frequency capping, user behavior tracking,
 * and upgrade modal triggers for free-to-paid conversion optimization
 */

import { detectAdBlocker, AdBlockerDetectionResult } from '../utils/adBlockDetection';
import { trackAdImpression, trackUpgradeModal, trackAdBlocker } from '@/lib/firebase/analytics';
import { trackAdImpressionFirestore, trackUpgradeModalFirestore } from '@/lib/firebase/metrics';

export type AdFormat = 'display' | 'in-article' | 'overlay' | 'sidebar' | 'banner';
export type TriggerType = 'task_complete' | 'time_based' | 'usage_based' | 'page_view';
export type UserTier = 'free' | 'basic' | 'pro' | 'attorney';

export interface AdRules {
  maxOverlaysPerSession: number;
  minutesBetweenOverlays: number;
  showOnTaskCompletion: boolean;
  tasksBeforeFirstOverlay: number;
  maxAdsPerPage: number;
  cooldownBetweenSessions: number; // minutes
}

export interface AdMetrics {
  sessionImpressions: number;
  totalImpressions: number;
  overlaysShown: number;
  upgradePromptsShown: number;
  lastOverlayTime: number;
  lastUpgradePrompt: number;
  sessionStartTime: number;
  tasksCompleted: number;
  adClicks: number;
  upgradeModalViews: number;
  upgradeConversions: number;
}

export interface UserBehavior {
  aiPromptsCount: number;
  documentsGenerated: number;
  resourcesViewed: number;
  sessionDuration: number;
  averageSessionLength: number;
  daysActive: number;
  lastActiveDate: string;
  signupDate: string;
}

export interface UpgradeModalConfig {
  title: string;
  message: string;
  primaryCTA: string;
  secondaryCTA: string;
  benefits: string[];
  urgency?: string;
  discount?: {
    percentage: number;
    code: string;
    expiresAt: string;
  };
}

const DEFAULT_AD_RULES: AdRules = {
  maxOverlaysPerSession: 2,
  minutesBetweenOverlays: 5,
  showOnTaskCompletion: true,
  tasksBeforeFirstOverlay: 1,
  maxAdsPerPage: 3,
  cooldownBetweenSessions: 30
};

class AdManager {
  private static instance: AdManager;
  private rules: AdRules;
  private metrics: AdMetrics;
  private userBehavior: UserBehavior;
  private userTier: UserTier;
  private adBlockerStatus: AdBlockerDetectionResult | null = null;
  private upgradeModalCallback: ((config: UpgradeModalConfig) => Promise<boolean>) | null = null;
  private analyticsCallback: ((event: string, data: any) => void) | null = null;

  private constructor() {
    this.rules = { ...DEFAULT_AD_RULES };
    this.metrics = this.initializeMetrics();
    this.userBehavior = this.initializeUserBehavior();
    this.userTier = 'free';
    this.loadFromStorage();
  }

  static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager();
    }
    return AdManager.instance;
  }

  /**
   * Initialize the ad manager with user configuration
   */
  initialize(config: {
    userTier: UserTier;
    rules?: Partial<AdRules>;
    upgradeModalCallback?: (config: UpgradeModalConfig) => Promise<boolean>;
    analyticsCallback?: (event: string, data: any) => void;
  }): void {
    this.userTier = config.userTier;
    
    if (config.rules) {
      this.rules = { ...this.rules, ...config.rules };
    }
    
    if (config.upgradeModalCallback) {
      this.upgradeModalCallback = config.upgradeModalCallback;
    }
    
    if (config.analyticsCallback) {
      this.analyticsCallback = config.analyticsCallback;
    }

    // Detect ad blocker for free users
    if (this.userTier === 'free') {
      this.detectAdBlocker();
    }

    // Reset session if enough time has passed
    this.checkSessionReset();

    console.log(`🎯 AdManager initialized for ${this.userTier} user`);
  }

  /**
   * Check if ads should be shown for current user
   */
  shouldShowAds(): boolean {
    return this.userTier === 'free';
  }

  /**
   * Check if overlay ad should be shown
   */
  shouldShowOverlayAd(trigger: TriggerType): boolean {
    // Never show to paid users
    if (!this.shouldShowAds()) {
      return false;
    }

    // Check overlay frequency limits
    if (this.metrics.overlaysShown >= this.rules.maxOverlaysPerSession) {
      console.log('🚫 Overlay ad blocked: Session limit reached');
      return false;
    }

    // Check time between overlays
    const now = Date.now();
    const timeSinceLastOverlay = (now - this.metrics.lastOverlayTime) / (1000 * 60); // minutes
    
    if (timeSinceLastOverlay < this.rules.minutesBetweenOverlays) {
      console.log(`🚫 Overlay ad blocked: Too soon (${timeSinceLastOverlay.toFixed(1)}min)`);
      return false;
    }

    // Check task completion requirements
    if (trigger === 'task_complete' && this.rules.showOnTaskCompletion) {
      if (this.metrics.tasksCompleted < this.rules.tasksBeforeFirstOverlay) {
        console.log('🚫 Overlay ad blocked: Not enough tasks completed');
        return false;
      }
    }

    // Check usage-based triggers
    if (trigger === 'usage_based') {
      return this.shouldShowUsageBasedModal();
    }

    // Check time-based triggers
    if (trigger === 'time_based') {
      return this.shouldShowTimeBasedModal();
    }

    return true;
  }

  /**
   * Record ad impression and update metrics
   */
  trackAdImpression(adFormat: AdFormat, adSlot?: string, userId?: string): void {
    this.metrics.sessionImpressions++;
    this.metrics.totalImpressions++;

    if (adFormat === 'overlay') {
      this.metrics.overlaysShown++;
      this.metrics.lastOverlayTime = Date.now();
    }

    // Track in Firebase Analytics
    trackAdImpression({
      ad_slot: adSlot || `${adFormat}_default`,
      ad_size: adFormat,
      page_location: typeof window !== 'undefined' ? window.location.pathname : '',
      user_tier: this.userTier,
      ad_blocker_detected: false, // Will be updated with actual detection
      viewport_width: typeof window !== 'undefined' ? window.innerWidth : 0,
      viewport_height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    // Track in Firestore for detailed analysis
    if (typeof window !== 'undefined') {
      trackAdImpressionFirestore({
        userId,
        sessionId: this.getSessionId(),
        adSlot: adSlot || `${adFormat}_default`,
        adSize: adFormat,
        page: window.location.pathname,
        userTier: this.userTier,
        timestamp: new Date(),
        viewportSize: { width: window.innerWidth, height: window.innerHeight },
        adBlockerDetected: false // Will be updated with actual detection
      });
    }

    // Legacy analytics tracking
    this.trackEvent('ad_impression', {
      adFormat,
      adSlot,
      sessionImpressions: this.metrics.sessionImpressions,
      totalImpressions: this.metrics.totalImpressions,
      userTier: this.userTier,
      timestamp: Date.now()
    });

    this.saveToStorage();
    console.log(`📊 Ad impression tracked: ${adFormat} (${this.metrics.sessionImpressions} this session)`);
  }

  /**
   * Record task completion
   */
  trackTaskCompletion(taskType: string): void {
    this.metrics.tasksCompleted++;
    this.userBehavior.documentsGenerated++;
    
    this.trackEvent('task_completed', {
      taskType,
      totalTasks: this.metrics.tasksCompleted,
      userTier: this.userTier
    });

    this.saveToStorage();
    console.log(`✅ Task completed: ${taskType} (${this.metrics.tasksCompleted} total)`);
  }

  /**
   * Show upgrade modal with dynamic messaging
   */
  async showUpgradeModal(trigger: TriggerType): Promise<boolean> {
    if (!this.upgradeModalCallback) {
      console.warn('⚠️ Upgrade modal callback not set');
      return false;
    }

    // Track upgrade prompt
    this.metrics.upgradePromptsShown++;
    this.metrics.upgradeModalViews++;
    this.metrics.lastUpgradePrompt = Date.now();

    // Generate dynamic message based on user behavior
    const config = this.generateUpgradeModalConfig(trigger);

    // Track modal shown
    this.trackEvent('upgrade_modal_shown', {
      trigger,
      message: config.message,
      userTier: this.userTier,
      tasksCompleted: this.metrics.tasksCompleted,
      sessionImpressions: this.metrics.sessionImpressions
    });

    try {
      const converted = await this.upgradeModalCallback(config);
      
      if (converted) {
        this.metrics.upgradeConversions++;
        this.trackEvent('upgrade_modal_converted', {
          trigger,
          conversionTime: Date.now() - this.metrics.lastUpgradePrompt,
          userTier: this.userTier
        });
      }

      this.saveToStorage();
      return converted;
    } catch (error) {
      console.error('Error showing upgrade modal:', error);
      return false;
    }
  }

  /**
   * Update user behavior metrics
   */
  updateUserBehavior(updates: Partial<UserBehavior>): void {
    this.userBehavior = { ...this.userBehavior, ...updates };
    this.saveToStorage();
  }

  /**
   * Reset session metrics (called on new session)
   */
  resetSession(): void {
    this.metrics.sessionImpressions = 0;
    this.metrics.overlaysShown = 0;
    this.metrics.tasksCompleted = 0;
    this.metrics.sessionStartTime = Date.now();
    this.saveToStorage();
    console.log('🔄 Ad session reset');
  }

  /**
   * Get current metrics
   */
  getMetrics(): AdMetrics {
    return { ...this.metrics };
  }

  /**
   * Get user behavior data
   */
  getUserBehavior(): UserBehavior {
    return { ...this.userBehavior };
  }

  /**
   * Check if ad blocker is detected
   */
  isAdBlockerDetected(): boolean {
    return this.adBlockerStatus?.isBlocked || false;
  }

  /**
   * Get ad blocker detection details
   */
  getAdBlockerStatus(): AdBlockerDetectionResult | null {
    return this.adBlockerStatus;
  }

  // Private methods

  private initializeMetrics(): AdMetrics {
    return {
      sessionImpressions: 0,
      totalImpressions: 0,
      overlaysShown: 0,
      upgradePromptsShown: 0,
      lastOverlayTime: 0,
      lastUpgradePrompt: 0,
      sessionStartTime: Date.now(),
      tasksCompleted: 0,
      adClicks: 0,
      upgradeModalViews: 0,
      upgradeConversions: 0
    };
  }

  private initializeUserBehavior(): UserBehavior {
    return {
      aiPromptsCount: 0,
      documentsGenerated: 0,
      resourcesViewed: 0,
      sessionDuration: 0,
      averageSessionLength: 0,
      daysActive: 0,
      lastActiveDate: new Date().toISOString(),
      signupDate: new Date().toISOString()
    };
  }

  private async detectAdBlocker(): Promise<void> {
    try {
      this.adBlockerStatus = await detectAdBlocker();
      
      if (this.adBlockerStatus.isBlocked) {
        this.trackEvent('ad_blocker_detected', {
          method: this.adBlockerStatus.method,
          confidence: this.adBlockerStatus.confidence,
          userTier: this.userTier
        });
        console.log('🚫 Ad blocker detected:', this.adBlockerStatus);
      }
    } catch (error) {
      console.error('Error detecting ad blocker:', error);
    }
  }

  private checkSessionReset(): void {
    const now = Date.now();
    const sessionAge = (now - this.metrics.sessionStartTime) / (1000 * 60); // minutes
    
    if (sessionAge > this.rules.cooldownBetweenSessions) {
      this.resetSession();
    }
  }

  private shouldShowUsageBasedModal(): boolean {
    const { aiPromptsCount, documentsGenerated } = this.userBehavior;
    
    // Power user (20+ AI prompts)
    if (aiPromptsCount >= 20) return true;
    
    // Document generator (5+ documents)
    if (documentsGenerated >= 5) return true;
    
    return false;
  }

  private shouldShowTimeBasedModal(): boolean {
    const now = Date.now();
    const sessionDuration = (now - this.metrics.sessionStartTime) / (1000 * 60); // minutes
    
    // Show after 10 minutes of usage
    return sessionDuration >= 10;
  }

  private generateUpgradeModalConfig(trigger: TriggerType): UpgradeModalConfig {
    const { aiPromptsCount, documentsGenerated } = this.userBehavior;
    
    // Power user messaging
    if (aiPromptsCount >= 20) {
      return {
        title: "You're a Power User! 🚀",
        message: "You've used ellio extensively! Upgrade to Basic for unlimited AI consultations and zero ads.",
        primaryCTA: "Upgrade for $9.99/mo",
        secondaryCTA: "Maybe Later",
        benefits: [
          "Unlimited AI legal consultations",
          "Zero advertisements",
          "Priority support",
          "Advanced document templates"
        ],
        urgency: "Join 50,000+ professionals using ellio ad-free"
      };
    }
    
    // Document generator messaging
    if (documentsGenerated >= 3) {
      return {
        title: "Generate Unlimited Documents 📄",
        message: "You're generating lots of legal documents! Upgrade to remove ads and get unlimited access.",
        primaryCTA: "Upgrade for $9.99/mo",
        secondaryCTA: "Continue with Ads",
        benefits: [
          "Unlimited document generation",
          "No ads during document creation",
          "Premium templates library",
          "Export to multiple formats"
        ]
      };
    }
    
    // Task completion messaging
    if (trigger === 'task_complete') {
      return {
        title: "Great Job! 👏",
        message: "Task completed! Support ellio and remove all ads by upgrading to Basic.",
        primaryCTA: "Remove Ads - $9.99/mo",
        secondaryCTA: "Continue with Ads",
        benefits: [
          "Ad-free experience",
          "Faster page loading",
          "Unlimited features",
          "Support independent legal tech"
        ]
      };
    }
    
    // Default casual user messaging
    return {
      title: "Enjoying ellio? ❤️",
      message: "Remove all advertisements and support ellio's development.",
      primaryCTA: "Upgrade for $9.99/mo",
      secondaryCTA: "Maybe Later",
      benefits: [
        "Complete ad removal",
        "Unlimited AI consultations",
        "Priority support",
        "Help keep ellio independent"
      ]
    };
  }

  private trackEvent(event: string, data: any): void {
    if (this.analyticsCallback) {
      this.analyticsCallback(event, data);
    }
  }

  private saveToStorage(): void {
    try {
      const data = {
        metrics: this.metrics,
        userBehavior: this.userBehavior,
        timestamp: Date.now()
      };
      localStorage.setItem('ellio_ad_manager', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save ad manager data:', error);
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return; // Skip on server-side
    
    try {
      const data = localStorage.getItem('ellio_ad_manager');
      if (data) {
        const parsed = JSON.parse(data);
        this.metrics = { ...this.metrics, ...parsed.metrics };
        this.userBehavior = { ...this.userBehavior, ...parsed.userBehavior };
      }
    } catch (error) {
      console.warn('Failed to load ad manager data:', error);
    }
  }

  // Helper methods for Firebase integration
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem('ellio_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('ellio_session_id', sessionId);
    }
    return sessionId;
  }
}

// Export singleton instance
export const adManager = AdManager.getInstance();

// Export convenience methods
export const shouldShowAds = (): boolean => adManager.shouldShowAds();
export const shouldShowOverlayAd = (trigger: TriggerType): boolean => adManager.shouldShowOverlayAd(trigger);
export const trackAdImpressionLocal = (format: AdFormat, slot?: string): void => adManager.trackAdImpression(format, slot);
export const trackTaskCompletion = (taskType: string): void => adManager.trackTaskCompletion(taskType);
export const showUpgradeModal = (trigger: TriggerType): Promise<boolean> => adManager.showUpgradeModal(trigger);

export default adManager;