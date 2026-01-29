import Link from 'next/link'

export default function LandingPage() {
  return (
    <html lang="en">
      <head>
        <title>Legal Document Analysis Made Simple | Ellio</title>
      </head>
      <body className="nunito-font">
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
            <h1>Your Legal Documents, Simplified</h1>
            <p className="hero-highlight">AI-powered analysis for everyone</p>
            <p>Upload any legal document and get instant analysis. Know your rights, understand your obligations.</p>
            <div className="hero-buttons">
              <Link href="/auth/signup" className="btn-primary">Try Free Analysis</Link>
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
      </body>
    </html>
  )
}