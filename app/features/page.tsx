import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import Services from '@/components/Services'
import { Zap, Shield, Clock, DollarSign } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-white via-[#F5F7FC] to-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-brand-indigo-700 mb-6">
              Everything You Need<br />for Legal Clarity
            </h1>
            <p className="text-xl text-[#5B6BA8] leading-relaxed">
              From AI-powered document analysis to connecting with real lawyers, 
              ellio provides comprehensive legal tools in one simple platform.
            </p>
          </div>
        </section>

        {/* Why Choose ellio */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-4xl font-bold text-brand-indigo-700 mb-12 text-center">
              Why Choose ellio?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Instant Answers',
                  description: 'Get legal guidance in under 5 minutes, not 5 days.',
                },
                {
                  icon: DollarSign,
                  title: 'Save 69x',
                  description: 'Average savings compared to traditional legal fees.',
                },
                {
                  icon: Clock,
                  title: '24/7 Available',
                  description: 'AI legal assistant ready whenever you need help.',
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Bank-level encryption keeps your data safe.',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-sans text-xl font-bold text-[#394C9A] mb-2">{item.title}</h3>
                    <p className="text-[#5B6BA8]">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <Features />

        {/* Services Detail */}
        <Services />

        {/* Use Cases */}
        <UseCases />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience<br />Legal Clarity?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start your free 14-day trial. All features included.
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              Start Free Trial
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
