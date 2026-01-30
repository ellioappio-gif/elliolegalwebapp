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
    </>
  )
}