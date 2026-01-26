'use client'

import { Mail, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function VerifyEmailPage() {
  const [isVerified, setIsVerified] = useState(false)
  const [resent, setResent] = useState(false)

  const handleResend = () => {
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {!isVerified ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">Verify Your Email</h1>
            <p className="text-gray-600 text-center mb-8">
              We've sent a verification link to <span className="font-semibold">john@example.com</span>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-700 mb-4">
                Click the link in your email to verify your account and get started with ellio legal.
              </p>
              <p className="text-xs text-gray-600">
                The link will expire in 24 hours.
              </p>
            </div>

            {resent && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
                ✓ Verification email sent!
              </div>
            )}

            <button
              onClick={() => setIsVerified(true)}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Check className="w-5 h-5" />
              I've Verified My Email
            </button>

            <button
              onClick={handleResend}
              className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
            >
              Resend Verification Email
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already verified?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">Email Verified!</h1>
            <p className="text-gray-600 mb-8">
              Your email has been successfully verified. You're all set to start using ellio legal.
            </p>

            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Logo/Branding */}
        <div className="text-center mt-8">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            ellio legal
          </Link>
          <p className="text-sm text-gray-600 mt-2">Secure legal assistance powered by AI</p>
        </div>
      </div>
    </div>
  )
}
