'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Box */}
        <div className="bg-gradient-to-r from-[#A8D4E6] to-[#C5E5F2] rounded-3xl p-10 text-center text-[#394C9A] mb-10">
          <h2 className="font-['Quicksand'] text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands who&apos;ve saved money and stress with AI-powered legal guidance.
          </p>
          
          {/* Perks */}
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {['No credit card required', '7-day free trial', 'Cancel anytime'].map((perk, i) => (
              <div key={i} className="bg-white/60 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {perk}
              </div>
            ))}
          </div>
          
          <Link 
            href="/auth/signup" 
            className="inline-block bg-[#394C9A] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#5B6BA8] transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
        
        {/* Secondary CTA */}
        <div className="flex gap-6 justify-center flex-wrap">
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            Contact Us
          </Link>
          <Link 
            href="/pricing" 
            className="border-2 border-[#394C9A] text-[#394C9A] px-8 py-3 rounded-lg font-semibold hover:bg-[#394C9A] hover:text-white transition-all"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
