import Link from 'next/link'

export default function BlogPage() {
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
            <div className="highlight">Blog</div>
          </div>
          <h1>Legal Insights & Updates</h1>
          <p className="hero-subtitle">Stay informed with the latest legal news, tips, and insights from our team.</p>
        </div>
      </section>

      {/* Blog Content */}
      <div className="section-alt">
        <div className="content">
          <h2>Latest Articles</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>Understanding Your Tenant Rights</h3>
              <p>A comprehensive guide to knowing your rights as a tenant, from security deposits to lease terminations.</p>
            </div>
            <div className="card">
              <h3>AI Legal Tech Updates</h3>
              <p>Stay updated on the latest developments in AI-powered legal assistance technology and features.</p>
            </div>
            <div className="card">
              <h3>Contract Review Best Practices</h3>
              <p>Learn how to effectively review legal documents and identify potential issues before signing.</p>
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
