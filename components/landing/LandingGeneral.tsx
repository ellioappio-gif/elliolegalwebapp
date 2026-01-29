import Link from 'next/link'
import { ArrowRight, Sparkles, Users, FileText, Shield, Zap, CheckCircle } from 'lucide-react'

interface LandingGeneralProps {
  config: any
}

interface Feature {
  title: string
  description: string
  icon: string
}

export default function LandingGeneral({ config }: LandingGeneralProps) {
  const { content = {} } = config
  const { hero = {}, features = [] } = content

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="font-['Quicksand'] text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-indigo-700 mb-6">
              {hero.title || 'Legal Help Made Simple'}
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-10">
              {hero.subtitle || 'Get instant answers to legal questions with AI-powered assistance and connect with qualified attorneys when you need them.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={hero.ctaUrl || '/auth/signup'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg text-white rounded-lg font-semibold text-lg transition-all"
              >
                {hero.ctaText || 'Get Started Free'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-indigo-600 text-brand-indigo-600 hover:bg-brand-indigo-600 hover:text-white rounded-lg font-semibold text-lg transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-sky-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Our platform combines AI technology with human expertise to provide comprehensive legal support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(features.length > 0 ? features : [
              {
                title: 'AI Legal Assistant',
                description: 'Get instant answers to legal questions in plain language',
                icon: 'sparkles'
              },
              {
                title: 'Expert Network',
                description: 'Connect with qualified attorneys in your area',
                icon: 'users'
              },
              {
                title: 'Document Analysis',
                description: 'Upload and understand any legal document',
                icon: 'file-text'
              }
            ]).map((feature: Feature, index: number) => {
              const iconMap = {
                sparkles: Sparkles,
                users: Users,
                'file-text': FileText
              }
              const Icon = iconMap[feature.icon as keyof typeof iconMap] || Sparkles

              return (
                <div key={index} className="text-center p-8 bg-surface-secondary rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-brand-indigo-600/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-brand-indigo-600" />
                  </div>
                  <h3 className="font-['Quicksand'] text-xl font-semibold text-text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join the community of users who trust ellio for their legal needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="opacity-90">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="opacity-90">Legal Experts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="opacity-90">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="opacity-90">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Quicksand'] text-3xl lg:text-4xl font-bold text-brand-indigo-700 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust ellio for their legal questions and document needs.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-indigo-700 to-brand-indigo-600 hover:shadow-lg text-white rounded-lg font-semibold text-lg transition-all"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-text-secondary mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>
    </div>
  )
}