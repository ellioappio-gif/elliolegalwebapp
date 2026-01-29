'use client'

import Link from 'next/link'
import { Sparkles, Shield, Clock, CheckCircle2, Star, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-hero">
      {/* ellio Background Design */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,200,245,0.3)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(220,232,251,0.4)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(133,176,242,0.2)_0%,transparent_60%)]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-3 bg-brand-primary-25/60 border border-brand-primary-100 text-brand-indigo px-6 py-2.5 rounded-full font-semibold text-sm mb-8 backdrop-blur-sm">
          <Shield className="w-4 h-4" />
          <span>Trusted by 50,000+ Users</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-semantic-warning text-semantic-warning" />
            ))}
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-hero font-bold text-brand-indigo tracking-tight mb-6 leading-tight">
          Legal Help,<br />
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            Simplified
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-text-secondary font-medium max-w-3xl mx-auto mb-4 leading-relaxed">
          Enterprise-grade AI legal assistant that helps you understand contracts, 
          navigate legal situations, and find lawyers — all in one platform.
        </p>
        
        {/* Tagline */}
        <p className="font-display text-lg md:text-xl font-medium text-brand-primary-500 italic mb-12">
          Not a lawyer. Just incredibly helpful.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <Link 
            href="/auth/signup" 
            className="group inline-flex items-center gap-2 bg-gradient-brand text-white px-8 py-4 rounded-ellio-lg font-bold text-lg hover:-translate-y-1 hover:shadow-brand-button-hover transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Start Free Trial
          </Link>
          <Link 
            href="/#features" 
            className="inline-flex items-center gap-2 border-2 border-brand-indigo text-brand-indigo px-8 py-4 rounded-ellio-lg font-bold text-lg hover:bg-brand-indigo hover:text-white transition-all duration-300"
          >
            See How It Works
          </Link>
        </div>

        {/* Value Props */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm">
          <div className="flex items-center gap-2 text-brand-primary-500 font-medium">
            <CheckCircle2 className="w-5 h-5 text-semantic-success" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2 text-brand-primary-500 font-medium">
            <CheckCircle2 className="w-5 h-5 text-semantic-success" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 text-brand-primary-500 font-medium">
            <CheckCircle2 className="w-5 h-5 text-semantic-success" />
            <span>Cancel anytime</span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: TrendingUp, number: '69x', label: 'Cost Savings vs Traditional Legal', color: 'text-semantic-success' },
            { icon: Clock, number: '24/7', label: 'AI Legal Assistant', color: 'text-brand-indigo' },
            { icon: Sparkles, number: '<5min', label: 'Average Response Time', color: 'text-brand-blue' },
            { icon: Shield, number: '256-bit', label: 'Military-Grade Encryption', color: 'text-brand-sky' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="relative group">
                <div className="bg-surface-primary p-8 rounded-ellio-lg border-2 border-brand-pale hover:border-brand-indigo hover:-translate-y-2 hover:shadow-brand-card-hover transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <Icon className={`w-8 h-8 mb-4 mx-auto ${stat.color}`} />
                  <p className="font-display text-4xl font-bold text-brand-indigo mb-2">{stat.number}</p>
                  <p className="text-sm text-brand-blue font-medium leading-tight">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
