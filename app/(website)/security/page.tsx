import Link from 'next/link'

export default function SecurityPage() {
  return (
    <>
        {/* Navigation */}
        <nav className="nav-white">
          <div className="nav-container">
            <div className="logo-container">
              <Link href="/" className="logo">
                <img src="/icons/logo.png" alt="Ellio" />
              </Link>
            </div>
            
            <ul className="nav-links">
              <li><Link href="/how-it-works" className="nav-link">How it Works</Link></li>
              <li><Link href="/features" className="nav-link">Features</Link></li>
              <li><Link href="/pricing" className="nav-link">Pricing</Link></li>
              <li><Link href="/about" className="nav-link">About</Link></li>
            </ul>
            
            <div className="nav-buttons">
              <Link href="/auth/login" className="btn-secondary">
                Log In
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <h1>Security & Privacy</h1>
            <p className="hero-highlight">Your data security is our top priority</p>
            <p>Learn how we protect your information with enterprise-grade security measures and privacy-by-design principles.</p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn-primary">Contact Security Team</Link>
            </div>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="section-alt">
          <div className="section-container">
            <h2>Security Features</h2>
            <div className="cards-grid">
              <div className="card">
                <h3>256-bit Encryption</h3>
                <p>All data encrypted in transit and at rest. Bank-level security.</p>
              </div>
              <div className="card">
                <h3>SOC 2 Certified</h3>
                <p>Independently audited for security and privacy compliance.</p>
              </div>
              <div className="card">
                <h3>Zero Knowledge</h3>
                <p>Your data is encrypted with keys only you control.</p>
              </div>
              <div className="card">
                <h3>GDPR Compliant</h3>
                <p>Full compliance with international privacy regulations.</p>
              </div>
              <div className="card">
                <h3>Regular Audits</h3>
                <p>Quarterly security testing and annual third-party audits.</p>
              </div>
              <div className="card">
                <h3>Access Controls</h3>
                <p>Multi-factor authentication and role-based permissions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="section">
          <div className="section-container">
            <h2>Privacy Commitment</h2>
            <div className="cards-grid">
              <div className="card">
                <h3>No Data Selling</h3>
                <p>We never sell your personal information to third parties.</p>
              </div>
              <div className="card">
                <h3>Minimal Collection</h3>
                <p>We only collect data necessary to provide our services.</p>
              </div>
              <div className="card">
                <h3>Your Control</h3>
                <p>Export or delete your data at any time with one click.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Fob */}
        <div className="chat-fob">
          💬
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h4>Product</h4>
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/how-it-works">How it Works</Link>
              <Link href="/faq">FAQ</Link>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/press">Press</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <Link href="/blog">Blog</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/support">Support</Link>
              <Link href="/security">Security</Link>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Ellio. All rights reserved.</p>
          </div>
        </footer>
    </>
  )
}
