'use client'

import Link from 'next/link'
import { ArrowRight, Check, Sparkles, Crown, Building2 } from 'lucide-react'
import { TIERS, TIER_ORDER, TierType } from '@/lib/constants/tiers'
import { useState } from 'react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="logo-link">
            <img className="logo" src="/ellio-logo.svg" alt="ellio legal" />
            <span className="logo-text">ellio legal</span>
          </Link>
          <div className="investor-badge">
            <div className="badge-dot"></div>
            Now Raising Series A
          </div>
          <div className="nav-links">
            <Link href="/about">About</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-brand">
            <div className="highlight">Pricing</div>
          </div>
          <h1>Simple, Transparent Pricing</h1>
          <p className="hero-subtitle">Choose the plan that fits your legal needs</p>
        </div>
      </section>
      {/* Billing Toggle */}
      <div className="section-alt">
        <div className="content text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-var(--deep-indigo) to-var(--medium-blue) text-white' 
                  : 'text-gray-600 hover:text-var(--deep-indigo)'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual' 
                  ? 'bg-gradient-to-r from-var(--deep-indigo) to-var(--medium-blue) text-white' 
                  : 'text-gray-600 hover:text-var(--deep-indigo)'
              }`}
            >
              Annual <span className="text-green-600 ml-1">Save 17%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section>
        <div className="content">
          <div className="cards-grid">
            {TIER_ORDER.map((tierKey) => {
            const tier = TIERS[tierKey]
            const price = billingCycle === 'monthly' ? tier.pricing.monthly : tier.pricing.annual / 12
            const isPopular = tier.popular
            
            return (
              <div 
                key={tier.id} 
                className={`rounded-2xl p-6 border-2 transition-all hover:shadow-xl hover:-translate-y-1 relative ${
                  isPopular 
                    ? 'bg-gradient-to-b from-white to-[#F5F7FC] border-[#394C9A] border-3 transform scale-105 z-10 shadow-lg' 
                    : 'bg-white text-brand-indigo-700 border-border-subtle'
                }`}
              >
                {tier.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    isPopular ? 'bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-500 text-white' : 'bg-surface-secondary text-brand-indigo-700'
                  }`}>
                    {tier.badge}
                  </div>
                )}
                
                <h3 className="font-sans text-xl font-bold mb-2 mt-2 text-brand-indigo-700">
                  {tier.name}
                </h3>
                <p className="text-sm mb-6 text-[#5B6BA8]">
                  {tier.description}
                </p>
                
                <div className="mb-6">
                  <span className="font-sans text-4xl font-bold text-brand-indigo-700">
                    {tier.pricing.monthly === 0 ? 'Free' : `$${price.toFixed(2)}`}
                  </span>
                  {tier.pricing.monthly > 0 && (
                    <span className="text-sm text-[#5B6BA8]">
                      /month
                    </span>
                  )}
                  {billingCycle === 'annual' && tier.pricing.annualSavings > 0 && (
                    <p className="text-xs mt-1 text-[#10B981]">
                      Save ${tier.pricing.annualSavings}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                    <span className="text-[#5B6BA8]">{tier.limits.cases === 'unlimited' ? 'Unlimited' : tier.limits.cases} case{tier.limits.cases !== 1 ? 's' : ''}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                    <span className="text-[#5B6BA8]">{tier.limits.documentsPerMonth === 'unlimited' ? 'Unlimited' : tier.limits.documentsPerMonth} docs/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                    <span className="text-[#5B6BA8]">{tier.limits.chatMessagesPerMonth === 'unlimited' ? 'Unlimited' : tier.limits.chatMessagesPerMonth} AI chats/month</span>
                  </li>
                  {tier.features.adFree && (
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-[#5B6BA8]">Ad-free experience</span>
                    </li>
                  )}
                  {tier.features.documentOcr && (
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-[#5B6BA8]">Document OCR</span>
                    </li>
                  )}
                  {tier.features.aiAnalysis && (
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-[#5B6BA8]">AI document analysis</span>
                    </li>
                  )}
                  {tier.features.videoConsultations && (
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-[#5B6BA8]">{tier.limits.videoConsultations === 'unlimited' ? 'Unlimited' : tier.limits.videoConsultations} video calls</span>
                    </li>
                  )}
                  {tier.features.dedicatedLawyer && (
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-[#5B6BA8]">Dedicated lawyer</span>
                    </li>
                  )}
                  {tier.features.support24x7 && (
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-[#5B6BA8]">24/7 support</span>
                    </li>
                  )}
                </ul>

                <Link
                  href={tier.id === 'advanced' ? '/contact' : '/auth/signup'}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${
                    isPopular
                      ? 'bg-[#394C9A] text-white hover:bg-[#5B6BA8]'
                      : 'bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white hover:shadow-lg'
                  }`}
                >
                  {tier.id === 'free' ? 'Start Free' : tier.id === 'advanced' ? 'Contact Sales' : 'Get Started'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      {/* Chat Fob */}
      <div className="chat-fob" id="chatFob">
        <div className="chat-fob-btn">
          <img src="/ellio-logo.svg" alt="Chat" />
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container text-center">
          <img className="footer-logo" src="/ellio-logo.svg" alt="ellio legal" />
          <div className="footer-brand">ellio legal</div>
          <p>Democratizing access to legal guidance through AI</p>
          <p>&copy; 2024 ellio legal. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
