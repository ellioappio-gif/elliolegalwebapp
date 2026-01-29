import { Upload, Sparkles, FileCheck, UserCheck } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Ask or Upload',
      description: 'Type your legal question or upload a document like a contract, lease, or legal notice.',
      icon: Upload,
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI instantly analyzes your question or document, identifying key points and potential issues.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Receive clear, actionable insights in plain language. No legal jargon, just straightforward answers.',
      icon: FileCheck,
    },
    {
      number: '04',
      title: 'Take Action',
      description: 'Use our guidance to make informed decisions, or connect with a verified lawyer for representation.',
      icon: UserCheck,
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-brand-indigo-100 text-brand-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              Simple Process
            </span>
          </div>
          <h2 className="font-sans text-5xl md:text-6xl font-bold text-brand-indigo-700 mb-6">
            How ellio Works
          </h2>
          <p className="text-xl text-[#5B6BA8] max-w-3xl mx-auto">
            Getting legal help shouldn't be complicated. Here's how easy it is to use ellio.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#394C9A] via-[#5B6BA8] to-[#A8D4E6] -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-3xl border-2 border-border-subtle hover:border-brand-indigo-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    {/* Step Number */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="font-sans text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-[#394C9A]/10 rounded-2xl flex items-center justify-center">
                        <Icon className="w-10 h-10 text-brand-indigo-700" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-sans text-2xl font-bold text-brand-indigo-700 mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-[#5B6BA8] text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
