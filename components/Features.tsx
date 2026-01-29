import { Brain, FileSearch, Users, Shield, MessageSquare, Scale, FileText, CheckCircle, Clock, Lock } from 'lucide-react'

export default function Features() {
  const mainFeatures = [
    {
      title: 'AI Legal Assistant',
      description: 'Get instant answers to legal questions powered by advanced AI. Ask anything from tenant rights to contract clauses.',
      icon: Brain,
      color: '#394C9A',
    },
    {
      title: 'Document Analysis',
      description: 'Upload contracts, leases, NDAs, or any legal document. Our AI reviews it and highlights key risks and obligations.',
      icon: FileSearch,
      color: '#5B6BA8',
    },
    {
      title: 'Lawyer Matching',
      description: 'Connect with verified, licensed lawyers in your area when you need professional representation.',
      icon: Users,
      color: '#10B981',
    },
    {
      title: 'Rights Protection',
      description: 'Understand your legal rights in employment, housing, consumer, and family law situations.',
      icon: Shield,
      color: '#A8D4E6',
    },
    {
      title: 'Case Management',
      description: 'Organize your legal matters, track deadlines, store documents, and manage communications in one place.',
      icon: Scale,
      color: '#394C9A',
    },
    {
      title: '24/7 Chat Support',
      description: 'Chat with our AI legal assistant anytime. Get conversational legal guidance whenever you need it.',
      icon: MessageSquare,
      color: '#5B6BA8',
    },
  ]

  const benefits = [
    { icon: CheckCircle, text: 'Save up to 69x on legal fees' },
    { icon: Clock, text: 'Get answers in under 5 minutes' },
    { icon: Lock, text: 'Bank-level security & encryption' },
    { icon: FileText, text: 'Unlimited document reviews' },
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white via-[#F5F7FC] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-[#394C9A]/10 text-[#394C9A] px-4 py-2 rounded-full text-sm font-semibold">
              Comprehensive Legal Platform
            </span>
          </div>
          <h2 className="font-['Quicksand'] text-5xl md:text-6xl font-bold text-[#394C9A] mb-6">
            Everything You Need<br />in One Platform
          </h2>
          <p className="text-xl text-[#5B6BA8] max-w-3xl mx-auto mb-8">
            From AI-powered legal research to connecting with real lawyers, ellio provides 
            enterprise-grade legal tools accessible to everyone.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#394C9A] via-[#5B6BA8] to-[#A8D4E6] mx-auto rounded-full" />
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border-2 border-[#D4DAF0] hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="font-['Quicksand'] text-2xl font-bold mb-4 text-[#394C9A] group-hover:text-[#5B6BA8] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#5B6BA8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Benefits Bar */}
        <div className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] rounded-3xl p-8 md:p-12">
          <h3 className="font-['Quicksand'] text-3xl font-bold text-white text-center mb-8">
            Why Thousands Choose ellio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Icon className="w-6 h-6 text-white flex-shrink-0" />
                  <span className="text-white font-medium">{benefit.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
