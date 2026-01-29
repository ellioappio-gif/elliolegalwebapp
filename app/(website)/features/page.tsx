import Link from 'next/link'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import Services from '@/components/Services'
import { Zap, Shield, Clock, DollarSign } from 'lucide-react'

export default function FeaturesPage() {
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
            <div className="highlight">Features</div>
          </div>
          <h1>Everything You Need<br />for Legal Clarity</h1>
          <p className="hero-subtitle">From AI-powered document analysis to connecting with real lawyers, 
            ellio provides comprehensive legal tools in one simple platform.</p>
        </div>
      </section>

      {/* Why Choose ellio */}
      <div className="section-alt">
        <div className="content">
          <h2>Why Choose ellio?</h2>
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">
                <Zap className="w-8 h-8" />
              </div>
              <h3>Instant Answers</h3>
              <p>Get legal guidance in under 5 minutes, not 5 days.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3>Save 69x</h3>
              <p>Average savings compared to traditional legal fees.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Clock className="w-8 h-8" />
              </div>
              <h3>24/7 Available</h3>
              <p>AI legal assistant ready whenever you need help.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Shield className="w-8 h-8" />
              </div>
              <h3>Secure & Private</h3>
              <p>Your legal information is encrypted and never shared.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <Features />

      {/* Services Detail */}
      <Services />

      {/* Use Cases */}
      <UseCases />

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
