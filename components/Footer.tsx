'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-secondary border-t border-border-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-brand rounded-ellio-lg flex items-center justify-center shadow-brand-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
          </div>
          <h3 className="font-display text-2xl font-semibold text-brand-indigo mb-2">ellio legal</h3>
          <p className="text-brand-blue max-w-md mx-auto">
            AI-powered legal guidance for everyone. Not a lawyer, just helpful.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex justify-center gap-8 flex-wrap mb-8">
          <Link href="/" className="text-brand-indigo hover:text-brand-blue font-medium transition">
            Home
          </Link>
          <Link href="/features" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Features
          </Link>
          <Link href="/pricing" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Pricing
          </Link>
          <Link href="/how-it-works" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            How It Works
          </Link>
          <Link href="/resources" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Resources
          </Link>
          <Link href="/faq" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            FAQ
          </Link>
          <Link href="/security" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Security
          </Link>
          <Link href="/blog" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Blog
          </Link>
          <Link href="/testimonials" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Testimonials
          </Link>
          <Link href="/careers" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Careers
          </Link>
          <Link href="/press" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Press
          </Link>
          <Link href="/support" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Support
          </Link>
          <Link href="/contact" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Contact
          </Link>
          <Link href="/terms" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Terms
          </Link>
          <Link href="/privacy" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Privacy
          </Link>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-white border border-[#D4DAF0] rounded-xl p-4 max-w-2xl mx-auto mb-8">
          <p className="text-sm text-[#6B7280] text-center">
            <strong>Disclaimer:</strong> ellio legal provides general legal information, not legal advice. 
            For specific legal matters, consult a licensed attorney in your jurisdiction.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-[#5B6BA8] text-sm">
            &copy; {currentYear} ellio legal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
