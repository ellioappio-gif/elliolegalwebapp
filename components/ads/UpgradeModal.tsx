/**
 * UpgradeModal Component
 * 
 * Conversion-focused modal that appears to encourage free users to upgrade
 * Features dynamic messaging, pricing comparison, and smooth animations
 */

import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Zap, Shield, Star, ArrowRight } from 'lucide-react';
import { useSubscription } from '../../src/context/SubscriptionContext';
import type { UpgradeModalConfig } from '../../src/services/AdManager';

export interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (tier: string) => void;
  config: UpgradeModalConfig;
  className?: string;
}

interface PricingTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    description: 'Perfect for individuals',
    features: [
      'Remove all advertisements',
      'Unlimited AI consultations',
      'Advanced document templates',
      'Priority support',
      'Export to multiple formats'
    ],
    popular: true,
    cta: 'Start Basic Plan'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29.99',
    description: 'For power users',
    features: [
      'Everything in Basic',
      'Advanced legal research',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Analytics dashboard'
    ],
    cta: 'Start Pro Plan'
  },
  {
    id: 'attorney',
    name: 'Attorney',
    price: '$49.99',
    description: 'For legal professionals',
    features: [
      'Everything in Pro',
      'Client management portal',
      'Legal compliance tools',
      'White-label options',
      'Dedicated account manager',
      'SLA guarantee'
    ],
    cta: 'Start Attorney Plan'
  }
];

const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  config,
  className = ''
}) => {
  const { trackEvent, adMetrics } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<string>('basic');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [modalStartTime] = useState(() => Date.now());

  // Close modal with ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose('keyboard');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Track modal view
  useEffect(() => {
    if (isOpen) {
      trackEvent('upgrade_modal_viewed', {
        title: config.title,
        message: config.message,
        sessionImpressions: adMetrics.sessionImpressions,
        timestamp: Date.now()
      });
    }
  }, [isOpen, config, adMetrics, trackEvent]);

  // Handle close with tracking
  const handleClose = useCallback((method: 'click' | 'keyboard' | 'backdrop' = 'click') => {
    const timeSpent = Date.now() - modalStartTime;
    
    trackEvent('upgrade_modal_closed', {
      method,
      timeSpent,
      showedPricing: showPricing,
      selectedTier
    });

    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
      setShowPricing(false);
    }, 200);
  }, [modalStartTime, showPricing, selectedTier, onClose, trackEvent]);

  // Handle upgrade action
  const handleUpgrade = useCallback((tierId: string) => {
    const timeSpent = Date.now() - modalStartTime;
    
    trackEvent('upgrade_modal_converted', {
      selectedTier: tierId,
      timeSpent,
      title: config.title
    });

    onUpgrade(tierId);
  }, [modalStartTime, config.title, onUpgrade, trackEvent]);

  // Handle "Maybe Later" action
  const handleMaybeLater = useCallback(() => {
    trackEvent('upgrade_modal_maybe_later', {
      timeSpent: Date.now() - modalStartTime,
      showedPricing: showPricing
    });
    
    handleClose('click');
  }, [modalStartTime, showPricing, handleClose, trackEvent]);

  // Show pricing comparison
  const handleShowPricing = useCallback(() => {
    setShowPricing(true);
    trackEvent('upgrade_modal_pricing_viewed', {
      timeSpent: Date.now() - modalStartTime
    });
  }, [modalStartTime, trackEvent]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${className}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-50'
        }`}
        onClick={() => handleClose('backdrop')}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
            isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => handleClose('click')}
            className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {!showPricing ? (
              /* Initial upgrade prompt */
              <div className="text-center">
                {/* Header */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-indigo-600 to-brand-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-text-primary mb-2">
                    {config.title}
                  </h2>
                  <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    {config.message}
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {config.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                      <div className="w-6 h-6 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-text-primary font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Urgency message */}
                {config.urgency && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-brand-indigo-50 to-brand-sky-50 rounded-lg border border-brand-indigo-200">
                    <div className="flex items-center justify-center gap-2 text-brand-indigo-700">
                      <Star className="w-5 h-5" />
                      <span className="font-medium">{config.urgency}</span>
                    </div>
                  </div>
                )}

                {/* Discount banner */}
                {config.discount && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-semantic-success to-green-500 text-white rounded-lg">
                    <div className="font-bold text-lg">
                      Save {config.discount.percentage}% with code {config.discount.code}
                    </div>
                    <div className="text-green-100 text-sm">
                      Expires {new Date(config.discount.expiresAt).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleUpgrade('basic')}
                    className="px-8 py-4 bg-gradient-to-r from-brand-indigo-600 to-brand-indigo-500 text-white font-semibold rounded-xl hover:from-brand-indigo-700 hover:to-brand-indigo-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    {config.primaryCTA}
                  </button>
                  <button
                    onClick={handleShowPricing}
                    className="px-8 py-4 border-2 border-brand-indigo-600 text-brand-indigo-600 font-semibold rounded-xl hover:bg-brand-indigo-600 hover:text-white transition-all"
                  >
                    Compare All Plans
                  </button>
                </div>

                {/* Secondary CTA */}
                <button
                  onClick={handleMaybeLater}
                  className="mt-4 text-text-tertiary hover:text-text-secondary transition-colors underline"
                >
                  {config.secondaryCTA}
                </button>

                {/* Social proof */}
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <div className="flex items-center justify-center gap-2 text-text-tertiary text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Join 50,000+ professionals using ellio</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Pricing comparison */
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-primary mb-2">
                    Choose Your Plan
                  </h2>
                  <p className="text-lg text-text-secondary">
                    Remove ads and unlock powerful features
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {DEFAULT_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedTier === tier.id
                          ? 'border-brand-indigo-600 bg-brand-indigo-50'
                          : 'border-border-subtle hover:border-brand-indigo-300'
                      } ${tier.popular ? 'ring-2 ring-brand-indigo-200' : ''}`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-brand-indigo-600 to-brand-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="text-center">
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                          {tier.name}
                        </h3>
                        <div className="mb-2">
                          <span className="text-3xl font-bold text-brand-indigo-700">
                            {tier.price}
                          </span>
                          <span className="text-text-tertiary">/month</span>
                        </div>
                        <p className="text-text-secondary mb-4">
                          {tier.description}
                        </p>

                        <ul className="space-y-2 text-left mb-6">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-semantic-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-text-secondary">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleUpgrade(tier.id)}
                          className={`w-full py-3 rounded-lg font-semibold transition-all ${
                            selectedTier === tier.id
                              ? 'bg-brand-indigo-600 text-white hover:bg-brand-indigo-700'
                              : 'bg-surface-secondary text-text-primary hover:bg-neutral-200'
                          }`}
                        >
                          {tier.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Back button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowPricing(false)}
                    className="text-text-tertiary hover:text-text-secondary transition-colors underline"
                  >
                    ← Back to simple choice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;