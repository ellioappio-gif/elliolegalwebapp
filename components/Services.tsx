import { FileCheck, Search, Edit, Video, Calendar, Phone } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: 'Smart Contract Review',
      description: 'AI-powered analysis of contracts, leases, NDAs, and agreements. Identify risks, unfair clauses, and hidden obligations in minutes.',
      icon: FileCheck,
      features: ['Instant analysis', 'Risk highlights', 'Plain language summary'],
    },
    {
      title: 'Legal Research Assistant',
      description: 'Ask any legal question and get accurate answers backed by legal precedent and statutes. From tenant rights to business law.',
      icon: Search,
      features: ['24/7 availability', 'Case law citations', 'State-specific guidance'],
    },
    {
      title: 'Document Generation',
      description: 'Create professional legal documents, demand letters, and agreements customized for your specific situation.',
      icon: Edit,
      features: ['Custom templates', 'AI-powered drafting', 'Lawyer-approved formats'],
    },
    {
      title: 'Virtual Consultations',
      description: 'Schedule video calls with verified lawyers for complex matters. Get professional advice when you need it.',
      icon: Video,
      features: ['Verified attorneys', 'Video or phone', 'Affordable rates'],
    },
    {
      title: 'Case Management',
      description: 'Track deadlines, organize documents, and manage all your legal matters in one secure dashboard.',
      icon: Calendar,
      features: ['Deadline reminders', 'Document storage', 'Progress tracking'],
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock access to AI legal assistant. Get help whenever you need it, day or night.',
      icon: Phone,
      features: ['Instant responses', 'Multi-language', 'Always available'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-[#394C9A]/10 text-[#394C9A] px-4 py-2 rounded-full text-sm font-semibold">
              Complete Legal Suite
            </span>
          </div>
          <h2 className="font-['Quicksand'] text-5xl md:text-6xl font-bold text-[#394C9A] mb-6">
            Comprehensive Legal Services
          </h2>
          <p className="text-xl text-[#5B6BA8] max-w-3xl mx-auto">
            From AI-powered document analysis to connecting with real lawyers, 
            we provide everything you need for legal clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative bg-white border-2 border-[#D4DAF0] hover:border-[#394C9A] rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] rounded-t-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* Icon */}
                <div className="w-16 h-16 bg-[#394C9A]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#394C9A] group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#394C9A] group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#5B6BA8] mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#5B6BA8]">
                      <svg className="w-4 h-4 text-[#10B981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

