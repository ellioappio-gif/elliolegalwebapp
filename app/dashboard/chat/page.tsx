'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { useState } from 'react'
import { Send } from 'lucide-react'

function ChatContent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your AI legal assistant. How can I help you today? I can answer questions about contracts, explain legal concepts, or help you understand your rights.',
      timestamp: new Date(Date.now() - 300000)
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    }
    setMessages([...messages, userMsg])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        type: 'bot',
        text: 'This is a demo response. In production, this would be powered by Claude AI. What else would you like to know?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto h-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Assistant Chat</h1>

        <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about contracts, rights, legal terms..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatContent />
    </ProtectedRoute>
  )
}
