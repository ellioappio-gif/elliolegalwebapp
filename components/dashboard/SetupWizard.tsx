'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth/AuthContext'
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  FileText,
  MessageSquare,
  Users,
  Shield,
  CheckCircle,
  User,
  Bell,
  X
} from 'lucide-react'

interface SetupWizardProps {
  onComplete: () => void
  onSkip: () => void
}

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to ellio',
    description: 'Your AI-powered legal assistant. Let\'s get you set up in just a few steps.',
    icon: Sparkles,
  },
  {
    id: 'profile',
    title: 'Complete your profile',
    description: 'Help us personalize your experience by telling us a bit about yourself.',
    icon: User,
    fields: [
      { name: 'legalNeeds', label: 'What brings you to ellio?', type: 'select', options: ['Personal legal questions', 'Business contracts', 'Document review', 'Find a lawyer', 'Just exploring'] },
      { name: 'experience', label: 'How familiar are you with legal matters?', type: 'select', options: ['Complete beginner', 'Some experience', 'Very familiar', 'Legal professional'] },
    ]
  },
  {
    id: 'features',
    title: 'Discover key features',
    description: 'Here\'s what you can do with ellio.',
    icon: FileText,
    features: [
      { icon: Sparkles, title: 'AI Legal Assistant', description: 'Get answers to legal questions in plain language' },
      { icon: FileText, title: 'Document Analysis', description: 'Upload contracts and get instant summaries' },
      { icon: MessageSquare, title: 'Interactive Chat', description: 'Have natural conversations about legal matters' },
      { icon: Users, title: 'Lawyer Network', description: 'Connect with qualified legal professionals' },
    ]
  },
  {
    id: 'notifications',
    title: 'Stay informed',
    description: 'Choose how you\'d like to receive updates.',
    icon: Bell,
    preferences: [
      { id: 'email', label: 'Email notifications', description: 'Important updates and weekly summaries' },
      { id: 'product', label: 'Product updates', description: 'New features and improvements' },
      { id: 'tips', label: 'Legal tips', description: 'Helpful articles and guides' },
    ]
  },
  {
    id: 'security',
    title: 'Your data is safe',
    description: 'We take security seriously. Your information is encrypted and never shared.',
    icon: Shield,
    securityFeatures: [
      'Bank-level 256-bit encryption',
      'SOC 2 Type II certified',
      'GDPR and CCPA compliant',
      'No data sold to third parties',
    ]
  },
  {
    id: 'complete',
    title: 'You\'re all set',
    description: 'Your account is ready. Start exploring ellio.',
    icon: CheckCircle,
  },
]

export default function SetupWizard({ onComplete, onSkip }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email: true,
    product: true,
    tips: false,
  })
  const { user } = useAuth()
  const router = useRouter()

  const step = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (isLastStep) {
      // Save preferences to localStorage
      localStorage.setItem('ellio_setup_complete', 'true')
      localStorage.setItem('ellio_user_prefs', JSON.stringify({ formData, notifications }))
      onComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('ellio_setup_complete', 'true')
    onSkip()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with progress */}
        <div className="px-6 pt-6 pb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="wizardLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#818cf8', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#4338ca', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="110" rx="50" ry="55" fill="url(#wizardLogoGrad)"/>
                <circle cx="100" cy="55" r="40" fill="url(#wizardLogoGrad)"/>
                <ellipse cx="70" cy="45" rx="22" ry="32" fill="url(#wizardLogoGrad)" opacity="0.95"/>
                <ellipse cx="130" cy="45" rx="22" ry="32" fill="url(#wizardLogoGrad)" opacity="0.95"/>
                <circle cx="135" cy="85" r="8" fill="white"/>
                <path d="M155 130 Q175 125 170 145" stroke="url(#wizardLogoGrad)" strokeWidth="12" fill="none" strokeLinecap="round"/>
              </svg>
              <span className="text-lg font-semibold text-[#0f172a]">Getting started</span>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 text-[#64748b] hover:text-[#334155] hover:bg-[#f1f5f9] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4f46e5] to-[#38bdf8] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#64748b] mt-2">Step {currentStep + 1} of {steps.length}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center mb-8">
            <div className={`
              w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
              ${step.id === 'complete' ? 'bg-[#ecfdf5]' : 'bg-gradient-to-br from-[#4f46e5]/10 to-[#38bdf8]/10'}
            `}>
              <step.icon className={`w-8 h-8 ${step.id === 'complete' ? 'text-[#10b981]' : 'text-[#4f46e5]'}`} />
            </div>
            <h2 className="text-2xl font-semibold text-[#0f172a] mb-2">
              {step.id === 'welcome' ? `Welcome, ${user?.name?.split(' ')[0] || 'there'}` : step.title}
            </h2>
            <p className="text-[#64748b] max-w-md mx-auto">{step.description}</p>
          </div>

          {/* Step-specific content */}
          {step.id === 'profile' && step.fields && (
            <div className="space-y-4 max-w-md mx-auto">
              {step.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-[#334155] mb-2">
                    {field.label}
                  </label>
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition-colors"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {step.id === 'features' && step.features && (
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {step.features.map((feature, i) => (
                <div 
                  key={i}
                  className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl hover:border-[#4f46e5]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#4f46e5]/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-[#4f46e5]" />
                  </div>
                  <h3 className="font-medium text-[#0f172a] mb-1">{feature.title}</h3>
                  <p className="text-sm text-[#64748b]">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {step.id === 'notifications' && step.preferences && (
            <div className="space-y-3 max-w-md mx-auto">
              {step.preferences.map((pref) => (
                <label 
                  key={pref.id}
                  className="flex items-start gap-4 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl cursor-pointer hover:border-[#4f46e5]/30 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={notifications[pref.id] || false}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [pref.id]: e.target.checked }))}
                    className="mt-1 w-5 h-5 rounded border-[#e2e8f0] text-[#4f46e5] focus:ring-[#4f46e5]"
                  />
                  <div>
                    <p className="font-medium text-[#0f172a]">{pref.label}</p>
                    <p className="text-sm text-[#64748b]">{pref.description}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {step.id === 'security' && step.securityFeatures && (
            <div className="max-w-md mx-auto">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                <ul className="space-y-3">
                  {step.securityFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                      <span className="text-[#334155]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step.id === 'complete' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ecfdf5] text-[#10b981] rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                Setup complete
              </div>
              <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                {[
                  { label: 'Ask a question', href: '/dashboard/ask', icon: Sparkles },
                  { label: 'Start chatting', href: '/dashboard/chat', icon: MessageSquare },
                  { label: 'Find a lawyer', href: '/dashboard/lawyers', icon: Users },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => {
                      handleNext()
                      router.push(action.href)
                    }}
                    className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl hover:border-[#4f46e5] hover:bg-[#4f46e5]/5 transition-colors text-center"
                  >
                    <action.icon className="w-6 h-6 text-[#4f46e5] mx-auto mb-2" />
                    <span className="text-sm font-medium text-[#334155]">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e2e8f0] bg-[#f8fafc]">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isFirstStep}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors
                ${isFirstStep 
                  ? 'text-[#94a3b8] cursor-not-allowed' 
                  : 'text-[#334155] hover:bg-[#e2e8f0]'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              {!isLastStep && (
                <button
                  onClick={handleSkip}
                  className="px-4 py-2.5 text-[#64748b] hover:text-[#334155] font-medium text-sm transition-colors"
                >
                  Skip setup
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-lg font-medium text-sm transition-colors"
              >
                {isLastStep ? 'Go to Dashboard' : 'Continue'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
