'use client'

import Link from 'next/link';
import { useAuth } from '../app/auth/AuthContext';

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-surface-primary/95 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-brand rounded-ellio flex items-center justify-center shadow-brand-button group-hover:shadow-brand-button-hover transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-xl text-brand-indigo leading-none">ellio legal</div>
              <div className="text-xs text-text-secondary italic">Not a lawyer. Just helpful.</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-text-secondary hover:text-brand-indigo transition font-medium text-sm">
              Features
            </Link>
            <Link href="/pricing" className="text-text-secondary hover:text-brand-indigo transition font-medium text-sm">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-text-secondary hover:text-brand-indigo transition font-medium text-sm">
              How It Works
            </Link>
            <Link href="/resources" className="text-text-secondary hover:text-brand-indigo transition font-medium text-sm">
              Resources
            </Link>
            <Link href="/support" className="text-text-secondary hover:text-brand-indigo transition font-medium text-sm">
              Support
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-gradient-brand text-white px-5 py-2 rounded-ellio hover:shadow-brand-button-hover hover:-translate-y-0.5 transition-all font-semibold text-sm"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-brand-indigo hover:text-brand-blue transition font-semibold text-sm">
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-gradient-brand text-white px-5 py-2 rounded-ellio hover:shadow-brand-button-hover hover:-translate-y-0.5 transition-all font-semibold text-sm"
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
