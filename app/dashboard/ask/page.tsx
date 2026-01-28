'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { useState, useCallback } from 'react'
import { Send, FileText, Loader, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function AskContent() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<{ question: string; answer: string; confidence: number; model?: string } | null>(null)

  const categories = [
    { value: 'general', label: 'General Legal Question' },
    { value: 'contracts', label: 'Contracts & Agreements' },
    { value: 'rights', label: 'Legal Rights' },
    { value: 'business', label: 'Business Law' },
  ]

  // Get auth token from localStorage
  const getAuthToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken')
    }
    return null
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    setError(null)
    try {
      const token = getAuthToken()
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ question, category }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to get answer')
      }

      const data = await res.json()
      setResponse({
        question: data.question,
        answer: data.answer,
        confidence: data.confidence,
        model: data.model,
      })
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#4f46e5]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">Ask a question</h1>
          </div>
          <p className="text-[#64748b]">Take your time. There are no wrong questions.</p>
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#334155] mb-3">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 h-11 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] text-[#0f172a] bg-white"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-[#334155] mb-3">Your question</label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={6}
                placeholder="Describe your situation or question. Be as specific as you'd like."
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] resize-none text-[#0f172a] placeholder-[#94a3b8]"
              />
              <p className="text-sm text-[#64748b] mt-2">
                {question.length} characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] disabled:bg-[#e2e8f0] disabled:text-[#64748b] text-white font-medium h-11 min-h-[44px] rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Finding your answer...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get answer
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 mb-8">
            <p className="text-[#dc2626]">{error}</p>
          </div>
        )}

        {response && (
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-8">
            <h2 className="text-xl font-semibold text-[#0f172a] mb-4">Answer</h2>
            <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg p-6 mb-4">
              <p className="text-[#334155] leading-relaxed whitespace-pre-wrap">{response.answer}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <p className="text-[#64748b]">
                  Confidence: <span className="font-medium text-[#334155]">{Math.round(response.confidence * 100)}%</span>
                </p>
              </div>
              <button 
                onClick={() => router.push('/dashboard/lawyers')}
                className="text-[#4f46e5] hover:text-[#4338ca] font-medium transition-colors"
              >
                Connect with a lawyer
              </button>
            </div>
            <p className="text-xs text-[#64748b] mt-4">
              This is general information, not legal advice. Consider consulting a licensed attorney for your specific situation.
            </p>
          </div>
        )}

        {!response && !loading && (
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 text-center">
            <FileText className="w-12 h-12 text-[#94a3b8] mx-auto mb-4" />
            <p className="text-[#64748b]">Your answer will appear here when you're ready</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function AskPage() {
  return (
    <ProtectedRoute>
      <AskContent />
    </ProtectedRoute>
  )
}
