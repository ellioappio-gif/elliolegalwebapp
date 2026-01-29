'use client'

import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await signup(formData.email, formData.password, formData.name)
      router.push('/auth/verify-email')
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Signup failed. Please try again.') || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FC] via-white to-[#E8ECF8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <img src="/ellio-logo.svg" alt="ellio legal" className="w-10 h-10" />
          <span className="font-['Quicksand'] text-2xl font-bold text-[#394C9A]">ellio legal</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#D4DAF0] p-8">
          <h1 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-2">Create your account</h1>
          <p className="text-[#5B6BA8] mb-8">Start using your AI legal assistant</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5B6BA8]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5B6BA8]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5B6BA8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5B6BA8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-[#394C9A] hover:text-[#5B6BA8] mt-2"
              >
                {showPassword ? 'Hide' : 'Show'} passwords
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Creating account...' : 'Create account'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#D4DAF0]">
            <p className="text-center text-[#5B6BA8] text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#394C9A] hover:text-[#5B6BA8] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
