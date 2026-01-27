'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronRight, ChevronLeft, Sparkles, FileText, MessageSquare, Users, Search, Settings, Star, HelpCircle } from 'lucide-react'

interface TutorialStep {
  id: string
  title: string
  description: string
  target?: string // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  icon: React.ComponentType<{ className?: string }>
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to ellio',
    description: 'Let me show you around. This quick tour will help you get the most out of ellio.',
    position: 'center',
    icon: Sparkles,
  },
  {
    id: 'sidebar',
    title: 'Navigation sidebar',
    description: 'Use the sidebar to navigate between different sections. You can collapse it for more space.',
    target: '[data-tutorial="sidebar"]',
    position: 'right',
    icon: HelpCircle,
  },
  {
    id: 'ask',
    title: 'Ask AI',
    description: 'Get instant answers to your legal questions. Our AI explains complex topics in plain language.',
    target: '[data-tutorial="ask"]',
    position: 'right',
    icon: Sparkles,
  },
  {
    id: 'chat',
    title: 'Interactive chat',
    description: 'Have natural conversations about legal matters. The AI remembers context throughout your chat.',
    target: '[data-tutorial="chat"]',
    position: 'right',
    icon: MessageSquare,
  },
  {
    id: 'documents',
    title: 'Document analysis',
    description: 'Upload contracts and documents for instant summaries and key point extraction.',
    target: '[data-tutorial="documents"]',
    position: 'right',
    icon: FileText,
  },
  {
    id: 'lawyers',
    title: 'Lawyer network',
    description: 'When you need professional help, connect with qualified lawyers in our network.',
    target: '[data-tutorial="lawyers"]',
    position: 'right',
    icon: Users,
  },
  {
    id: 'search',
    title: 'Search everything',
    description: 'Quickly find past conversations, documents, and saved items.',
    target: '[data-tutorial="search"]',
    position: 'right',
    icon: Search,
  },
  {
    id: 'settings',
    title: 'Your settings',
    description: 'Customize your experience, manage notifications, and update your profile.',
    target: '[data-tutorial="settings"]',
    position: 'right',
    icon: Settings,
  },
  {
    id: 'complete',
    title: 'You\'re ready to go',
    description: 'That\'s everything. You can revisit this tutorial anytime from the help menu.',
    position: 'center',
    icon: Star,
  },
]

interface TutorialOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function TutorialOverlay({ isOpen, onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightPosition, setHighlightPosition] = useState<DOMRect | null>(null)

  const step = tutorialSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === tutorialSteps.length - 1
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100

  // Update highlight position when step changes
  useEffect(() => {
    if (!isOpen) return

    if (step.target) {
      const element = document.querySelector(step.target)
      if (element) {
        const rect = element.getBoundingClientRect()
        setHighlightPosition(rect)
      } else {
        setHighlightPosition(null)
      }
    } else {
      setHighlightPosition(null)
    }
  }, [currentStep, isOpen, step.target])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handleBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentStep])

  const handleNext = useCallback(() => {
    if (isLastStep) {
      setCurrentStep(0)
      onClose()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }, [isLastStep, onClose])

  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }, [isFirstStep])

  if (!isOpen) return null

  const getTooltipPosition = () => {
    if (!highlightPosition || step.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }

    const padding = 20
    const tooltipWidth = 360
    const tooltipHeight = 200

    switch (step.position) {
      case 'right':
        return {
          top: highlightPosition.top + highlightPosition.height / 2 - tooltipHeight / 2,
          left: highlightPosition.right + padding,
        }
      case 'left':
        return {
          top: highlightPosition.top + highlightPosition.height / 2 - tooltipHeight / 2,
          left: highlightPosition.left - tooltipWidth - padding,
        }
      case 'bottom':
        return {
          top: highlightPosition.bottom + padding,
          left: highlightPosition.left + highlightPosition.width / 2 - tooltipWidth / 2,
        }
      case 'top':
        return {
          top: highlightPosition.top - tooltipHeight - padding,
          left: highlightPosition.left + highlightPosition.width / 2 - tooltipWidth / 2,
        }
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }
    }
  }

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Overlay with cutout */}
      <div className="absolute inset-0 bg-[#0f172a]/70 backdrop-blur-sm">
        {highlightPosition && (
          <div
            className="absolute bg-transparent border-4 border-[#4f46e5] rounded-xl shadow-[0_0_0_9999px_rgba(15,23,42,0.7)] transition-all duration-300"
            style={{
              top: highlightPosition.top - 8,
              left: highlightPosition.left - 8,
              width: highlightPosition.width + 16,
              height: highlightPosition.height + 16,
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      <div
        className="absolute bg-white rounded-2xl shadow-2xl w-[360px] overflow-hidden transition-all duration-300"
        style={getTooltipPosition()}
      >
        {/* Progress bar */}
        <div className="h-1 bg-[#e2e8f0]">
          <div 
            className="h-full bg-gradient-to-r from-[#4f46e5] to-[#38bdf8] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5]/10 to-[#38bdf8]/10 flex items-center justify-center">
              <step.icon className="w-6 h-6 text-[#4f46e5]" />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#64748b] hover:text-[#334155] hover:bg-[#f1f5f9] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{step.title}</h3>
          <p className="text-[#64748b] text-sm leading-relaxed mb-6">{step.description}</p>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {tutorialSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentStep ? 'bg-[#4f46e5]' : 'bg-[#e2e8f0] hover:bg-[#cbd5e1]'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <button
                  onClick={handleBack}
                  className="p-2 text-[#64748b] hover:text-[#334155] hover:bg-[#f1f5f9] rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-lg font-medium text-sm transition-colors"
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="px-6 py-3 bg-[#f8fafc] border-t border-[#e2e8f0]">
          <p className="text-xs text-[#94a3b8] text-center">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded text-[#64748b]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded text-[#64748b]">→</kbd> to navigate or <kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded text-[#64748b]">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}
