'use client'

import Link from 'next/link'
import { ArrowRight, Check, Sparkles, Crown, Building2 } from 'lucide-react'
import { TIERS, TIER_ORDER, TierType } from '@/lib/constants/tiers'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-semibold text-brand-indigo-700 mb-4">Simple, Transparent Pricing</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] mx-auto rounded-full mb-4" />
          <p className="text-lg text-[#5B6BA8] mb-8">Choose the plan that fits your legal needs</p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-1 border border-border-subtle">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-500 text-white' 
                  : 'text-text-tertiary hover:text-brand-indigo-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual' 
                  ? 'bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-500 text-white' 
                  : 'text-text-tertiary hover:text-brand-indigo-700'
              }`}
            >
              Annual <span className="text-[#10B981] ml-1">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-border-subtle p-12 mb-12">
          <h2 className="font-sans text-3xl font-semibold text-brand-indigo-700 mb-3 text-center">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] mx-auto rounded-full mb-10" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! The Free plan is always available. Pro subscribers get a 14-day free trial before billing starts.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, and digital wallets like Apple Pay and Google Pay.'
              },
              {
                q: 'Are lawyers verified?',
                a: 'Absolutely. All lawyers in our network are verified, licensed professionals with background checks.'
              }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-sans text-lg font-semibold text-brand-indigo-700 mb-3">{item.q}</h3>
                <p className="text-[#5B6BA8]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] rounded-2xl p-12 text-center text-white">
          <h2 className="font-sans text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-white/80 mb-8">Join thousands of people already using ellio legal</p>
          <Link href="/auth/signup" className="inline-block bg-white text-brand-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
            Create Free Account
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
