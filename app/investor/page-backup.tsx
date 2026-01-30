'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InvestorPage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I can answer questions about ellio's business model, market opportunity, and investment thesis. What would you like to know?"
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const toggleChat = () => setChatOpen(!chatOpen)

  const sendMessage = () => {
    if (!inputValue.trim()) return
    
    const newMessages = [...messages, { type: 'user', content: inputValue }]
    setMessages(newMessages)
    
    setTimeout(() => {
      const response = getResponse(inputValue)
      setMessages([...newMessages, { type: 'ai', content: response }])
    }, 1000)
    
    setInputValue('')
  }

  const getResponse = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.includes('market') || lower.includes('tam') || lower.includes('opportunity')) 
      return "The US legal services market is $350B. Our serviceable market (LegalTech) is $28B growing at 12% CAGR. AI legal tools specifically are projected to reach $2.5B by 2027 with 37% CAGR."
    if (lower.includes('revenue') || lower.includes('business model')) 
      return "We have 4 revenue streams: subscription revenue (6 tiers from $0-$129.99), attorney referral fees, premium add-ons, and enterprise/API licensing. Target blended ARPU is $24/month."
    if (lower.includes('competition') || lower.includes('competitor')) 
      return "Unlike LegalZoom and Rocket Lawyer, we offer AI-powered chat with Claude. Unlike DoNotPay, we have attorney marketplace integration. We're the only platform combining advanced AI, document analysis, and attorney matching with a free tier."
    if (lower.includes('team')) 
      return "Our team includes the founder/CEO with legal tech and consumer app experience, JD/MBA legal advisors from BigLaw, AI engineers with leading lab experience, and product veterans from LegalZoom, Notion, and Stripe."
    if (lower.includes('traction') || lower.includes('progress')) 
      return "We have a production iOS app in TestFlight, Claude AI integration complete, 6-tier pricing implemented, and 50-state coverage ready. Currently preparing for public launch."
    if (lower.includes('invest') || lower.includes('raise') || lower.includes('round')) 
      return "We're raising a seed round to fuel growth through Year 2 milestones. Key targets include 100K users, $4M+ ARR, Android launch, and enterprise pilots. Email investors@elliolegal.com for the pitch deck."
    return "I can provide details on market opportunity, business model, competitive advantage, team, traction, and investment terms. What interests you most?"
  }

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="container">
          <Link href="#" className="logo-link">
            <img className="logo-icon" src="/ellio-logo.svg" alt="ellio" />
            <span className="logo-text">ellio legal</span>
            <span className="investor-badge">INVESTORS</span>
          </Link>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#market">Market</a>
            <a href="#business">Business</a>
            <a href="#team">Team</a>
            <Link href="/">For Users</Link>
            <Link href="/">For Attorneys</Link>
            <a href="#invest" className="cta-btn">Invest Now</a>
          </div>
        </div>
      </nav>

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

      {/* Business Model */}
      <section id="business">
        <div className="text-center">
          <h2>Scalable Business Model</h2>
          <p className="subtitle">Multiple revenue streams with strong unit economics and clear path to profitability.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Pricing Tiers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Revenue Streams</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$24</div>
            <div className="stat-label">Target ARPU/Month</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">80%</div>
            <div className="stat-label">Gross Margin</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <div className="section-alt">
        <div className="content">
          <div className="text-center" id="team">
            <h2>Experienced Team</h2>
            <p className="subtitle">Legal tech veterans with AI expertise and proven track record.</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">CW</div>
              <h4>Cody Williams</h4>
              <div className="role">CEO & Founder</div>
              <p>Serial entrepreneur with legal tech background and consumer app experience.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">LA</div>
              <h4>Legal Advisory</h4>
              <div className="role">JD/MBA Board</div>
              <p>Former BigLaw partners and legal aid directors ensuring compliance and quality.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">AI</div>
              <h4>AI Engineering</h4>
              <div className="role">ML Team</div>
              <p>AI researchers with experience at leading labs building production legal AI.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">PD</div>
              <h4>Product Team</h4>
              <div className="role">Design & Engineering</div>
              <p>Product veterans from LegalZoom, Notion, and Stripe building intuitive experiences.</p>
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
        <div className="chat-window">
          <div className="chat-window-header">
            <span>🐘 ellio investor chat</span>
            <button className="chat-close" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-window-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.type}`}>
                <div className="chat-msg-content">{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="chat-window-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about investment..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">
          Democratizing Legal Access <br />
          Through AI Innovation
        </h1>
        <p className="hero-subtitle">
          ellio transforms how Americans access legal guidance with AI-powered solutions, 
          attorney matching, and transparent pricing. Join our mission to make legal services 
          accessible to everyone.
        </p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">$350B</div>
            <div className="stat-label">US Legal Services Market</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">37%</div>
            <div className="stat-label">AI Legal Market CAGR</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Revenue Streams</div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <section>
        <div className="content">
          <h2>The $350 billion legal access problem.</h2>
          <p className="subtitle">63% of Americans can't afford legal services when needed. We're changing that.</p>
          
          <div className="cards-grid">
            <div className="card">
              <h3>The Problem</h3>
              <p>Average attorney consultation costs $300+/hour. Document review runs $200-500. Most Americans avoid legal guidance due to cost, creating a massive underserved market.</p>
            </div>
            <div className="card">
              <h3>Our Solution</h3>
              <p>AI-powered legal guidance starting at $0. Plain language explanations, document analysis, and attorney matching when needed. 24/7 access at consumer prices.</p>
            </div>
            <div className="card">
              <h3>Market Validation</h3>
              <p>LegalZoom: $2B+ revenue, 4M+ customers. DoNotPay: 150K+ subscribers. We combine the best of both with advanced AI and transparent pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <div className="section-alt">
        <div className="content">
          <h2>Why we win vs. existing solutions.</h2>
          <p className="subtitle">First-mover advantage in AI-native legal guidance with attorney marketplace integration.</p>
          
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>ellio</th>
                  <th>LegalZoom</th>
                  <th>Rocket Lawyer</th>
                  <th>DoNotPay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AI-Powered Chat</td>
                  <td className="highlight-col"><span className="check">✓ Claude</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">Basic</span></td>
                </tr>
                <tr>
                  <td>Document Analysis</td>
                  <td className="highlight-col"><span className="check">✓ AI-Powered</span></td>
                  <td><span className="cross">Limited</span></td>
                  <td><span className="cross">Templates</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
                <tr>
                  <td>Attorney Matching</td>
                  <td className="highlight-col"><span className="check">✓ All 50</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">Limited</span></td>
                </tr>
                <tr>
                  <td>24/7 Availability</td>
                  <td className="highlight-col"><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Business Model */}
      <section>
        <div className="content">
          <h2>Six-tier pricing model.</h2>
          <p className="subtitle">Freemium conversion with clear upgrade paths and strong unit economics.</p>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-period">forever</div>
              <div className="pricing-features">5 queries/mo, Basic FAQs, Ad-supported</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Basic</div>
              <div className="pricing-price">$9.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">50 queries/mo, Doc summaries, Email support</div>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-tier">Standard</div>
              <div className="pricing-price">$19.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">200 queries/mo, Doc review, 1 attorney consult</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Advanced</div>
              <div className="pricing-price">$29.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">500 queries/mo, Unlimited docs, 3 consults</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Comprehensive</div>
              <div className="pricing-price">$39.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">Unlimited queries, Priority matching, 5 consults</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Firms</div>
              <div className="pricing-price">$129.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">5 users, Team features, API access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <div className="section-alt">
        <div className="content">
          <h2>Four revenue streams.</h2>
          <p className="subtitle">Diversified business model with multiple paths to profitability.</p>
          
          <div className="revenue-grid">
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Subscription Revenue</h4>
                <p>Recurring monthly subscriptions across 6 tiers. Target 15% free-to-paid conversion, 80% annual retention.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Attorney Referral Fees</h4>
                <p>Commission on attorney matches. Pre-qualified leads deliver value to attorneys, generating referral revenue.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Premium Add-Ons</h4>
                <p>Additional consultations, expedited review, premium templates. High-margin upsells to engaged users.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Enterprise & API</h4>
                <p>B2B licensing for law firms, HR departments, and legal aid organizations. White-label opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 10x Value Guarantee */}
      <section>
        <div className="content">
          <div className="guarantee">
            <h2>10x Value Guarantee</h2>
            <p style={{maxWidth: '700px', margin: '0 auto 2rem', opacity: 0.9}}>
              Our confidence in product-market fit: users save 10x their subscription cost or get a full refund.
            </p>
            <div className="guarantee-grid">
              <div className="guarantee-item">
                <h4>Transparent Tracking</h4>
                <p>Every interaction shows equivalent attorney cost savings.</p>
              </div>
              <div className="guarantee-item">
                <h4>Dashboard Metrics</h4>
                <p>Users see cumulative savings, driving retention and upgrades.</p>
              </div>
              <div className="guarantee-item">
                <h4>Risk Reversal</h4>
                <p>90-day refund policy reduces friction, increases conversions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Economics */}
      <div className="section-alt">
        <div className="content">
          <h2>Strong unit economics.</h2>
          <p className="subtitle">Scalable business with attractive margins and clear path to profitability.</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">$24</div>
              <div className="stat-label">Blended ARPU (Monthly)</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$8</div>
              <div className="stat-label">Target CAC</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3:1</div>
              <div className="stat-label">LTV:CAC Ratio</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">80%</div>
              <div className="stat-label">Gross Margin Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <section>
        <div className="content">
          <h2>Technology stack.</h2>
          <p className="subtitle">Built on cutting-edge AI with enterprise-grade security.</p>
          
          <div className="tech-features">
            <div className="tech-feature">
              <h4><span className="tech-badge">AI</span> Claude by Anthropic</h4>
              <p>State-of-the-art language model with Constitutional AI for safe, accurate responses.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">MOBILE</span> React Native / Expo</h4>
              <p>Cross-platform development with TypeScript for type safety and maintainability.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">BACKEND</span> Firebase</h4>
              <p>Scalable serverless infrastructure with real-time database and authentication.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">STATE</span> Zustand</h4>
              <p>Lightweight state management for fast, responsive user experience.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">RAG</span> Legal Database</h4>
              <p>Retrieval-augmented generation with verified legal sources for accuracy.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">SECURITY</span> SOC 2 Type II</h4>
              <p>Enterprise security certification with end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Go-to-Market */}
      <div className="section-alt">
        <div className="content">
          <h2>Go-to-market strategy.</h2>
          <p className="subtitle">Three-phase approach to market penetration and growth.</p>
          
          <div className="cards-grid">
            <div className="card">
              <h3>Phase 1: Launch</h3>
              <p style={{color: 'var(--sky-blue)', fontWeight: 600, marginBottom: '0.5rem'}}>Months 1-6</p>
              <p>iOS app launch, early adopter acquisition, content marketing, SEO foundation. Target: 10K users.</p>
            </div>
            <div className="card">
              <h3>Phase 2: Scale</h3>
              <p style={{color: 'var(--medium-blue)', fontWeight: 600, marginBottom: '0.5rem'}}>Months 7-18</p>
              <p>Android launch, paid acquisition, attorney partnerships, enterprise pilots. Target: 100K users.</p>
            </div>
            <div className="card">
              <h3>Phase 3: Expand</h3>
              <p style={{color: 'var(--deep-indigo)', fontWeight: 600, marginBottom: '0.5rem'}}>Months 19-36</p>
              <p>B2B enterprise deals, white-label licensing, international expansion. Target: 1M+ users.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <section>
        <div className="content">
          <h2>Financial projections.</h2>
          <p className="subtitle">Conservative 5-year revenue and user growth model.</p>
          
          <div className="projections">
            <div className="projections-row header">
              <div></div>
              <div>Year 1</div>
              <div>Year 2</div>
              <div>Year 3</div>
              <div>Year 4</div>
              <div>Year 5</div>
            </div>
            <div className="projections-row">
              <div className="label">Users (K)</div>
              <div className="value">25</div>
              <div className="value">100</div>
              <div className="value">350</div>
              <div className="value">750</div>
              <div className="value highlight">1,500</div>
            </div>
            <div className="projections-row">
              <div className="label">Paid Users (K)</div>
              <div className="value">2.5</div>
              <div className="value">15</div>
              <div className="value">52</div>
              <div className="value">112</div>
              <div className="value highlight">225</div>
            </div>
            <div className="projections-row">
              <div className="label">ARR ($M)</div>
              <div className="value">$0.7</div>
              <div className="value">$4.3</div>
              <div className="value">$15</div>
              <div className="value">$32</div>
              <div className="value highlight">$65</div>
            </div>
            <div className="projections-row">
              <div className="label">Gross Margin</div>
              <div className="value">65%</div>
              <div className="value">72%</div>
              <div className="value">78%</div>
              <div className="value">80%</div>
              <div className="value highlight">82%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <div className="section-alt">
        <div className="content">
          <h2>Leadership team.</h2>
          <p className="subtitle">Experienced operators with legal tech and AI expertise.</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">CW</div>
              <h4>Cody Williams</h4>
              <div className="role">CEO & Founder</div>
              <p>Serial entrepreneur, legal tech background, consumer app experience.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">JD</div>
              <h4>Legal Advisory Board</h4>
              <div className="role">JD/MBA Advisors</div>
              <p>Former BigLaw partners and legal aid directors ensuring compliance.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">AI</div>
              <h4>AI Engineering</h4>
              <div className="role">ML Engineers</div>
              <p>AI researchers with experience at leading labs building legal AI.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">PD</div>
              <h4>Product & Design</h4>
              <div className="role">Product Team</div>
              <p>Veterans from LegalZoom, Notion, and Stripe building intuitive UX.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Traction */}
      <section>
        <div className="content">
          <h2>Current traction.</h2>
          <p className="subtitle">Building momentum with a production-ready product.</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">iOS</div>
              <div className="stat-label">Production App in TestFlight</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Claude</div>
              <div className="stat-label">AI Integration Complete</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">Pricing Tiers Implemented</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50</div>
              <div className="stat-label">State Coverage Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <div className="section-alt">
        <div className="content">
          <h2>Use of funds.</h2>
          <p className="subtitle">Strategic allocation to drive growth and profitability.</p>
          
          <div className="cards-grid">
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Engineering (40%)</h3>
              <p>AI improvements, Android development, enterprise features, scalability.</p>
            </div>
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Marketing (35%)</h3>
              <p>User acquisition, content marketing, SEO, attorney partner recruitment.</p>
            </div>
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Operations (25%)</h3>
              <p>Legal compliance, customer success, infrastructure, security certifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Terms */}
      <section>
        <div className="content">
          <h2>Investment opportunity.</h2>
          <p className="subtitle">Join us in democratizing access to legal guidance.</p>
          
          <div className="cards-grid">
            <div className="card">
              <h3>Seed Round</h3>
              <p>Raising seed capital to fuel growth through Year 2 milestones. Strategic investors preferred.</p>
            </div>
            <div className="card">
              <h3>Key Milestones</h3>
              <p>100K users, $4M+ ARR, Android launch, 50+ attorney partners, enterprise pilot customers.</p>
            </div>
            <div className="card">
              <h3>Exit Potential</h3>
              <p>LegalTech M&A activity strong. Comparable exits: Clio ($1.6B), LegalZoom (IPO), Ironclad ($3.2B).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="section-alt">
        <div className="content">
          <div className="investment-cta">
            <h2>Ready to invest in legal access?</h2>
            <p>ellio is democratizing legal guidance through AI. Join us in building the future of legal services.</p>
            <div className="investment-details">
              <div className="investment-item">
                <div className="value">$350B</div>
                <div className="label">Market Opportunity</div>
              </div>
              <div className="investment-item">
                <div className="value">37%</div>
                <div className="label">AI Legal CAGR</div>
              </div>
              <div className="investment-item">
                <div className="value">4</div>
                <div className="label">Revenue Streams</div>
              </div>
            </div>
            <a 
              href="mailto:investors@elliolegal.com?subject=Investment%20Inquiry" 
              className="cta-btn cta-btn-large" 
              style={{background: 'var(--deep-indigo)'}}
            >
              Request Pitch Deck
            </a>
            <p style={{marginTop: '1.5rem', fontSize: '0.9rem'}}>
              Or email investors@elliolegal.com for more information.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Fob */}
      <div className={`chat-fob ${chatOpen ? 'open' : ''}`}>
        <div className="chat-fob-btn" onClick={toggleChat}>
          <MessageCircle color="white" size={24} />
        </div>
        <div className="chat-window">
          <div className="chat-window-header">
            <MessageCircle color="white" size={20} />
            <span>ellio investor relations</span>
            <button className="chat-close" onClick={toggleChat}>
              <X size={16} />
            </button>
          </div>
          <div className="chat-window-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.type}`}>
                {msg.type === 'ai' && (
                  <MessageCircle size={24} className="chat-msg-icon" style={{color: '#4A4FA5'}} />
                )}
                <div className="chat-msg-content">{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="chat-window-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the investment..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <MessageCircle size={60} className="footer-logo" style={{color: 'white'}} />
        <div className="footer-brand">ellio legal</div>
        <p>AI-Powered Legal Guidance for Everyone</p>
        <p>&copy; 2025 ellio legal. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/">For Users</Link>
          <Link href="/">For Attorneys</Link>
          <a href="mailto:investors@elliolegal.com">Investor Contact</a>
        </div>
      </footer>
    </div>
  )
}