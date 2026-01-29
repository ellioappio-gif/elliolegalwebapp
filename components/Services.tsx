export default function Services() {
  const services = [
    {
      title: 'Contract Review',
      description: 'Upload any contract and get a plain-language summary of key terms, risks, and what to watch for.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Legal Research',
      description: 'Ask questions about laws, rights, and procedures. Get answers backed by real legal information.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: 'Document Drafting',
      description: 'Generate letters, agreements, and legal documents tailored to your specific situation.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#394C9A" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Quicksand'] text-4xl font-semibold text-[#394C9A] mb-3">
            What You Can Do
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] mx-auto rounded-full mb-4" />
          <p className="text-lg text-[#5B6BA8]">Comprehensive legal tools at your fingertips</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-l-4 border-[#394C9A] bg-white pl-6 py-6 pr-6 rounded-r-xl hover:translate-x-1 transition-transform"
            >
              <div className="flex items-center gap-3 mb-3">
                {service.icon}
                <h3 className="font-['Quicksand'] text-xl font-semibold text-[#394C9A]">{service.title}</h3>
              </div>
              <p className="text-[#5B6BA8] leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
