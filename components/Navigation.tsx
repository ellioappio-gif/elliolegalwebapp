'use client'

import Link from 'next/link';
import { useAuth } from '../app/auth/AuthContext';

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D4DAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="https://ellio.solutions/logo.png" 
              alt="ellio" 
              className="w-10 h-10 rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-['Quicksand'] font-bold text-2xl text-[#394C9A]">ellio legal</span>
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
