'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#394C9A] via-[#5B6BA8] to-[#394C9A]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2.5 rounded-full font-semibold text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Join 50,000+ Happy Users</span>
          </div>

          {/* Heading */}
          <h2 className="font-['Quicksand'] text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Simplify<br />Your Legal Life?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your free trial today. No credit card required. 
            Cancel anytime. Get instant access to AI legal assistance.
          </p>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              'Free 14-day trial',
              'No credit card needed',
              'Cancel anytime',
              'Instant access',
              '24/7 AI support',
              'Money-back guarantee'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-xl">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/auth/signup" 
              className="group inline-flex items-center justify-center gap-3 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/pricing" 
              className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-[#394C9A] transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>

          {/* Social Proof */}
          <p className="text-white/80 text-sm">
            Trusted by over 50,000 users • Rated 4.9/5 on major review platforms
          </p>
        </div>
      </div>
    </section>
  );
}

