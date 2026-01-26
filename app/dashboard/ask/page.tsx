'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { useState } from 'react'
import { Send, FileText, Loader } from 'lucide-react'

function AskContent() {
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const categories = [
    { value: 'general', label: 'General Legal Question' },
    { value: 'contracts', label: 'Contracts & Agreements' },
    { value: 'rights', label: 'Legal Rights' },
    { value: 'business', label: 'Business Law' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResponse({
        question,
        answer: 'This is a demo response. In a production environment, this would be powered by Claude AI service providing detailed legal analysis and guidance.',
        confidence: 0.95,
      })
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ask a Legal Question</h1>

        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Question Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={6}
                placeholder="Ask anything about legal matters. Be as specific as possible for better answers..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {question.length} characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Getting Answer...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Ask Now
                </>
              )}
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Answer</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <p className="text-gray-700 leading-relaxed">{response.answer}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-600">
                Confidence: <span className="font-semibold">{Math.round(response.confidence * 100)}%</span>
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Talk to a Lawyer
              </button>
            </div>
          </div>
        )}

        {!response && !loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Your answer will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AskPage() {
  return (
    <ProtectedRoute>
      <AskContent />
    </ProtectedRoute>
  )
}
