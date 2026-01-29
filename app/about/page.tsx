import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield, Users, Award, Target, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6">
              Making Legal Help<br />Accessible to Everyone
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We believe that understanding your legal rights shouldn't require a law degree or cost thousands of dollars.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-sans text-4xl font-bold text-brand-indigo-700 mb-6">Our Mission</h2>
              <p className="text-xl text-[#5B6BA8] leading-relaxed">
                To democratize legal knowledge by combining cutting-edge AI technology with human expertise, 
                empowering everyone to understand their rights, navigate legal situations, and access affordable legal help.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Trust & Security',
                  description: 'Your data is encrypted and private. We never share your information without permission.',
                },
                {
                  icon: Heart,
                  title: 'Empathy First',
                  description: 'Legal issues are stressful. Our AI is designed to be understanding, patient, and helpful.',
                },
                {
                  icon: Users,
                  title: 'Accessibility',
                  description: 'Legal help should be available 24/7, in plain language, at a price everyone can afford.',
                },
                {
                  icon: Target,
                  title: 'Accuracy',
                  description: 'Powered by Claude AI, trained on comprehensive legal information and best practices.',
                },
                {
                  icon: Award,
                  title: 'Quality',
                  description: 'Every feature is designed with care to provide real value and actual solutions.',
                },
                {
                  icon: Globe,
                  title: 'For Everyone',
                  description: 'From renters to business owners, we serve anyone who needs legal guidance.',
                },
              ].map((value, i) => {
                const Icon = value.icon
                return (
                  <div key={i} className="bg-white border-2 border-border-subtle rounded-3xl p-8 hover:border-brand-indigo-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <Icon className="w-12 h-12 text-brand-indigo-700 mb-4" />
                    <h3 className="font-sans text-2xl font-bold text-brand-indigo-700 mb-4">{value.title}</h3>
                    <p className="text-[#5B6BA8] leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-4xl font-bold text-brand-indigo-700 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-[#5B6BA8] leading-relaxed">
              <p>
                ellio legal was born from a simple frustration: legal help is too expensive, too complicated, 
                and too inaccessible for most people.
              </p>
              <p>
                When you face a legal issue — whether it's reviewing a lease, understanding your rights at work, 
                or dealing with a contract — you shouldn't have to choose between spending thousands on a lawyer 
                or trying to navigate complex legal jargon alone.
              </p>
              <p>
                We built ellio to bridge that gap. By combining advanced AI technology with a deep understanding 
                of real legal challenges people face, we've created a platform that provides instant, accurate, 
                and affordable legal guidance.
              </p>
              <p>
                Our AI assistant doesn't replace lawyers — it complements them. For everyday questions, document 
                reviews, and understanding your rights, ellio provides immediate help. And when you need a 
                professional attorney, we connect you with verified lawyers in your area.
              </p>
              <p className="font-semibold text-brand-indigo-700">
                We're not lawyers. We're just here to help — 24/7, in plain English, at a price that makes sense.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-4xl font-bold text-brand-indigo-700 mb-12 text-center">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '50,000+', label: 'Happy Users' },
                { number: '100,000+', label: 'Documents Reviewed' },
                { number: '$50M+', label: 'Saved in Legal Fees' },
                { number: '4.9/5', label: 'Average Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-sans text-5xl font-bold text-brand-indigo-700 mb-2">{stat.number}</div>
                  <div className="text-[#5B6BA8]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-6">
              Join Thousands Who've<br />Simplified Their Legal Life
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start your free trial today. No credit card required.
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-brand-indigo-700 px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              Get Started Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
