'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
            <div className="highlight">FAQ</div>
          </div>
          <h1>Frequently Asked Questions</h1>
          <p className="hero-subtitle">Find answers to common questions about ellio legal</p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="section-alt">
        <div className="content">
          <h2>Common Questions</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>What is ellio legal?</h3>
              <p>ellio legal is an AI-powered legal assistance platform that helps you understand legal documents, know your rights, and connect with lawyers.</p>
            </div>
            <div className="card">
              <h3>How much does it cost?</h3>
              <p>We offer a free tier with basic features, plus Premium and Enterprise plans with advanced features and support.</p>
            </div>
            <div className="card">
              <h3>Is the AI legal advice?</h3>
              <p>No. ellio provides legal information and guidance, not legal advice. For specific legal matters, we recommend consulting with a licensed attorney.</p>
            </div>
          </div>
        </div>
      </div>

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
