import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Upload, Sparkles, FileCheck, UserCheck, ArrowRight, Play } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-white via-[#F5F7FC] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Play className="w-16 h-16 text-[#394C9A] mx-auto mb-6" />
            <h1 className="font-['Quicksand'] text-5xl md:text-6xl font-bold text-[#394C9A] mb-6">
              How ellio Works
            </h1>
            <p className="text-xl text-[#5B6BA8] leading-relaxed">
              Get legal help in minutes, not days. Here's exactly how our platform works.
            </p>
          </div>
        </section>

        {/* Main Process */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-[#394C9A] via-[#5B6BA8] to-[#A8D4E6] -z-10" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  {
                    number: '01',
                    title: 'Sign Up & Choose',
                    description: 'Create your free account in 30 seconds. Pick a plan that fits your needs—free, premium, or enterprise. No credit card required for trial.',
                    icon: UserCheck,
                    details: [
                      'Email or social sign-up',
                      '14-day free trial',
                      'Instant access',
                      'No setup required'
                    ]
                  },
                  {
                    number: '02',
                    title: 'Ask or Upload',
                    description: 'Type your legal question or upload a document. Contracts, leases, employment agreements—anything legal you need help with.',
                    icon: Upload,
                    details: [
                      'Plain language questions',
                      'PDF, DOCX, images supported',
                      'Up to 100MB files',
                      'Unlimited uploads (Premium)'
                    ]
                  },
                  {
                    number: '03',
                    title: 'AI Analysis',
                    description: 'Our Claude-powered AI reads, analyzes, and understands your question or document in seconds. Identifies key terms, risks, and opportunities.',
                    icon: Sparkles,
                    details: [
                      'Under 5-minute response',
                      'Plain English explanations',
                      'Risk highlights',
                      'Deadline tracking'
                    ]
                  },
                  {
                    number: '04',
                    title: 'Get Answers & Act',
                    description: 'Receive clear, actionable guidance. Download reports, chat for clarification, or connect with a real lawyer if needed.',
                    icon: FileCheck,
                    details: [
                      'Downloadable reports',
                      'Follow-up questions',
                      'Lawyer matching',
                      'Case management'
                    ]
                  }
                ].map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div key={i} className="relative">
                      {/* Step Card */}
                      <div className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all">
                        {/* Step Number */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <div className="w-16 h-16 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="font-['Quicksand'] text-2xl font-bold text-white">
                              {step.number}
                            </span>
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="mt-8 mb-6 flex justify-center">
                          <div className="w-20 h-20 bg-[#394C9A]/10 rounded-2xl flex items-center justify-center">
                            <Icon className="w-10 h-10 text-[#394C9A]" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-4 text-center">
                          {step.title}
                        </h3>
                        <p className="text-[#5B6BA8] text-center leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Details List */}
                        <ul className="space-y-2">
                          {step.details.map((detail, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-[#5B6BA8]">
                              <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Use Case Examples */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-12 text-center">
              Real-World Examples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  scenario: 'Reviewing a Lease',
                  user: 'Sarah, renter',
                  steps: [
                    'Uploads 15-page apartment lease PDF',
                    'AI analyzes in 2 minutes, highlights unusual clauses',
                    'Discovers landlord can enter without notice',
                    'Gets explanation of tenant rights',
                    'Downloads summary to negotiate better terms'
                  ]
                },
                {
                  scenario: 'Employment Contract',
                  user: 'Michael, software engineer',
                  steps: [
                    'Asks about non-compete clause',
                    'AI explains enforceability in his state',
                    'Reviews entire contract for red flags',
                    'Identifies overly broad IP assignment',
                    'Connects with employment lawyer for negotiation'
                  ]
                },
                {
                  scenario: 'Small Business Setup',
                  user: 'Jessica, entrepreneur',
                  steps: [
                    'Asks about LLC vs. S-Corp',
                    'Gets state-specific comparison',
                    'Uploads vendor contract for review',
                    'AI flags liability issues',
                    'Downloads checklist for business formation'
                  ]
                }
              ].map((example, i) => (
                <div key={i} className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8">
                  <div className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-4 py-2 rounded-lg inline-block mb-4">
                    <span className="font-semibold">{example.user}</span>
                  </div>
                  <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-6">
                    {example.scenario}
                  </h3>
                  <ol className="space-y-3">
                    {example.steps.map((step, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="font-bold text-[#394C9A] flex-shrink-0">{j + 1}.</span>
                        <span className="text-[#5B6BA8]">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features in Action */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-12 text-center">
              What You Can Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: '24/7 AI Chat',
                  features: [
                    'Ask unlimited legal questions',
                    'Get instant answers in plain English',
                    'Conversational back-and-forth',
                    'Context-aware follow-ups',
                    'Save favorite responses'
                  ]
                },
                {
                  title: 'Document Analysis',
                  features: [
                    'Upload contracts, leases, agreements',
                    'AI highlights key terms and risks',
                    'Plain-language summaries',
                    'Deadline and obligation tracking',
                    'Download PDF reports'
                  ]
                },
                {
                  title: 'Case Management',
                  features: [
                    'Organize all legal matters in one place',
                    'Track deadlines and important dates',
                    'Store related documents securely',
                    'Add notes and track progress',
                    'Share with lawyers or partners'
                  ]
                },
                {
                  title: 'Lawyer Matching',
                  features: [
                    'Find verified lawyers in your area',
                    'Filter by specialization and budget',
                    'Read reviews and ratings',
                    'Schedule consultations directly',
                    'Secure messaging with attorneys'
                  ]
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:shadow-xl transition-all">
                  <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-6">
                    {feature.title}
                  </h3>
                  <ul className="space-y-3">
                    {feature.features.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                        <span className="text-[#5B6BA8]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 50,000+ users who've simplified their legal life with ellio.
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-white/70 mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
