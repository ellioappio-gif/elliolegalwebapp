/**
 * Google AdSense Script Loader and Utilities
 * 
 * Handles AdSense script loading, ad initialization, and window type declarations
 * Only loads for free tier users to optimize performance for paid users
 */

declare global {
  interface Window {
    adsbygoogle: any[];
    googletag?: any;
  }
}

export interface AdSenseConfig {
  publisherId: string;
  testMode?: boolean;
  enableLazyLoading?: boolean;
  adBlockRecovery?: boolean;
}

// AdSense script URLs
const ADSENSE_SCRIPT_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
const ADSENSE_AUTO_ADS_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=';

class AdSenseLoader {
  private static instance: AdSenseLoader;
  private isLoaded = false;
  private isLoading = false;
  private publisherId: string | null = null;
  private loadPromise: Promise<boolean> | null = null;

  static getInstance(): AdSenseLoader {
    if (!AdSenseLoader.instance) {
      AdSenseLoader.instance = new AdSenseLoader();
    }
    return AdSenseLoader.instance;
  }

  /**
   * Load AdSense script with configuration
   */
  async loadAdSense(config: AdSenseConfig): Promise<boolean> {
    // Don't load if already loaded or loading
    if (this.isLoaded) return true;
    if (this.isLoading && this.loadPromise) return this.loadPromise;

    this.isLoading = true;
    this.publisherId = config.publisherId;

    this.loadPromise = new Promise((resolve, reject) => {
      try {
        // Initialize adsbygoogle array if not exists
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Create script element
        const script = document.createElement('script');
        script.src = `${ADSENSE_SCRIPT_URL}?client=${config.publisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';

        // Add data attributes for additional features
        if (config.enableLazyLoading) {
          script.setAttribute('data-ad-frequency-hint', '30s');
        }
        
        if (config.adBlockRecovery) {
          script.setAttribute('data-adbreak-test', 'on');
        }

        // Handle load events
        script.onload = () => {
          console.log('✅ AdSense script loaded successfully');
          this.isLoaded = true;
          this.isLoading = false;
          
          // Initialize auto ads if enabled
          if (config.publisherId) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: config.publisherId,
                enable_page_level_ads: true,
                tag_partner: "site_kit"
              });
            } catch (error) {
              console.warn('Auto ads initialization failed:', error);
            }
          }
          
          resolve(true);
        };

        script.onerror = (error) => {
          console.error('❌ Failed to load AdSense script:', error);
          this.isLoading = false;
          resolve(false); // Don't reject, just return false
        };

        // Add to document head
        document.head.appendChild(script);

        // Timeout fallback
        setTimeout(() => {
          if (this.isLoading) {
            console.warn('⚠️ AdSense script loading timeout');
            this.isLoading = false;
            resolve(false);
          }
        }, 10000); // 10 second timeout

      } catch (error) {
        console.error('❌ Error loading AdSense:', error);
        this.isLoading = false;
        resolve(false);
      }
    });

    return this.loadPromise;
  }

  /**
   * Initialize individual ad unit
   */
  initializeAd(elementId: string): boolean {
    if (!this.isLoaded || !window.adsbygoogle) {
      console.warn('AdSense not loaded, cannot initialize ad');
      return false;
    }

    try {
      // Find the ad element
      const adElement = document.getElementById(elementId);
      if (!adElement) {
        console.error(`Ad element not found: ${elementId}`);
        return false;
      }

      // Push to AdSense queue
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      
      return true;
    } catch (error) {
      console.error('Error initializing ad:', error);
      return false;
    }
  }

  /**
   * Refresh ads on page (useful for SPA navigation)
   */
  refreshAds(): void {
    if (!this.isLoaded || !window.adsbygoogle) {
      return;
    }

    try {
      // Clear existing ads
      const adElements = document.querySelectorAll('.adsbygoogle');
      adElements.forEach((element) => {
        if (element.getAttribute('data-adsbygoogle-status')) {
          element.removeAttribute('data-adsbygoogle-status');
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    } catch (error) {
      console.error('Error refreshing ads:', error);
    }
  }

  /**
   * Check if AdSense is loaded and ready
   */
  isReady(): boolean {
    return this.isLoaded && !!window.adsbygoogle;
  }

  /**
   * Get current publisher ID
   */
  getPublisherId(): string | null {
    return this.publisherId;
  }

  /**
   * Clean up (useful for testing or user upgrade)
   */
  cleanup(): void {
    // Remove ads from DOM
    const adElements = document.querySelectorAll('.adsbygoogle');
    adElements.forEach((element) => {
      element.remove();
    });

    // Reset state
    this.isLoaded = false;
    this.isLoading = false;
    this.publisherId = null;
    this.loadPromise = null;
  }
}

// Export singleton instance methods
const adSenseLoader = AdSenseLoader.getInstance();

export const loadAdSense = (config: AdSenseConfig): Promise<boolean> => {
  return adSenseLoader.loadAdSense(config);
};

export const initializeAd = (elementId: string): boolean => {
  return adSenseLoader.initializeAd(elementId);
};

export const refreshAds = (): void => {
  adSenseLoader.refreshAds();
};

export const isAdSenseReady = (): boolean => {
  return adSenseLoader.isReady();
};

export const cleanupAdSense = (): void => {
  adSenseLoader.cleanup();
};

export const getPublisherId = (): string | null => {
  return adSenseLoader.getPublisherId();
};

// Helper function to generate unique ad IDs
export const generateAdId = (prefix: string = 'ad'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// AdSense policy compliance helpers
export const isValidAdPlacement = (context: string): boolean => {
  const invalidContexts = [
    'checkout',
    'payment',
    'subscription',
    'upgrade',
    'document-editor',
    'legal-signing'
  ];
  
  return !invalidContexts.includes(context);
};

export default adSenseLoader;