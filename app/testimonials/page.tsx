'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Star, Quote, Video, CheckCircle, TrendingUp, Users, Award } from 'lucide-react'

export default function TestimonialsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = ['all', 'Tenant Rights', 'Employment', 'Business', 'Contracts', 'Family Law']

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Renter',
      category: 'Tenant Rights',
      rating: 5,
      date: 'January 2025',
      text: 'I was about to sign a lease with a ridiculous clause that would have made me liable for building repairs. Ellio flagged it instantly and suggested negotiation language. My landlord agreed to remove it. Saved me thousands!',
      savings: '$3,500',
      avatar: 'SJ',
      verified: true,
      featured: true
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      category: 'Employment',
      rating: 5,
      date: 'December 2024',
      text: 'The non-compete in my job offer was insane - would have prevented me from working in tech for 2 years. Ellio explained why it was unenforceable and gave me talking points. I negotiated it down to 6 months in my specific role.',
      savings: '$0',
      avatar: 'MC',
      verified: true,
      featured: true
    },
    {
      name: 'Emily Rodriguez',
      role: 'Small Business Owner',
      category: 'Business',
      rating: 5,
      date: 'December 2024',
      text: 'Starting my LLC was overwhelming until I found Ellio. The AI walked me through every step, explained tax implications, and helped me draft operating agreements. What would have cost $2,000 in lawyer fees took me 2 hours.',
      savings: '$2,000',
      avatar: 'ER',
      verified: true,
      featured: true
    },
    {
      name: 'David Park',
      role: 'Freelancer',
      category: 'Contracts',
      rating: 5,
      date: 'November 2024',
      text: 'I use Ellio for every client contract now. It catches payment terms issues, IP ownership problems, and liability clauses I never would have noticed. My clients appreciate how professional my contracts are.',
      savings: '$0',
      avatar: 'DP',
      verified: true,
      featured: false
    },
    {
      name: 'Jessica Williams',
      role: 'Marketing Manager',
      category: 'Employment',
      rating: 5,
      date: 'November 2024',
      text: 'When I was laid off, Ellio helped me understand my severance package and spot missing benefits I was entitled to. I negotiated an extra month of pay and extended health insurance. Worth every penny.',
      savings: '$8,500',
      avatar: 'JW',
      verified: true,
      featured: false
    },
    {
      name: 'Robert Martinez',
      role: 'Restaurant Owner',
      category: 'Business',
      rating: 5,
      date: 'October 2024',
      text: 'My commercial lease renewal had hidden rent increases I totally missed. Ellio broke down the escalation clauses in plain English and I was able to negotiate better terms. This platform pays for itself.',
      savings: '$12,000',
      avatar: 'RM',
      verified: true,
      featured: false
    },
    {
      name: 'Amanda Foster',
      role: 'Homebuyer',
      category: 'Contracts',
      rating: 5,
      date: 'October 2024',
      text: 'Buying my first home was terrifying. Ellio reviewed my purchase agreement and inspection contingencies, explaining every clause. I felt confident going into the biggest purchase of my life.',
      savings: '$0',
      avatar: 'AF',
      verified: true,
      featured: false
    },
    {
      name: 'Chris Thompson',
      role: 'Startup Founder',
      category: 'Business',
      rating: 5,
      date: 'September 2024',
      text: 'Investor agreements, NDAs, employee contracts - Ellio has reviewed them all. The AI catches things even our lawyer missed sometimes. It\'s like having a legal team on call 24/7 for a fraction of the cost.',
      savings: '$15,000+',
      avatar: 'CT',
      verified: true,
      featured: false
    },
    {
      name: 'Lisa Anderson',
      role: 'Teacher',
      category: 'Family Law',
      rating: 5,
      date: 'September 2024',
      text: 'During my divorce, Ellio helped me understand custody agreements and asset division. I went into mediation prepared and confident. The AI even suggested questions to ask that led to a fairer settlement.',
      savings: '$5,000',
      avatar: 'LA',
      verified: true,
      featured: false
    }
  ]

  const filteredTestimonials = testimonials.filter(t => 
    selectedFilter === 'all' || t.category === selectedFilter
  )

  const stats = [
    { label: 'Total Users', value: '50,000+', icon: Users },
    { label: 'Average Savings', value: '$4,200', icon: TrendingUp },
    { label: 'Success Rate', value: '98%', icon: Award },
    { label: 'Satisfaction', value: '4.9/5', icon: Star }
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Quote className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-['Quicksand'] text-5xl md:text-6xl font-bold mb-6">
              Real Stories, Real Results
            </h1>
            <p className="text-xl text-white/90">
              See how Ellio has helped thousands save money and understand their legal rights
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#F5F7FC] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#394C9A]" />
                  <div className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#5B6BA8]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white'
                      : 'bg-white text-[#5B6BA8] border-2 border-[#D4DAF0] hover:border-[#394C9A]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-20 bg-gradient-to-br from-[#F5F7FC] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Featured Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {filteredTestimonials.filter(t => t.featured).map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white border-4 border-[#394C9A] rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all relative"
                >
                  {/* Featured Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-4 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>

                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    {testimonial.avatar}
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-[#5B6BA8] leading-relaxed mb-6 text-center italic">
                    "{testimonial.text}"
                  </p>

                  {/* Savings Badge */}
                  {testimonial.savings !== '$0' && (
                    <div className="text-center mb-4">
                      <div className="inline-block bg-semantic-success-subtle text-semantic-success px-4 py-2 rounded-lg font-bold">
                        Saved {testimonial.savings}
                      </div>
                    </div>
                  )}

                  {/* Author */}
                  <div className="text-center border-t border-[#D4DAF0] pt-4">
                    <div className="font-bold text-[#394C9A] flex items-center justify-center gap-2">
                      {testimonial.name}
                      {testimonial.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-[#5B6BA8]">{testimonial.role}</div>
                    <div className="text-xs text-[#5B6BA8] mt-1">{testimonial.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              More Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.filter(t => !t.featured).map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-xl transition-all"
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white flex items-center justify-center font-bold text-lg mb-4">
                    {testimonial.avatar}
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Category */}
                  <div className="inline-block bg-[#D4DAF0] text-[#394C9A] px-3 py-1 rounded-lg text-xs font-semibold mb-4">
                    {testimonial.category}
                  </div>

                  {/* Text */}
                  <p className="text-[#5B6BA8] leading-relaxed mb-4 italic text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Savings */}
                  {testimonial.savings !== '$0' && (
                    <div className="mb-4">
                      <span className="bg-semantic-success-subtle text-semantic-success px-3 py-1 rounded-lg text-sm font-bold">
                        Saved {testimonial.savings}
                      </span>
                    </div>
                  )}

                  {/* Author */}
                  <div className="border-t border-[#D4DAF0] pt-4">
                    <div className="font-bold text-[#394C9A] flex items-center gap-2">
                      {testimonial.name}
                      {testimonial.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-[#5B6BA8]">{testimonial.role}</div>
                    <div className="text-xs text-[#5B6BA8] mt-1">{testimonial.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands who've saved money and gained legal clarity
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Start Free Trial
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
