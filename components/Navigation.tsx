'use client'

import Link from 'next/link';
import { useAuth } from '../app/auth/AuthContext';

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              ellio legal
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Pricing
            </Link>
            <a href="/#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </a>
            <a href="/#services" className="text-gray-700 hover:text-blue-600 transition">
              Services
            </a>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition font-semibold">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-600">Welcome, {user.name?.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition font-semibold">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
