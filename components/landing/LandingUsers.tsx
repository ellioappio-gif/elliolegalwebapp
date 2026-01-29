import Link from 'next/link'
import { ArrowRight, MessageSquare, FileText, Users, Zap, Clock, Shield, CheckCircle, HelpCircle } from 'lucide-react'

interface LandingUsersProps {
  config: any
}

interface UseCase {
  title?: string
  description?: string
  [key: string]: any
}

export default function LandingUsers({ config }: LandingUsersProps) {
  const { content = {} } = config
  const { hero = {}, useCases = [] } = content

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-semantic-success-subtle text-semantic-success px-4 py-2 rounded-full font-medium mb-6">
              <Zap className="w-4 h-4" />
              Instant Legal Answers
            </div>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-indigo-700 mb-6">
              {hero.title || 'Legal Questions Answered Instantly'}
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-10">
              {hero.subtitle || 'No more expensive consultations for simple questions. Get AI-powered legal guidance in seconds.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={hero.ctaUrl || '/auth/signup?redirect=/dashboard/ask'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg text-white rounded-lg font-semibold text-lg transition-all"
              >
                {hero.ctaText || 'Ask Your First Question'}
                <HelpCircle className="w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-indigo-600 text-brand-indigo-600 hover:bg-brand-indigo-600 hover:text-white rounded-lg font-semibold text-lg transition-all"
              >
                See Live Demo
              </Link>
            </div>
            <p className="text-sm text-text-secondary mt-4">
              Free forever plan • No credit card required
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-sky-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                Stop Paying $300/hour for Simple Questions
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-semantic-danger rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✕</span>
                  </div>
                  <p className="text-text-secondary">Expensive hourly consultations for basic questions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-semantic-danger rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✕</span>
                  </div>
                  <p className="text-text-secondary">Waiting days or weeks for appointments</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-semantic-danger rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✕</span>
                  </div>
                  <p className="text-text-secondary">Complex legal jargon that's hard to understand</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-semantic-success-subtle to-brand-sky-100 rounded-2xl p-8">
              <h3 className="font-sans text-2xl font-bold text-text-primary mb-6">
                Get Answers in Seconds
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-text-primary">Instant AI-powered legal guidance</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-text-primary">Plain English explanations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-text-primary">Connect with lawyers when needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
              Perfect for Common Legal Questions
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Get instant help with the legal issues you face every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(useCases.length > 0 ? useCases : [
              'Contract reviews',
              'Tenant rights', 
              'Small business questions',
              'Employment law'
            ]).map((useCase: UseCase | string, index: number) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-indigo-600/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-brand-indigo-600" />
                </div>
                <h3 className="font-sans font-semibold text-text-primary mb-2">
                  {typeof useCase === 'string' ? useCase : useCase.title}
                </h3>
                {typeof useCase === 'object' && useCase.description && (
                  <p className="text-sm text-text-secondary">{useCase.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Get legal help in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Ask Your Question',
                description: 'Type your legal question in plain English. Our AI understands context and nuance.',
                icon: MessageSquare
              },
              {
                step: '2', 
                title: 'Get Instant Answer',
                description: 'Receive a detailed explanation in seconds, tailored to your specific situation.',
                icon: Zap
              },
              {
                step: '3',
                title: 'Connect if Needed',
                description: 'For complex matters, seamlessly connect with a qualified attorney in your area.',
                icon: Users
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-border-subtle -translate-x-1/2 z-0"></div>
                )}
                <div className="relative z-10 bg-white">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-indigo-600 to-brand-indigo-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-sans text-xl font-semibold text-text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-3xl lg:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">$0<span className="text-base opacity-75">/month</span></p>
              <ul className="space-y-2 text-sm opacity-90 mb-6">
                <li>• 3 questions per month</li>
                <li>• Basic AI responses</li>
                <li>• Community support</li>
              </ul>
            </div>
            <div className="bg-white text-brand-indigo-600 rounded-xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-sky-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$29<span className="text-base opacity-75">/month</span></p>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Unlimited questions</li>
                <li>• Priority AI responses</li>
                <li>• Direct lawyer access</li>
              </ul>
            </div>
          </div>

          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-indigo-600 hover:bg-neutral-50 rounded-lg font-semibold text-lg transition-all"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
            Ready to Get Legal Answers?
          </h2>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of users who get instant legal guidance with ellio.
          </p>
          <Link
            href="/auth/signup?redirect=/dashboard/ask"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg text-white rounded-lg font-semibold text-lg transition-all"
          >
            Ask Your First Question Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-text-secondary mt-4">
            No credit card required • Get started in under 30 seconds
          </p>
        </div>
      </section>
    </div>
  )
}