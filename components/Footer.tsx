'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F7FC] border-t border-[#D4DAF0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
          </div>
          <h3 className="font-['Quicksand'] text-2xl font-semibold text-[#394C9A] mb-2">ellio legal</h3>
          <p className="text-[#5B6BA8] max-w-md mx-auto">
            AI-powered legal guidance for everyone. Not a lawyer, just helpful.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex justify-center gap-8 flex-wrap mb-8">
          <Link href="/" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Home
          </Link>
          <Link href="/features" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Features
          </Link>
          <Link href="/pricing" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            Pricing
          </Link>
          <Link href="/about" className="text-[#394C9A] hover:text-[#5B6BA8] font-medium transition">
            About
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
