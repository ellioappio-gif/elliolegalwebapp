import Link from 'next/link'

export default function ResourcesPage() {
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
            <div className="highlight">Resources</div>
          </div>
          <h1>Legal Resources & Guides</h1>
          <p className="hero-subtitle">Access helpful guides, templates, and resources to understand your legal rights.</p>
        </div>
      </section>

      {/* Resources Content */}
      <div className="section-alt">
        <div className="content">
          <h2>Free Legal Resources</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>Tenant Rights Guide</h3>
              <p>Complete guide to understanding your rights as a tenant, including security deposits and evictions.</p>
            </div>
            <div className="card">
              <h3>Employment Contract Checklist</h3>
              <p>Essential items to review before signing any employment agreement, including red flags to watch for.</p>
            </div>
            <div className="card">
              <h3>Small Business Legal Basics</h3>
              <p>Legal fundamentals every small business owner should know about contracts, liability, and compliance.</p>
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
