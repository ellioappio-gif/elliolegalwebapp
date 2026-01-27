'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, AlertCircle, Zap, Sparkles } from 'lucide-react'
import type { ChatMessage } from '@/lib/ai/types'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

interface Message {
  id: number
  type: 'user' | 'bot'
  text: string
  timestamp: Date
  streaming?: boolean
}

function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Welcome. I\'m here to help you understand legal concepts, contracts, and your rights. Take your time. Ask whatever feels right.',
      timestamp: new Date(Date.now() - 300000)
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useStreaming, setUseStreaming] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Get auth token from localStorage
  const getAuthToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken')
    }
    return null
  }, [])

  const handleSendStreaming = async (userMessage: string, conversationHistory: ChatMessage[]) => {
    const botMsgId = Date.now() + 1
    
    // Add empty bot message that will be filled with streaming content
    setMessages(prev => [...prev, {
      id: botMsgId,
      type: 'bot',
      text: '',
      timestamp: new Date(),
      streaming: true
    }])

    try {
      abortControllerRef.current = new AbortController()
      const token = getAuthToken()

      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          messages: conversationHistory,
          context: 'legalAssistant'
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.text) {
                fullText += data.text
                setMessages(prev => prev.map(msg => 
                  msg.id === botMsgId 
                    ? { ...msg, text: fullText }
                    : msg
                ))
              }
              if (data.done) {
                setMessages(prev => prev.map(msg => 
                  msg.id === botMsgId 
                    ? { ...msg, streaming: false }
                    : msg
                ))
              }
              if (data.error) {
                throw new Error(data.error)
              }
            } catch (e) {
              // Skip invalid JSON
              if (e instanceof Error && e.message !== 'Unexpected end of JSON input') {
                console.error('Stream parse error:', e)
              }
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }
      throw err
    }
  }

  const handleSendRegular = async (conversationHistory: ChatMessage[]) => {
    const token = getAuthToken()
    
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        messages: conversationHistory,
        context: 'legalAssistant'
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to get response')
    }

    const data = await response.json()
    
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      type: 'bot',
      text: data.content,
      timestamp: new Date()
    }])
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setError(null)

    // Add user message
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      // Build conversation history for context
      const conversationHistory: ChatMessage[] = messages
        .filter(m => m.type === 'user' || m.type === 'bot')
        .map(m => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      
      // Add the new user message
      conversationHistory.push({ role: 'user', content: userMessage })

      if (useStreaming) {
        await handleSendStreaming(userMessage, conversationHistory)
      } else {
        await handleSendRegular(conversationHistory)
      }
    } catch (err) {
      console.error('Chat error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#4f46e5]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">Legal assistant</h1>
          </div>
          <p className="text-[#64748b]">Have a conversation about legal matters. Take your time.</p>
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8f0] flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-[#4f46e5] text-white'
                    : 'bg-[#f1f5f9] text-[#0f172a]'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text || (msg.streaming ? '...' : '')}</p>
                  <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-indigo-200' : 'text-[#64748b]'}`}>
                    {msg.timestamp.toLocaleTimeString()}
                    {msg.streaming && <span className="ml-2 animate-pulse">●</span>}
                  </p>
                </div>
              </div>
            ))}
            {loading && !messages.some(m => m.streaming) && (
              <div className="flex justify-start">
                <div className="bg-[#f1f5f9] rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4 flex items-center gap-2 text-[#dc2626]">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#e2e8f0] p-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about contracts, rights, legal terms..."
                disabled={loading}
                className="flex-1 px-4 py-3 h-11 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] disabled:bg-[#f1f5f9] text-[#0f172a] placeholder-[#94a3b8]"
              />
              {loading ? (
                <button
                  onClick={handleCancel}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 h-11 min-w-[44px] rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-[#4f46e5] hover:bg-[#4338ca] disabled:bg-[#e2e8f0] disabled:text-[#64748b] text-white px-6 h-11 min-w-[44px] rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => setUseStreaming(!useStreaming)}
                className={`text-xs flex items-center gap-1 transition-colors ${useStreaming ? 'text-[#4f46e5]' : 'text-[#94a3b8]'}`}
              >
                <Zap className="w-3 h-3" />
                {useStreaming ? 'Streaming on' : 'Streaming off'}
              </button>
              <p className="text-xs text-[#64748b]">
                This is general information, not legal advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatContent />
    </ProtectedRoute>
  )
}
