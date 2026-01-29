'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PublicContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setLoading(false)
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h1 className="font-['Quicksand'] text-4xl md:text-5xl font-semibold text-[#394C9A] mb-4">Contact Us</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] mx-auto rounded-full mb-4" />
          <p className="text-xl text-[#5B6BA8]">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: Mail,
              title: 'Email',
              content: 'support@elliolegal.com',
              description: 'We respond within 24 hours'
            },
            {
              icon: Phone,
              title: 'Phone',
              content: '1 (800) ELLIO-1',
              description: 'Monday - Friday, 9am-6pm EST'
            },
            {
              icon: MapPin,
              title: 'Address',
              content: 'New York, NY',
              description: 'United States'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D4DAF0] p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#E8ECF8] flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-[#394C9A]" />
              </div>
              <h3 className="font-['Quicksand'] text-lg font-semibold text-[#394C9A] mb-2">{item.title}</h3>
              <p className="font-medium text-[#394C9A] mb-1">{item.content}</p>
              <p className="text-sm text-[#5B6BA8]">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl border border-[#D4DAF0] p-8 md:p-12 max-w-2xl mx-auto">
          <h2 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-3">Send us a Message</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] rounded-full mb-8" />

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
              ✓ Thank you! We've received your message and will get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#394C9A] mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A] resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg disabled:opacity-50 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && <Send className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 p-6 bg-[#E8ECF8] rounded-lg border border-[#D4DAF0]">
            <p className="text-sm text-[#5B6BA8]">
              <strong className="text-[#394C9A]">Already a user?</strong> Log in to your{' '}
              <Link href="/dashboard" className="text-[#394C9A] hover:text-[#5B6BA8] font-semibold">
                dashboard
              </Link>
              {' '}to contact us directly through your account.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
