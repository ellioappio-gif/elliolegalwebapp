'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-40%] right-[-15%] w-[700px] h-[700px] bg-[radial-gradient(circle,#D4DAF0_0%,transparent_70%)] opacity-60 -z-10" />
      <div className="absolute bottom-[-25%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,#E8ECF8_0%,transparent_70%)] opacity-50 -z-10" />
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A8D4E6] to-[#C5E5F2] text-[#394C9A] px-6 py-2 rounded-full font-bold text-sm mb-6">
        <span>⚖️</span>
        <span>Save up to 69x on Legal Costs</span>
      </div>
      
      {/* Main heading */}
      <h1 className="font-['Quicksand'] text-5xl md:text-7xl font-semibold text-[#394C9A] tracking-tight mb-4">
        ellio legal
      </h1>
      
      {/* Tagline */}
      <p className="font-['Quicksand'] text-xl md:text-2xl font-medium text-[#5B6BA8] italic mb-2">
        Not a lawyer. Just helpful.
      </p>
      
      {/* Subtitle */}
      <p className="text-lg text-[#5B6BA8] font-medium max-w-2xl mb-10">
        AI-powered legal guidance for everyone. Understand your rights, review contracts, 
        and navigate legal situations with confidence.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link 
          href="/auth/signup" 
          className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
        >
          Start Free Trial
        </Link>
        <Link 
          href="/#features" 
          className="border-2 border-[#394C9A] text-[#394C9A] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#394C9A] hover:text-white transition-all"
        >
          Learn More
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl">
        {[
          { number: '69x', label: 'Average Savings' },
          { number: '24/7', label: 'AI Availability' },
          { number: '5min', label: 'Avg Response Time' },
          { number: '100%', label: 'Satisfaction Guarantee' },
        ].map((stat, i) => (
          <div key={i} className="relative bg-white p-6 rounded-2xl border border-[#D4DAF0] hover:-translate-y-1 hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6]" />
            <p className="font-['Quicksand'] text-3xl font-semibold text-[#394C9A]">{stat.number}</p>
            <p className="text-sm text-[#5B6BA8]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
