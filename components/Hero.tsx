'use client'

import Link from 'next/link'
import { Sparkles, Shield, Clock, CheckCircle2, Star, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-white via-[#F5F7FC] to-white">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,#D4DAF0_0%,transparent_70%)] opacity-40" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,#E8ECF8_0%,transparent_70%)] opacity-40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,#A8D4E6_0%,transparent_60%)] opacity-20" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#394C9A]/10 to-[#5B6BA8]/10 border border-[#394C9A]/20 text-[#394C9A] px-6 py-2.5 rounded-full font-semibold text-sm mb-8 backdrop-blur-sm">
          <Shield className="w-4 h-4" />
          <span>Trusted by 50,000+ Users</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="font-['Quicksand'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#394C9A] tracking-tight mb-6 leading-tight">
          Legal Help,<br />
          <span className="bg-gradient-to-r from-[#394C9A] via-[#5B6BA8] to-[#A8D4E6] bg-clip-text text-transparent">
            Simplified
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-[#5B6BA8] font-medium max-w-3xl mx-auto mb-4 leading-relaxed">
          Enterprise-grade AI legal assistant that helps you understand contracts, 
          navigate legal situations, and find lawyers — all in one platform.
        </p>
        
        {/* Tagline */}
        <p className="font-['Quicksand'] text-lg md:text-xl font-medium text-[#394C9A]/70 italic mb-12">
          Not a lawyer. Just incredibly helpful.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <Link 
            href="/auth/signup" 
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-8 py-4 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Start Free Trial
          </Link>
          <Link 
            href="/#features" 
            className="inline-flex items-center gap-2 border-2 border-[#394C9A] text-[#394C9A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#394C9A] hover:text-white transition-all duration-300"
          >
            See How It Works
          </Link>
        </div>

        {/* Value Props */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm">
          <div className="flex items-center gap-2 text-[#5B6BA8] font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2 text-[#5B6BA8] font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 text-[#5B6BA8] font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            <span>Cancel anytime</span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: TrendingUp, number: '69x', label: 'Cost Savings vs Traditional Legal', color: '#10B981' },
            { icon: Clock, number: '24/7', label: 'AI Legal Assistant', color: '#394C9A' },
            { icon: Sparkles, number: '<5min', label: 'Average Response Time', color: '#5B6BA8' },
            { icon: Shield, number: '256-bit', label: 'Military-Grade Encryption', color: '#A8D4E6' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="relative group">
                <div className="bg-white p-8 rounded-2xl border-2 border-[#D4DAF0] hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <Icon className="w-8 h-8 mb-4 mx-auto" style={{ color: stat.color }} />
                  <p className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-2">{stat.number}</p>
                  <p className="text-sm text-[#5B6BA8] font-medium leading-tight">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
