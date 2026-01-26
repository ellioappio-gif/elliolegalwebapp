export default function Features() {
  const features = [
    {
      title: 'Responsive Design',
      description: 'Beautiful layouts that work perfectly on all devices',
      icon: '📱',
    },
    {
      title: 'Fast Performance',
      description: 'Optimized for speed and user experience',
      icon: '⚡',
    },
    {
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and uptime guarantees',
      icon: '🔒',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock',
      icon: '💬',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Features</h2>
          <p className="text-xl text-gray-600">Everything you need for your digital presence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
