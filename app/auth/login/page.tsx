'use client'

import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Login failed. Please try again.') || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <img src="/ellio-logo.svg" alt="ellio legal" className="w-10 h-10" />
          <span className="font-sans text-2xl font-bold text-brand-indigo-600">ellio legal</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-border-subtle p-8">
          <h1 className="font-sans text-2xl font-bold text-brand-indigo-600 mb-2">Welcome back</h1>
          <p className="text-text-secondary mb-8">Sign in to access your legal assistant</p>

          {error && (
            <div className="bg-semantic-danger-subtle border border-semantic-danger text-semantic-danger px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-indigo-600 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-indigo-600 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-indigo-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-indigo-600 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-brand"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-text-brand hover:text-text-secondary mt-2 inline-block">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border-subtle">
            <p className="text-center text-text-secondary text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-text-brand hover:text-text-secondary font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo notice */}
        <div className="mt-6 bg-neutral-100 border border-border-subtle rounded-lg p-4 text-sm text-text-brand">
          <p className="font-medium mb-2">Demo credentials:</p>
          <p>Email: demo@ellio.legal</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  )
}
