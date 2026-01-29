/**
 * Cookie Consent Component
 * 
 * GDPR compliant cookie consent banner with Google Consent Mode v2 integration
 * Manages cookie preferences and non-personalized ad serving
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Cookie, Settings, Check, X, Shield, Info } from 'lucide-react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export type ConsentType = 'all' | 'essential' | 'custom';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
}

export interface CookieConsentProps {
  onConsentChange?: (consent: CookiePreferences) => void;
  onConsentModeUpdate?: (mode: any) => void;
  className?: string;
  position?: 'bottom' | 'top';
  theme?: 'light' | 'dark';
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true - required for functionality
  analytics: false,
  advertising: false,
  personalization: false
};

const COOKIE_CONSENT_KEY = 'ellio_cookie_consent';
const CONSENT_VERSION = '1.0';

// US-only service - no EU detection needed
const isEUUser = (): boolean => {
  return false; // Always false for US-only service
};

const CookieConsent: React.FC<CookieConsentProps> = ({
  onConsentChange,
  onConsentModeUpdate,
  className = '',
  position = 'bottom',
  theme = 'light'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [isEU, setIsEU] = useState(false);

  // US-only: Simple consent handling
  useEffect(() => {
    setIsEU(false);

    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (savedConsent) {
      // Load saved preferences
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed.preferences);
        updateConsentMode(parsed.preferences);
      } catch (error) {
        console.error('Error parsing saved cookie consent:', error);
      }
    } else {
      // US users: Show simple consent banner on first visit
      setIsVisible(true);
      
      // Initialize with granted consent for US users
      if (onConsentModeUpdate && window.gtag) {
        window.gtag('consent', 'default', {
          ad_storage: 'granted',
          ad_user_data: 'granted', 
          ad_personalization: 'granted',
          analytics_storage: 'granted'
        });
      }
    }
  }, [onConsentModeUpdate]);

  // Update Google Consent Mode
  const updateConsentMode = useCallback((prefs: CookiePreferences) => {
    if (onConsentModeUpdate && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: prefs.advertising ? 'granted' : 'denied',
        ad_user_data: prefs.advertising ? 'granted' : 'denied',
        ad_personalization: prefs.personalization ? 'granted' : 'denied',
        analytics_storage: prefs.analytics ? 'granted' : 'denied'
      });
    }

    if (onConsentChange) {
      onConsentChange(prefs);
    }
  }, [onConsentChange, onConsentModeUpdate]);

  // Save consent preferences
  const saveConsent = useCallback((prefs: CookiePreferences) => {
    const consentData = {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      preferences: prefs
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setPreferences(prefs);
    updateConsentMode(prefs);
    setIsVisible(false);
  }, [updateConsentMode]);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      advertising: true,
      personalization: true
    };
    saveConsent(allAccepted);
  }, [saveConsent]);

  // Accept only essential cookies
  const acceptEssential = useCallback(() => {
    saveConsent(DEFAULT_PREFERENCES);
  }, [saveConsent]);

  // Save custom preferences
  const saveCustomPreferences = useCallback(() => {
    saveConsent(preferences);
  }, [preferences, saveConsent]);

  // Update individual preference
  const updatePreference = useCallback((key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return; // Can't disable essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  if (!isVisible) return null;

  const themeClasses = theme === 'dark' 
    ? 'bg-neutral-900 text-white border-neutral-700'
    : 'bg-white text-text-primary border-border-subtle';

  const positionClasses = position === 'top' 
    ? 'top-0' 
    : 'bottom-0';

  return (
    <div className={`fixed left-0 right-0 z-50 ${positionClasses} ${className}`}>
      <div className={`border-t ${themeClasses} shadow-lg`}>
        <div className="max-w-7xl mx-auto p-4">
          {!showDetails ? (
            /* Simple consent banner */
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-brand-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">We value your privacy</h3>
                  <p className="text-sm text-text-secondary">
                    We use cookies to enhance your experience and show relevant ads. 
                    You can customize your preferences below.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-border-subtle rounded-lg hover:bg-surface-secondary transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
                <button
                  onClick={acceptEssential}
                  className="px-4 py-2 border border-brand-indigo-600 text-brand-indigo-600 rounded-lg hover:bg-brand-indigo-50 transition-colors text-sm"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-brand-indigo-600 text-white rounded-lg hover:bg-brand-indigo-700 transition-colors text-sm"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            /* Detailed consent preferences */
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Cookie Preferences</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-4 mb-6">
                {/* Essential Cookies */}
                <div className="p-4 border border-border-subtle rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-semantic-success" />
                      <h4 className="font-semibold">Essential Cookies</h4>
                    </div>
                    <div className="w-12 h-6 bg-semantic-success rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 border border-border-subtle rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-brand-indigo-600" />
                      <h4 className="font-semibold">Analytics Cookies</h4>
                    </div>
                    <button
                      onClick={() => updatePreference('analytics', !preferences.analytics)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-brand-indigo-600' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.analytics ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                </div>

                {/* Advertising Cookies */}
                <div className="p-4 border border-border-subtle rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cookie className="w-5 h-5 text-brand-indigo-600" />
                      <h4 className="font-semibold">Advertising Cookies</h4>
                    </div>
                    <button
                      onClick={() => updatePreference('advertising', !preferences.advertising)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.advertising ? 'bg-brand-indigo-600' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.advertising ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Used to show relevant ads. Disabling may result in non-personalized ads.
                  </p>
                </div>

                {/* Personalization Cookies */}
                <div className="p-4 border border-border-subtle rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-brand-indigo-600" />
                      <h4 className="font-semibold">Personalization Cookies</h4>
                    </div>
                    <button
                      onClick={() => updatePreference('personalization', !preferences.personalization)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.personalization ? 'bg-brand-indigo-600' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.personalization ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Remember your preferences and settings for a personalized experience.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={acceptEssential}
                  className="px-6 py-2 border border-border-subtle rounded-lg hover:bg-surface-secondary transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="px-6 py-2 bg-brand-indigo-600 text-white rounded-lg hover:bg-brand-indigo-700 transition-colors"
                >
                  Save Preferences
                </button>
              </div>

              {/* Legal links */}
              <div className="mt-6 pt-4 border-t border-border-subtle text-center">
                <p className="text-sm text-text-secondary">
                  Learn more about our{' '}
                  <a href="/privacy" className="text-brand-indigo-600 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms" className="text-brand-indigo-600 hover:underline">
                    Cookie Policy
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for accessing cookie preferences
export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed.preferences);
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
    
    setIsLoaded(true);
  }, []);

  const updatePreferences = useCallback((newPrefs: CookiePreferences) => {
    const consentData = {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      preferences: newPrefs
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setPreferences(newPrefs);
  }, []);

  return {
    preferences,
    isLoaded,
    updatePreferences,
    hasConsented: isLoaded && localStorage.getItem(COOKIE_CONSENT_KEY) !== null
  };
};

// Utility to check if specific cookie type is allowed (US-only: simplified)
export const isCookieAllowed = (type: keyof CookiePreferences): boolean => {
  try {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // US users: default to allowed for all cookies
      return true;
    }
    
    const parsed = JSON.parse(savedConsent);
    return parsed.preferences[type] || false;
  } catch {
    return true; // Default to allowed for US users
  }
};

export default CookieConsent;