export default function Features() {
  const features = [
    {
      title: 'AI-Powered Analysis',
      description: 'Advanced Claude AI reviews contracts and explains complex legal terms in plain language',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Document Review',
      description: 'Upload contracts, leases, or agreements for instant AI-powered analysis and insights',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'Lawyer Matching',
      description: 'When you need professional help, connect with verified lawyers in your area',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Rights Protection',
      description: 'Understand your rights in any situation with clear, actionable guidance',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#F5F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Quicksand'] text-4xl font-semibold text-[#394C9A] mb-3">
            How ellio Helps You
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] mx-auto rounded-full mb-4" />
          <p className="text-lg text-[#5B6BA8]">AI-powered legal assistance, designed for everyone</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-[#D4DAF0] hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#E8ECF8] to-[#D4DAF0] rounded-2xl flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="font-['Quicksand'] text-xl font-semibold mb-2 text-[#394C9A]">{feature.title}</h3>
              <p className="text-[#5B6BA8] text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
