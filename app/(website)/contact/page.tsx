'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

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
    <div>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="logo-link">
            <img className="logo" src="/ellio-logo.svg" alt="ellio legal" />
            <span className="logo-text">ellio legal</span>
          </Link>
          <div className="investor-badge">
            <div className="badge-dot"></div>
            Now Raising Series A
          </div>
          <div className="nav-links">
            <Link href="/about">About</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-brand">
            <div className="highlight">Contact Us</div>
          </div>
          <h1>Get in Touch</h1>
          <p className="hero-subtitle">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>
      </section>

      {/* Contact Info */}
      <div className="section-alt">
        <div className="content">
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">
                <Mail className="w-8 h-8" />
              </div>
              <h3>Email</h3>
              <p><strong>support@elliolegal.com</strong><br />We respond within 24 hours</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Phone className="w-8 h-8" />
              </div>
              <h3>Phone</h3>
              <p><strong>1 (800) ELLIO-1</strong><br />Monday - Friday, 9am-6pm EST</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <MapPin className="w-8 h-8" />
              </div>
              <h3>Address</h3>
              <p><strong>New York, NY</strong><br />United States</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section>
        <div className="content">
          <h2>Send us a Message</h2>

          {submitted && (
            <div className="success-message">
              ✓ Thank you! We've received your message and will get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us how we can help..."
              />
            </div>

            <button type="submit" disabled={loading} className="cta-btn cta-btn-large">
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && <Send className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </section>

      {/* Chat Fob */}
      <div className="chat-fob" id="chatFob">
        <div className="chat-fob-btn">
          <img src="/ellio-logo.svg" alt="Chat" />
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container text-center">
          <img className="footer-logo" src="/ellio-logo.svg" alt="ellio legal" />
          <div className="footer-brand">ellio legal</div>
          <p>Democratizing access to legal guidance through AI</p>
          <p>&copy; 2024 ellio legal. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
