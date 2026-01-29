import Link from 'next/link'

export default function Hero() {
  return (
    <div>
      {/* Navigation */}
      <nav>
        <div className="container">
          <a href="#" className="logo-link">
            <img className="logo-icon" src="/ellio-logo.svg" alt="ellio" />
            <span className="logo-text">ellio legal</span>
            <span className="investor-badge">INVESTORS</span>
          </a>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#market">Market</a>
            <a href="#business">Business</a>
            <a href="#team">Team</a>
            <a href="ellio-legal-users.html">For Users</a>
            <a href="ellio-legal-lawyers.html">For Attorneys</a>
            <a href="#invest" className="cta-btn">Invest Now</a>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
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
              <div className="hero-stat-value">Claude</div>
              <div className="hero-stat-label">AI Integration</div>
            </div>
          </div>
          <div className="hero-cta">
            <a href="#invest" className="cta-btn cta-btn-large">Request Pitch Deck</a>
            <a href="#problem" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <div className="section-alt" id="problem">
        <div className="content">
          <h2>The problem is massive.</h2>
          <p className="subtitle">Legal services are inaccessible to most Americans, creating a justice gap that affects millions.</p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">71%</div>
              <div className="stat-label">Americans can't afford a lawyer</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$400</div>
              <div className="stat-label">Average hourly attorney rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">86%</div>
              <div className="stat-label">Low-income households lack representation</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$15K+</div>
              <div className="stat-label">Average cost of simple legal matters</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Solution Section */}
      <section id="solution">
        <h2>Our solution.</h2>
        <p className="subtitle">AI-powered legal guidance that makes legal information accessible to everyone.</p>
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3>AI Legal Chat</h3>
            <p>Instant answers to legal questions powered by Claude AI. 24/7 availability with state-specific guidance.</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h3>Document Review</h3>
            <p>AI-powered contract analysis that highlights key terms, potential issues, and explains complex language.</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Attorney Marketplace</h3>
            <p>When users need representation, we connect them with qualified attorneys and earn referral fees.</p>
          </div>
        </div>
      </section>

      {/* All remaining sections will be added in subsequent updates */}
      
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
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}