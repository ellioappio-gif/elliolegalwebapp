'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  const toggleChat = () => setChatOpen(!chatOpen)

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <img 
            src="/ellio-logo.svg" 
            alt="ellio" 
            className="hero-elephant"
          />
          <h1 className="hero-brand">ellio <span className="highlight">legal</span></h1>
          <p className="hero-tagline">Democratizing Legal Access Through AI</p>
          <p className="hero-subtitle">AI-powered legal guidance and attorney marketplace making legal services accessible, affordable, and available 24/7.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">$350B</div>
              <div className="hero-stat-label">Legal Market</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">37%</div>
              <div className="hero-stat-label">AI Legal CAGR</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">iOS</div>
              <div className="hero-stat-label">Production Ready</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">50</div>
              <div className="hero-stat-label">State Coverage</div>
            </div>
          </div>
          <div className="hero-cta">
            <a href="#invest" className="cta-btn cta-btn-large">View Investment</a>
            <Link href="/" className="btn-secondary">Try Live Product</Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem">
        <div className="text-center">
          <h2>The Legal Access Crisis</h2>
          <p className="subtitle">63% of Americans can't afford legal representation when they need it most.</p>
        </div>
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3>High Cost Barrier</h3>
            <p>Average attorney consultation: $300/hour. Document review: $200-500. Most Americans simply can't afford professional legal guidance when they need it.</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3>Complex Legal Language</h3>
            <p>Legal documents are written in complex jargon that's impossible for regular people to understand, creating dependency on expensive professionals.</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
            </div>
            <h3>Limited Availability</h3>
            <p>Attorneys work business hours only. Legal emergencies don't wait for 9-5. People need guidance immediately, not next week.</p>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <div className="section-alt">
        <div className="content">
          <div className="text-center">
            <h2>Massive Market Opportunity</h2>
            <p className="subtitle">The legal industry is ripe for disruption with AI-powered solutions.</p>
          </div>
          <div className="market-grid">
            <div className="market-card tam">
              <div className="market-label">TAM</div>
              <div className="market-value">$350B</div>
              <div className="market-desc">Total US legal services market</div>
            </div>
            <div className="market-card sam">
              <div className="market-label">SAM</div>
              <div className="market-value">$28B</div>
              <div className="market-desc">LegalTech serviceable market</div>
            </div>
            <div className="market-card som">
              <div className="market-label">SOM</div>
              <div className="market-value">$2.5B</div>
              <div className="market-desc">AI legal tools by 2027</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment CTA */}
      <section id="invest">
        <div className="investment-cta">
          <h2>Ready to Invest?</h2>
          <p>Join us in democratizing legal access through AI. Seed round now open for strategic investors.</p>
          <div className="investment-details">
            <div className="investment-item">
              <div className="value">Seed</div>
              <div className="label">Round Stage</div>
            </div>
            <div className="investment-item">
              <div className="value">$2.5M</div>
              <div className="label">Target Raise</div>
            </div>
            <div className="investment-item">
              <div className="value">100K</div>
              <div className="label">Year 2 Users</div>
            </div>
            <div className="investment-item">
              <div className="value">$4M</div>
              <div className="label">Year 2 ARR</div>
            </div>
          </div>
          <a 
            href="mailto:investors@elliolegal.com?subject=Investment%20Inquiry" 
            className="cta-btn cta-btn-large"
          >
            Request Pitch Deck
          </a>
        </div>
      </section>

      {/* Chat Bot */}
      <div className={`chat-fob ${chatOpen ? 'open' : ''}`}>
        <div className="chat-fob-btn" onClick={toggleChat}>
          💬
        </div>
      </div>
    </>
  )
}
