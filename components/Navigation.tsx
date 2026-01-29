'use client'

import Link from 'next/link';
import { useAuth } from '../app/auth/AuthContext';

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D4DAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <div className="font-['Quicksand'] font-bold text-xl text-[#394C9A] leading-none">ellio legal</div>
              <div className="text-xs text-[#5B6BA8] italic">Not a lawyer. Just helpful.</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/pricing" className="text-[#5B6BA8] hover:text-[#394C9A] transition font-medium text-sm">
              Pricing
            </Link>
            <a href="/#features" className="text-[#5B6BA8] hover:text-[#394C9A] transition font-medium text-sm">
              Features
            </a>
            <a href="/#services" className="text-[#5B6BA8] hover:text-[#394C9A] transition font-medium text-sm">
              Services
            </a>
            <Link href="/contact" className="text-[#5B6BA8] hover:text-[#394C9A] transition font-medium text-sm">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-5 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold text-sm"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-[#394C9A] hover:text-[#5B6BA8] transition font-semibold text-sm">
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-5 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
