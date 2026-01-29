import Link from 'next/link'

export default function SupportPage() {
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
            <h1>Support Center</h1>
            <p className="hero-highlight">We're here to help</p>
            <p>Find answers to common questions or contact our support team for personalized assistance.</p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn-primary">Contact Support</Link>
            </div>
          </div>
        </section>

        {/* Support Options Section */}
        <section className="section-alt">
          <div className="section-container">
            <h2>Get Help</h2>
            <div className="cards-grid">
              <div className="card">
                <h3>📧 Email Support</h3>
                <p>Get detailed help via email within 24 hours.</p>
                <Link href="mailto:support@ellio.solutions">support@ellio.solutions</Link>
              </div>
              <div className="card">
                <h3>💬 Live Chat</h3>
                <p>Chat with our team during business hours.</p>
                <p>Mon-Fri 9AM-6PM EST</p>
              </div>
              <div className="card">
                <h3>📚 Knowledge Base</h3>
                <p>Browse articles and tutorials.</p>
                <Link href="/faq">View FAQ</Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="section-container">
            <h2>Common Questions</h2>
            <div className="cards-grid">
              <div className="card">
                <h3>How do I upload documents?</h3>
                <p>Simply drag and drop your files or click the upload button in your dashboard.</p>
              </div>
              <div className="card">
                <h3>What file formats are supported?</h3>
                <p>PDF, DOC, DOCX, JPG, PNG files up to 50MB each.</p>
              </div>
              <div className="card">
                <h3>Is my data secure?</h3>
                <p>Yes, we use 256-bit encryption and SOC 2 certified security.</p>
              </div>
              <div className="card">
                <h3>How do I cancel my subscription?</h3>
                <p>Cancel anytime from your account settings with no fees.</p>
              </div>
              <div className="card">
                <h3>Can I get a refund?</h3>
                <p>Yes, we offer full refunds within 30 days of purchase.</p>
              </div>
              <div className="card">
                <h3>How does AI analysis work?</h3>
                <p>Our AI reviews your documents and provides insights in plain English.</p>
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
