'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Briefcase, Heart, TrendingUp, Users, MapPin, Clock, DollarSign, GraduationCap, Send } from 'lucide-react'

export default function CareersPage() {
  const values = [
    {
      icon: Heart,
      title: 'Mission-Driven',
      description: 'We\'re democratizing legal access for everyone, not just the wealthy'
    },
    {
      icon: TrendingUp,
      title: 'Growth Mindset',
      description: 'Continuous learning and innovation are at our core'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'We win together as a team, celebrating each other\'s successes'
    }
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Market-rate compensation with equity options'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Premium health, dental, vision insurance plus mental health support'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Remote-first with flexible hours and unlimited PTO'
    },
    {
      icon: GraduationCap,
      title: 'Learning Budget',
      description: '$2,000/year for courses, conferences, and professional development'
    },
    {
      icon: Users,
      title: 'Team Events',
      description: 'Quarterly offsites and regular virtual social events'
    },
    {
      icon: Briefcase,
      title: 'Equipment',
      description: 'Latest MacBook and $500 home office stipend'
    }
  ]

  const openings = [
    {
      title: 'Senior AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Build and optimize our legal AI models to deliver accurate, helpful guidance to users.',
      requirements: [
        '5+ years experience with ML/AI systems',
        'Expertise in LLMs and RAG architectures',
        'Python, PyTorch/TensorFlow proficiency',
        'Experience with production AI systems at scale'
      ]
    },
    {
      title: 'Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Craft beautiful, performant user experiences with Next.js, React, and TypeScript.',
      requirements: [
        '3+ years full-stack development',
        'Strong TypeScript and React skills',
        'Experience with Next.js and modern web tech',
        'API design and database optimization'
      ]
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Design intuitive interfaces that make complex legal information accessible to everyone.',
      requirements: [
        '4+ years product design experience',
        'Portfolio demonstrating UX/UI excellence',
        'Figma expertise',
        'Experience with design systems'
      ]
    },
    {
      title: 'Content Writer (Legal)',
      department: 'Content',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Create educational legal content that empowers users to understand their rights.',
      requirements: [
        'J.D. or paralegal certification preferred',
        'Exceptional writing skills',
        'Ability to explain complex legal concepts simply',
        '2+ years legal writing experience'
      ]
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Help users get maximum value from Ellio while gathering feedback to improve the product.',
      requirements: [
        '3+ years customer success or support',
        'Excellent communication skills',
        'Empathy for user challenges',
        'SaaS experience preferred'
      ]
    },
    {
      title: 'Growth Marketing Manager',
      department: 'Marketing',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Drive user acquisition through data-driven campaigns across multiple channels.',
      requirements: [
        '4+ years growth marketing',
        'Expertise in SEO, SEM, content marketing',
        'Analytics and A/B testing proficiency',
        'B2C SaaS experience'
      ]
    }
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-['Quicksand'] text-5xl md:text-6xl font-bold mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Help us make legal help accessible to everyone, not just the wealthy
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-2xl px-6 py-3">
              <p className="text-white font-semibold">🚀 We're hiring! {openings.length} open positions</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-6">
              Why Ellio?
            </h2>
            <p className="text-xl text-[#5B6BA8] leading-relaxed mb-12">
              Legal help shouldn't cost $300/hour. We're building AI that empowers people to understand their rights, review contracts, and make informed decisions without breaking the bank. Join us in democratizing legal access.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[#F5F7FC] to-white border-2 border-[#D4DAF0] rounded-2xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-xl transition-all"
                >
                  <value.icon className="w-12 h-12 text-[#394C9A] mx-auto mb-4" />
                  <h3 className="font-['Quicksand'] text-xl font-bold text-[#394C9A] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#5B6BA8]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Benefits & Perks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 hover:border-[#394C9A] hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <benefit.icon className="w-10 h-10 text-[#394C9A] mb-4" />
                  <h3 className="font-['Quicksand'] text-xl font-bold text-[#394C9A] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#5B6BA8]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Open Positions
            </h2>
            <div className="space-y-6">
              {openings.map((job, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1 text-sm text-[#5B6BA8]">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-[#5B6BA8]">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-[#5B6BA8]">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:careers@ellio.solutions?subject=Application: ${job.title}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all whitespace-nowrap"
                    >
                      <Send className="w-5 h-5" />
                      Apply Now
                    </a>
                  </div>

                  <p className="text-[#5B6BA8] mb-4">
                    {job.description}
                  </p>

                  <div>
                    <h4 className="font-bold text-[#394C9A] mb-2">What we're looking for:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, j) => (
                        <li key={j} className="flex items-start gap-2 text-[#5B6BA8]">
                          <span className="text-[#394C9A] mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
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
              Don't See a Perfect Fit?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We're always looking for talented people who share our mission. Send us your resume!
            </p>
            <a
              href="mailto:careers@ellio.solutions"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <Send className="w-6 h-6" />
              careers@ellio.solutions
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
