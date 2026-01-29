import Link from 'next/link'
import { Shield, Users, Award, Target, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
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
            <div className="highlight">About ellio</div>
          </div>
          <h1>Making Legal Help<br />Accessible to Everyone</h1>
          <p className="hero-subtitle">We believe that understanding your legal rights shouldn't require a law degree or cost thousands of dollars.</p>
        </div>
      </section>

      {/* Mission Section */}
      <div className="section-alt">
        <div className="content">
          <h2>Our Mission</h2>
          <p className="subtitle">To democratize legal knowledge by combining cutting-edge AI technology with human expertise, 
            empowering everyone to understand their rights, navigate legal situations, and access affordable legal help.</p>

          {/* Values */}
          <div className="cards-grid">
            <div className="card">
              <div className="card-icon">
                <Shield className="w-8 h-8" />
              </div>
              <h3>Trust & Security</h3>
              <p>Your data is encrypted and private. We never share your information without permission.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Heart className="w-8 h-8" />
              </div>
              <h3>Empathy First</h3>
              <p>Legal issues are stressful. Our AI is designed to be understanding, patient, and helpful.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Users className="w-8 h-8" />
              </div>
              <h3>Accessibility</h3>
              <p>Legal help should be available 24/7, in plain language, at a price everyone can afford.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Target className="w-8 h-8" />
              </div>
              <h3>Accuracy</h3>
              <p>Powered by Claude AI, trained on comprehensive legal information and best practices.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Award className="w-8 h-8" />
              </div>
              <h3>Quality</h3>
              <p>Every feature is designed with care to provide real value and actual solutions.</p>
            </div>
            <div className="card">
              <div className="card-icon">
                <Globe className="w-8 h-8" />
              </div>
              <h3>For Everyone</h3>
              <p>From renters to business owners, we serve anyone who needs legal guidance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section>
        <h2>Our Story</h2>
        <div className="content">
          <p>ellio legal was born from a simple frustration: legal help is too expensive, too complicated, and too inaccessible for most people.</p>
          <p>When you face a legal issue - whether it's reviewing a lease, understanding your rights at work, or dealing with a contract - you shouldn't have to choose between spending thousands on a lawyer or trying to navigate complex legal jargon alone.</p>
          <p>We built ellio to bridge that gap. By combining advanced AI technology with a deep understanding of real legal challenges people face, we've created a platform that provides instant, accurate, and affordable legal guidance.</p>
        </div>
      </section>

      {/* Stats Section */}
      <div className="section-alt">
        <div className="content">
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Happy Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100,000+</div>
              <div className="stat-label">Documents Reviewed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$50M+</div>
              <div className="stat-label">Saved in Legal Fees</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Average Rating</div>
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
