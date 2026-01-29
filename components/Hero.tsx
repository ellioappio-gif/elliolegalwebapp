'use client'

import Link from 'next/link'
import { Sparkles, Shield, Clock, CheckCircle2, Star, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero min-h-screen flex flex-col justify-center items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-radial opacity-30"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-radial opacity-20"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-3 bg-white/60 border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm mb-8 backdrop-blur-sm">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Trusted by 50,000+ Users</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="hero-brand mb-6">
          Legal Help,<br />
          <span className="highlight">Simplified</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto mb-4 leading-relaxed">
          Enterprise-grade AI legal assistant that helps you understand contracts, 
          navigate legal situations, and find lawyers — all in one platform.
        </p>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl font-medium text-blue-600 italic mb-12" style={{ fontFamily: 'var(--font-display)' }}>
          Not a lawyer. Just incredibly helpful.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <Link 
            href="/auth/signup" 
            className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-1"
            style={{ 
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-button)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gradient-primary-hover)';
              e.currentTarget.style.boxShadow = 'var(--shadow-button-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gradient-primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-button)';
            }}
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Start Free Trial
          </Link>
          <Link 
            href="/#features" 
            className="inline-flex items-center gap-2 border-2 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:text-white"
            style={{ 
              borderColor: 'var(--deep-indigo)',
              color: 'var(--deep-indigo)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--deep-indigo)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            See How It Works
          </Link>
        </div>

        {/* Value Props */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm">
          <div className="flex items-center gap-2 font-medium" style={{ color: 'var(--medium-blue)' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2 font-medium" style={{ color: 'var(--medium-blue)' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 font-medium" style={{ color: 'var(--medium-blue)' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
            <span>Cancel anytime</span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: TrendingUp, number: '69x', label: 'Cost Savings vs Traditional Legal', color: 'var(--success)' },
            { icon: Clock, number: '24/7', label: 'AI Legal Assistant', color: 'var(--deep-indigo)' },
            { icon: Sparkles, number: '<5min', label: 'Average Response Time', color: 'var(--medium-blue)' },
            { icon: Shield, number: '256-bit', label: 'Military-Grade Encryption', color: 'var(--sky-blue)' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="relative group">
                <div 
                  className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--deep-indigo)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--soft-blue)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: 'var(--gradient-accent)' }}
                  />
                  <Icon className="w-8 h-8 mb-4 mx-auto" style={{ color: stat.color }} />
                  <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--deep-indigo)' }}>
                    {stat.number}
                  </p>
                  <p className="text-sm font-medium leading-tight" style={{ color: 'var(--medium-blue)' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
