import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content: 'ellio reviewed my commercial lease and caught clauses that would have cost me thousands. The AI explained everything in plain English. Worth every penny!',
      rating: 5,
      initials: 'SJ',
      color: '#394C9A',
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      content: 'I was hesitant about an employment contract. ellio analyzed it in minutes and helped me negotiate better terms. Saved me $15K in lawyer fees.',
      rating: 5,
      initials: 'MC',
      color: '#5B6BA8',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Renter',
      content: 'My landlord was withholding my security deposit. ellio helped me understand my rights and draft a demand letter. Got my full deposit back!',
      rating: 5,
      initials: 'ER',
      color: '#10B981',
    },
    {
      name: 'David Park',
      role: 'Freelance Designer',
      content: 'The contract templates and AI reviews have been invaluable for my freelance business. I feel confident in every client agreement now.',
      rating: 5,
      initials: 'DP',
      color: '#A8D4E6',
    },
    {
      name: 'Jessica Williams',
      role: 'First-Time Home Buyer',
      content: 'Buying a home is scary! ellio walked me through all the documents and explained what everything meant. Highly recommend!',
      rating: 5,
      initials: 'JW',
      color: '#F59E0B',
    },
    {
      name: 'Robert Martinez',
      role: 'Restaurant Owner',
      content: 'From vendor contracts to employee agreements, ellio has become essential for my business. The 24/7 AI assistant is a game-changer.',
      rating: 5,
      initials: 'RM',
      color: '#394C9A',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              Loved by Thousands
            </span>
          </div>
          <h2 className="font-['Quicksand'] text-5xl md:text-6xl font-bold text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of satisfied users who've saved time and money with ellio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-white/40 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white text-lg mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-['Quicksand'] font-bold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-white/80 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-['Quicksand'] text-5xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80">Happy Users</div>
          </div>
          <div>
            <div className="font-['Quicksand'] text-5xl font-bold text-white mb-2">4.9</div>
            <div className="text-white/80">Average Rating</div>
          </div>
          <div>
            <div className="font-['Quicksand'] text-5xl font-bold text-white mb-2">100K+</div>
            <div className="text-white/80">Documents Reviewed</div>
          </div>
          <div>
            <div className="font-['Quicksand'] text-5xl font-bold text-white mb-2">$50M+</div>
            <div className="text-white/80">Saved in Legal Fees</div>
          </div>
        </div>
      </div>
    </section>
  )
}
