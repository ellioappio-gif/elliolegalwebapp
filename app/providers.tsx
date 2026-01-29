'use client'

import { AuthProvider } from '@/app/auth/AuthContext';
import { SubscriptionProvider } from '@/lib/stores/subscriptionStore';
import { SubscriptionProvider as AdSubscriptionProvider } from '@/src/context/SubscriptionContext';
import CookieConsent from '@/components/ads/CookieConsent';
import Script from 'next/script';
import { loadAdSense } from '@/src/utils/adsense';
import { useEffect, useState } from 'react';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookieConsent, setCookieConsent] = useState<any>(null);

  useEffect(() => {
    // Initialize AdSense after cookie consent
    if (cookieConsent?.advertising) {
      loadAdSense({
        publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID!,
        testMode: process.env.NODE_ENV === 'development'
      });
    }
  }, [cookieConsent]);

  const handleConsentChange = (preferences: any) => {
    setCookieConsent(preferences);
  };

  const handleConsentModeUpdate = (mode: any) => {
    // Update Google Consent Mode
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', mode);
    }
  };

  return (
    <>
      <AuthProvider>
        <SubscriptionProvider>
          <AdSubscriptionProvider>
            {children}
            <CookieConsent
              onConsentChange={handleConsentChange}
              onConsentModeUpdate={handleConsentModeUpdate}
              position="bottom"
              theme="light"
            />
          </AdSubscriptionProvider>
        </SubscriptionProvider>
      </AuthProvider>
      
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // US-only: Initialize with granted consent
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
          
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}