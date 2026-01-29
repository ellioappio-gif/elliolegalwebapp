'use client'

import { ProtectedRoute } from '@/app/auth/ProtectedRoute'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, AlertCircle, Zap, Sparkles, Bot, Users, Lock, Search, Circle } from 'lucide-react'
import type { ChatMessage } from '@/lib/ai/types'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FeatureGate, useFeature } from '@/components/FeatureGate'
import Link from 'next/link'

type ChatMode = 'ai' | 'lawyer'

interface Message {
  id: number
  type: 'user' | 'bot' | 'lawyer'
  text: string
  timestamp: Date
  streaming?: boolean
  senderName?: string
  senderAvatar?: string
}

interface Lawyer {
  id: string
  name: string
  specialization: string
  avatar: string
  online: boolean
  lastSeen?: string
}

function ChatContent() {
  const [chatMode, setChatMode] = useState<ChatMode>('ai')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Welcome. I\'m here to help you understand legal concepts, contracts, and your rights. Take your time. Ask whatever feels right.',
      timestamp: new Date(Date.now() - 300000)
    }
  ])
  const [lawyerMessages, setLawyerMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useStreaming, setUseStreaming] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  
  // Connected lawyers for P2P chat
  const [connectedLawyers] = useState<Lawyer[]>([
    {
      id: '1',
      name: 'Sarah Mitchell',
      specialization: 'Family Law',
      avatar: 'SM',
      online: true,
    },
    {
      id: '2',
      name: 'James Wilson',
      specialization: 'Corporate Law',
      avatar: 'JW',
      online: false,
      lastSeen: '2 hours ago',
    },
  ])
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  
  const hasLawyerChat = useFeature('lawyerChat')

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
            <h1 className="text-2xl font-semibold text-[#0f172a]">Chat</h1>
          </div>
          <p className="text-[#64748b]">Get AI assistance or connect with legal professionals.</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex bg-neutral-100 rounded-lg p-1 mb-4">
          <button
            onClick={() => setChatMode('ai')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              chatMode === 'ai' 
                ? 'bg-white shadow text-[#4f46e5]' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Assistant
          </button>
          <button
            onClick={() => setChatMode('lawyer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              chatMode === 'lawyer' 
                ? 'bg-white shadow text-[#4f46e5]' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Talk to Lawyer
            {!hasLawyerChat && <Lock className="w-3 h-3 text-gray-400" />}
          </button>
        </div>

        {/* AI Chat Mode */}
        {chatMode === 'ai' && (
        <div className="bg-white rounded-xl border border-[#e2e8f0] flex flex-col h-[calc(100vh-340px)] min-h-[450px]">
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
        )}

        {/* Lawyer Chat Mode */}
        {chatMode === 'lawyer' && (
          <FeatureGate feature="lawyerChat">
            <div className="bg-white rounded-xl border border-[#e2e8f0] flex h-[calc(100vh-340px)] min-h-[450px]">
              {/* Lawyer List Sidebar */}
              <div className="w-72 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search lawyers..."
                      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {connectedLawyers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      No connected lawyers yet.
                      <Link href="/dashboard/lawyers" className="block mt-2 text-[#4f46e5] hover:underline">
                        Find a lawyer
                      </Link>
                    </div>
                  ) : (
                    connectedLawyers.map(lawyer => (
                      <button
                        key={lawyer.id}
                        onClick={() => setSelectedLawyer(lawyer)}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-neutral-50 transition-colors ${
                          selectedLawyer?.id === lawyer.id ? 'bg-[#4f46e5]/5 border-l-2 border-[#4f46e5]' : ''
                        }`}
                      >
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5] font-medium">
                            {lawyer.avatar}
                          </div>
                          {lawyer.online && (
                            <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-gray-900 text-sm">{lawyer.name}</p>
                          <p className="text-xs text-gray-500">{lawyer.specialization}</p>
                          {!lawyer.online && lawyer.lastSeen && (
                            <p className="text-xs text-gray-400">{lawyer.lastSeen}</p>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedLawyer ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5] font-medium">
                          {selectedLawyer.avatar}
                        </div>
                        {selectedLawyer.online && (
                          <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedLawyer.name}</p>
                        <p className="text-sm text-gray-500">
                          {selectedLawyer.online ? 'Online' : `Last seen ${selectedLawyer.lastSeen}`}
                        </p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {lawyerMessages.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                          <div className="text-center">
                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>Start a conversation with {selectedLawyer.name}</p>
                          </div>
                        </div>
                      ) : (
                        lawyerMessages.map(msg => (
                          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                              msg.type === 'user'
                                ? 'bg-[#4f46e5] text-white'
                                : 'bg-[#f1f5f9] text-gray-900'
                            }`}>
                              <p className="text-sm">{msg.text}</p>
                              <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                                {msg.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
                              setLawyerMessages(prev => [...prev, {
                                id: Date.now(),
                                type: 'user',
                                text: input.trim(),
                                timestamp: new Date(),
                              }])
                              setInput('')
                            }
                          }}
                          placeholder={`Message ${selectedLawyer.name}...`}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] text-gray-900 placeholder-gray-400"
                        />
                        <button
                          onClick={() => {
                            if (input.trim()) {
                              setLawyerMessages(prev => [...prev, {
                                id: Date.now(),
                                type: 'user',
                                text: input.trim(),
                                timestamp: new Date(),
                              }])
                              setInput('')
                            }
                          }}
                          disabled={!input.trim()}
                          className="bg-[#4f46e5] hover:bg-[#4338ca] disabled:bg-neutral-200 disabled:text-neutral-400 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium text-gray-900 mb-1">Select a lawyer</p>
                      <p className="text-sm">Choose a lawyer from the list to start chatting</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FeatureGate>
        )}
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
