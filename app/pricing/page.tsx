'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle, Shield, Award } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works for you</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              name: 'Free',
              price: '$0',
              period: 'Forever',
              description: 'Ad-supported access',
              features: [
                'AI legal assistant',
                '2,048 token responses',
                '10 requests per minute',
                'Basic document analysis',
                'Ad-supported experience'
              ],
              cta: 'Start Free',
              highlighted: false
            },
            {
              name: 'Basic',
              price: '$9.99',
              period: '/month',
              description: 'For occasional users',
              features: [
                'Everything in Free +',
                '4,096 token responses',
                '20 requests per minute',
                'No ads',
                'Email support'
              ],
              cta: 'Get Basic',
              highlighted: false
            },
            {
              name: 'Premium',
              price: '$19.99',
              period: '/month',
              description: 'Best for regular users',
              features: [
                'Everything in Basic +',
                '6,144 token responses',
                '50 requests per minute',
                'Advanced document analysis',
                'Priority support'
              ],
              cta: 'Start Premium',
              highlighted: true
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: 'pricing',
              description: 'For organizations',
              features: [
                'Everything in Premium +',
                '8,192 token responses',
                '100 requests per minute',
                'Dedicated support',
                'Custom integrations'
              ],
              cta: 'Contact Sales',
              highlighted: false
            }
          ].map((plan, i) => (
            <div key={i} className={`rounded-2xl p-8 border-2 transition-all hover:shadow-lg ${
              plan.highlighted 
                ? 'bg-blue-600 text-white border-blue-600 transform scale-105' 
                : 'bg-white text-gray-900 border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      plan.highlighted ? 'bg-blue-400' : 'bg-blue-100'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${plan.highlighted ? 'bg-white' : 'bg-blue-600'}`}></span>
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                plan.highlighted
                  ? 'bg-white text-blue-600 hover:bg-blue-50'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of people already using ellio legal</p>
          <Link href="/auth/signup" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  )
}
