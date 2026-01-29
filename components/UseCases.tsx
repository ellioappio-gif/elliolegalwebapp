import { Home, Briefcase, ShoppingCart, Heart, Car, Building2 } from 'lucide-react'

export default function UseCases() {
  const useCases = [
    {
      icon: Home,
      title: 'Housing & Rental',
      examples: [
        'Lease agreement reviews',
        'Tenant rights & disputes',
        'Eviction notices',
        'Security deposit issues',
      ],
      color: '#394C9A',
    },
    {
      icon: Briefcase,
      title: 'Employment',
      examples: [
        'Employment contracts',
        'Wrongful termination',
        'Workplace discrimination',
        'Non-compete agreements',
      ],
      color: '#5B6BA8',
    },
    {
      icon: ShoppingCart,
      title: 'Consumer Rights',
      examples: [
        'Product defects',
        'Service disputes',
        'Warranty claims',
        'Refund issues',
      ],
      color: '#10B981',
    },
    {
      icon: Heart,
      title: 'Family Law',
      examples: [
        'Divorce proceedings',
        'Child custody',
        'Prenuptial agreements',
        'Adoption processes',
      ],
      color: '#A8D4E6',
    },
    {
      icon: Car,
      title: 'Personal Injury',
      examples: [
        'Accident claims',
        'Medical malpractice',
        'Slip and fall',
        'Insurance disputes',
      ],
      color: '#F59E0B',
    },
    {
      icon: Building2,
      title: 'Business & Contracts',
      examples: [
        'Business formation',
        'Contract negotiations',
        'Partnership agreements',
        'Intellectual property',
      ],
      color: '#394C9A',
    },
  ]

  return (
    <section className="py-24 bg-[#F5F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-brand-indigo-100 text-brand-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              Real-World Applications
            </span>
          </div>
          <h2 className="font-sans text-5xl md:text-6xl font-bold text-brand-indigo-700 mb-6">
            We Help With All<br />Legal Situations
          </h2>
          <p className="text-xl text-[#5B6BA8] max-w-3xl mx-auto">
            From everyday legal questions to complex contract reviews, ellio has you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border-2 border-border-subtle hover:border-brand-indigo-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${useCase.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: useCase.color }} />
                </div>
                <h3 className="font-sans text-2xl font-bold text-brand-indigo-700 mb-6">
                  {useCase.title}
                </h3>
                <ul className="space-y-3">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#5B6BA8]">
                      <svg className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-[#5B6BA8] mb-6">
            Don't see your situation listed? Ask ellio about any legal topic.
          </p>
          <a
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-8 py-4 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  )
}
