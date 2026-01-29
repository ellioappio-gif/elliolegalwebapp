/**
 * AdUnit Component
 * 
 * Reusable component for displaying Google AdSense ads with proper
 * subscription checking, error handling, and responsive design
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSubscription } from '../../src/context/SubscriptionContext';
import { initializeAd, isAdSenseReady, generateAdId } from '../../src/utils/adsense';

export type AdFormat = 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'banner' | 'large-banner';
export type AdSize = '300x250' | '728x90' | '320x50' | '300x600' | '970x90' | '336x280' | 'responsive';

export interface AdUnitProps {
  slot: string;
  format?: AdFormat;
  size?: AdSize;
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
  layoutKey?: string;
  testMode?: boolean;
  onAdLoaded?: () => void;
  onAdFailed?: (error: string) => void;
  onAdClicked?: () => void;
  label?: string;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
}

const AD_SIZES: Record<AdSize, { width: number; height: number }> = {
  '300x250': { width: 300, height: 250 },
  '728x90': { width: 728, height: 90 },
  '320x50': { width: 320, height: 50 },
  '300x600': { width: 300, height: 600 },
  '970x90': { width: 970, height: 90 },
  '336x280': { width: 336, height: 280 },
  'responsive': { width: 0, height: 0 }
};

const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  format = 'auto',
  size = 'responsive',
  className = '',
  style,
  responsive = true,
  layoutKey,
  testMode = false,
  onAdLoaded,
  onAdFailed,
  onAdClicked,
  label = 'Advertisement',
  hideOnMobile = false,
  hideOnDesktop = false
}) => {
  const { shouldShowAds, trackAdImpression, trackEvent, isPremium } = useSubscription();
  const adRef = useRef<HTMLDivElement>(null);
  const [adId] = useState(() => generateAdId('ad-unit'));
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const initializedRef = useRef(false);

  // Early return for premium users
  if (isPremium || !shouldShowAds) {
    return null;
  }

  // Initialize ad when component mounts and AdSense is ready
  const initializeAdUnit = useCallback(async () => {
    if (initializedRef.current || !adRef.current || !shouldShowAds) {
      return;
    }

    try {
      setIsLoading(true);
      setHasError(false);

      // Wait for AdSense to be ready
      let retries = 0;
      while (!isAdSenseReady() && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }

      if (!isAdSenseReady()) {
        throw new Error('AdSense not ready after timeout');
      }

      // Initialize the ad
      const success = initializeAd(adId);
      
      if (success) {
        initializedRef.current = true;
        
        // Track impression
        trackAdImpression(format, slot);
        
        // Setup intersection observer to track viewability
        setupViewabilityTracking();
        
        // Callback for successful load
        setTimeout(() => {
          if (onAdLoaded) {
            onAdLoaded();
          }
          setIsLoading(false);
        }, 1000);
        
        console.log(`✅ Ad unit initialized: ${adId}`);
      } else {
        throw new Error('Failed to initialize ad unit');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown ad error';
      console.error(`❌ Ad unit failed to load: ${errorMsg}`);
      
      setHasError(true);
      setErrorMessage(errorMsg);
      setIsLoading(false);
      
      if (onAdFailed) {
        onAdFailed(errorMsg);
      }

      // Track ad failure
      trackEvent('ad_load_failed', {
        slot,
        format,
        error: errorMsg,
        adId
      });
    }
  }, [slot, format, shouldShowAds, adId, onAdLoaded, onAdFailed, trackAdImpression, trackEvent]);

  // Setup viewability tracking
  const setupViewabilityTracking = useCallback(() => {
    if (!adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('ad_viewable', {
              slot,
              format,
              adId,
              visibilityRatio: entry.intersectionRatio
            });
            
            // Track click events
            const adElement = entry.target as HTMLElement;
            const handleClick = () => {
              trackEvent('ad_clicked', { slot, format, adId });
              if (onAdClicked) {
                onAdClicked();
              }
            };
            
            adElement.addEventListener('click', handleClick, { once: true });
          }
        });
      },
      { threshold: 0.5 } // 50% visible
    );

    observer.observe(adRef.current);
    
    return () => observer.disconnect();
  }, [slot, format, adId, onAdClicked, trackEvent]);

  // Initialize ad on mount
  useEffect(() => {
    if (shouldShowAds && !testMode) {
      const timer = setTimeout(initializeAdUnit, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldShowAds, initializeAdUnit, testMode]);

  // Generate responsive class names
  const getResponsiveClasses = (): string => {
    let classes = '';
    
    if (hideOnMobile) {
      classes += ' hidden md:block';
    }
    
    if (hideOnDesktop) {
      classes += ' block md:hidden';
    }
    
    return classes;
  };

  // Generate container styles
  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'block',
      textAlign: 'center',
      margin: '20px 0',
      position: 'relative',
      minHeight: isLoading ? '100px' : 'auto',
      ...style
    };

    if (size !== 'responsive' && AD_SIZES[size]) {
      const dimensions = AD_SIZES[size];
      if (responsive) {
        baseStyles.maxWidth = `${dimensions.width}px`;
        baseStyles.width = '100%';
        baseStyles.height = 'auto';
      } else {
        baseStyles.width = `${dimensions.width}px`;
        baseStyles.height = `${dimensions.height}px`;
      }
    }

    return baseStyles;
  };

  // Render loading state
  if (isLoading && !hasError) {
    return (
      <div 
        className={`ad-unit loading ${className} ${getResponsiveClasses()}`}
        style={getContainerStyles()}
      >
        <div className="ad-label">{label}</div>
        <div className="ad-loading">
          <div className="animate-pulse bg-neutral-200 rounded" style={{ 
            width: size === 'responsive' ? '100%' : AD_SIZES[size]?.width || 300,
            height: size === 'responsive' ? 100 : AD_SIZES[size]?.height || 250 
          }} />
        </div>
      </div>
    );
  }

  // Render error state (graceful degradation)
  if (hasError) {
    return (
      <div 
        className={`ad-unit error ${className} ${getResponsiveClasses()}`}
        style={{ 
          ...getContainerStyles(), 
          display: testMode ? 'block' : 'none' // Hide errors in production
        }}
      >
        {testMode && (
          <div className="ad-error bg-red-100 border border-red-300 rounded p-4 text-red-700 text-sm">
            <div className="ad-label mb-2">{label}</div>
            <div>Ad failed to load: {errorMessage}</div>
          </div>
        )}
      </div>
    );
  }

  // Main ad render
  return (
    <div 
      className={`ad-unit ${className} ${getResponsiveClasses()}`}
      style={getContainerStyles()}
      ref={adRef}
    >
      <div className="ad-label">{label}</div>
      <ins
        id={adId}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: size === 'responsive' ? '100%' : `${AD_SIZES[size]?.width}px`,
          height: size === 'responsive' ? 'auto' : `${AD_SIZES[size]?.height}px`,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        data-ad-layout-key={layoutKey}
        data-adtest={testMode ? 'on' : undefined}
      />
    </div>
  );
};

// Preset ad components for common use cases
export const BannerAd: React.FC<Omit<AdUnitProps, 'format' | 'size'>> = (props) => (
  <AdUnit {...props} format="horizontal" size="728x90" />
);

export const RectangleAd: React.FC<Omit<AdUnitProps, 'format' | 'size'>> = (props) => (
  <AdUnit {...props} format="rectangle" size="300x250" />
);

export const SkyscraperAd: React.FC<Omit<AdUnitProps, 'format' | 'size'>> = (props) => (
  <AdUnit {...props} format="vertical" size="300x600" hideOnMobile />
);

export const MobileBannerAd: React.FC<Omit<AdUnitProps, 'format' | 'size'>> = (props) => (
  <AdUnit {...props} format="banner" size="320x50" hideOnDesktop />
);

export const ResponsiveAd: React.FC<Omit<AdUnitProps, 'format' | 'size'>> = (props) => (
  <AdUnit {...props} format="auto" size="responsive" responsive />
);

export default AdUnit;