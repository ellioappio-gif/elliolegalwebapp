export default function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces for your applications',
    },
    {
      title: 'Digital Strategy',
      description: 'Strategic planning to maximize your digital presence',
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions tailored to your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-600 pl-6 py-4"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
