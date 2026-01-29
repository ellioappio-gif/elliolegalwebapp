import { MessageCircle, Shield, Users, Zap, TrendingUp, Award, Star, ArrowRight, BarChart3, DollarSign, FileText, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav>
        <div className="nav-container">
          <Link href="/" className="logo-link">
            <img 
              className="logo-icon" 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzOTRDOUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMSAxNmgtN2wtMi0zaDlWNmgtMmwtMi0zaDE3djE3aC0yeiIgZmlsbD0id2hpdGUiLz4KPHN2Zz4K" 
              alt="ellio legal" 
            />
            <span className="logo-text">ellio legal</span>
            <span className="investor-badge">INVESTORS</span>
          </Link>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#market">Market</a>
            <a href="#business">Business</a>
            <a href="#pricing">Pricing</a>
            <a href="#team">Team</a>
            <a href="/auth/login">Login</a>
            <a href="#invest" className="cta-btn">Invest Now</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Legal guidance should be <span className="highlight">accessible</span>.</h1>
          <p className="subtitle">ellio democratizes legal help through AI-powered guidance and attorney matching. Making legal services affordable, accessible, and available 24/7.</p>
          
          <div className="demo-window">
            <div className="demo-header">
              <div className="window-controls">
                <div className="control red"></div>
                <div className="control yellow"></div>
                <div className="control green"></div>
              </div>
              <div className="demo-title">ellio legal • AI Legal Assistant</div>
            </div>
            <div className="chat-demo">
              <div className="chat-msg user">
                <div className="chat-msg-content">My landlord hasn&apos;t returned my security deposit after 45 days. What are my options in California?</div>
              </div>
              <div className="chat-msg ai">
                <img className="chat-msg-icon" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzOTRDOUEiLz4KPC9zdmc+Cg==" alt="ellio" />
                <div className="chat-msg-content">
                  <div style={{background: 'var(--soft-blue)', padding: '1rem', borderRadius: '12px', textAlign: 'left'}}>
                    <p style={{color: 'var(--deep-indigo)', fontSize: '0.9rem'}}>
                      <strong>ellio:</strong> In California, landlords must return security deposits within 21 days. Since it's been 45 days, you may be entitled to the full deposit plus damages. I can help you draft a demand letter or connect you with a tenant rights attorney.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <Link href="/auth/signup" className="btn-primary">Start Free Trial</Link>
            <Link href="/how-it-works" className="btn-secondary">How It Works</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">69x</div>
              <div className="stat-label">Cost Savings vs Traditional Legal</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Legal Assistant</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">&lt;5min</div>
              <div className="stat-label">Average Response Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50</div>
              <div className="stat-label">State Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section id="market">
        <div className="container">
          <h2>Massive market opportunity.</h2>
          <p className="subtitle">The legal services market is ripe for AI disruption.</p>
          <div className="market-grid">
            <div className="market-card tam">
              <div className="market-label">TAM</div>
              <div className="market-value">$350B</div>
              <div className="market-desc">US Legal Services Market</div>
            </div>
            <div className="market-card sam">
              <div className="market-label">SAM</div>
              <div className="market-value">$28B</div>
              <div className="market-desc">LegalTech Market (12% CAGR)</div>
            </div>
            <div className="market-card som">
              <div className="market-label">SOM</div>
              <div className="market-value">$2.5B</div>
              <div className="market-desc">AI Legal Tools by 2027 (37% CAGR)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white">
        <div className="container">
          <h2>Everything You Need</h2>
          <p className="subtitle">Our platform combines AI technology with human expertise to provide comprehensive legal support</p>
          <div className="grid-3">
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <MessageCircle />
              </div>
              <h3>AI Legal Assistant</h3>
              <p>Get instant answers to legal questions in plain language from our advanced AI system trained on legal knowledge.</p>
            </div>
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Users />
              </div>
              <h3>Expert Network</h3>
              <p>Connect with qualified attorneys in your area for cases requiring professional representation and complex legal matters.</p>
            </div>
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <FileText />
              </div>
              <h3>Document Analysis</h3>
              <p>Upload and understand any legal document with AI-powered analysis, contract review, and risk assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANDATORY PRICING SECTION - EXACT IMPLEMENTATION REQUIRED */}
      <section id="pricing" className="bg-lightest-blue">
        <div className="container">
          <h2>Simple, transparent pricing</h2>
          <p className="subtitle">Choose the plan that's right for you. All plans include our AI legal assistant and core features.</p>
          
          {/* First Row: Free, Basic, Standard */}
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier">FREE</div>
              <div className="pricing-amount">
                <div className="pricing-price">$0</div>
                <div className="pricing-period">/month</div>
              </div>
              <ul className="pricing-features">
                <li>Basic legal guidance</li>
                <li>10 AI questions/month</li>
                <li>Document templates (basic)</li>
                <li>Community forum access</li>
                <li>Mobile app access</li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full">Get Started Free</Link>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-tier">BASIC</div>
              <div className="pricing-amount">
                <div className="pricing-price">$9.99</div>
                <div className="pricing-period">/month</div>
              </div>
              <div className="pricing-annual">$99.99/year (save $20)</div>
              <ul className="pricing-features">
                <li>Everything in Free</li>
                <li>100 AI questions/month</li>
                <li>Document analysis (up to 5 pages)</li>
                <li>Attorney matching (limited)</li>
                <li>Email support</li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full">Start Basic Plan</Link>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-tier">STANDARD</div>
              <div className="pricing-amount">
                <div className="pricing-price">$29.99</div>
                <div className="pricing-period">/month</div>
              </div>
              <div className="pricing-annual">$299.99/year (save $60)</div>
              <ul className="pricing-features">
                <li>Everything in Basic</li>
                <li>Unlimited AI questions</li>
                <li>Document analysis (up to 25 pages)</li>
                <li>Priority attorney matching</li>
                <li>Contract review tools</li>
                <li>Live chat support</li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full">Start Standard Plan</Link>
            </div>
          </div>
          
          {/* Second Row: Professional, Business, Enterprise */}
          <div className="pricing-grid mt-4">
            <div className="pricing-card">
              <div className="pricing-tier">PROFESSIONAL</div>
              <div className="pricing-amount">
                <div className="pricing-price">$59.99</div>
                <div className="pricing-period">/month</div>
              </div>
              <div className="pricing-annual">$599.99/year (save $120)</div>
              <ul className="pricing-features">
                <li>Everything in Standard</li>
                <li>Unlimited document analysis</li>
                <li>Dedicated account manager</li>
                <li>API access (limited)</li>
                <li>Advanced contract tools</li>
                <li>Priority support (24/7)</li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full">Start Professional Plan</Link>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-tier">BUSINESS</div>
              <div className="pricing-amount">
                <div className="pricing-price">$99.99</div>
                <div className="pricing-period">/month</div>
              </div>
              <div className="pricing-annual">$999.99/year (save $200)</div>
              <ul className="pricing-features">
                <li>Everything in Professional</li>
                <li>Multi-user accounts (up to 10)</li>
                <li>Custom integrations</li>
                <li>Bulk document processing</li>
                <li>Team collaboration tools</li>
                <li>SLA guarantee</li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full">Start Business Plan</Link>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-tier">ENTERPRISE</div>
              <div className="pricing-amount">
                <div className="pricing-price">Custom</div>
                <div className="pricing-period">pricing</div>
              </div>
              <div className="pricing-annual">Contact sales team</div>
              <ul className="pricing-features">
                <li>Everything in Business</li>
                <li>Unlimited users</li>
                <li>Custom AI training</li>
                <li>White-label options</li>
                <li>Dedicated infrastructure</li>
                <li>Custom SLA</li>
                <li>On-premise deployment options</li>
              </ul>
              <Link href="/contact" className="btn-primary w-full">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Streams Section */}
      <section className="bg-white">
        <div className="container">
          <h2>Four revenue streams.</h2>
          <p className="subtitle">Diversified business model with multiple paths to profitability.</p>
          <div className="revenue-grid">
            <div className="revenue-card">
              <div className="revenue-icon">
                <DollarSign className="w-8 h-8" />
              </div>
              <div className="revenue-content">
                <h4>Subscription Revenue</h4>
                <p>Recurring monthly subscriptions across 6 tiers. Target 15% free-to-paid conversion, 80% annual retention.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <Users className="w-8 h-8" />
              </div>
              <div className="revenue-content">
                <h4>Attorney Referral Fees</h4>
                <p>Commission on attorney matches. Pre-qualified leads deliver value to attorneys, generating referral revenue.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <FileText className="w-8 h-8" />
              </div>
              <div className="revenue-content">
                <h4>Premium Add-Ons</h4>
                <p>Additional consultations, expedited review, premium templates. High-margin upsells to engaged users.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div className="revenue-content">
                <h4>Enterprise/API Licensing</h4>
                <p>White-label solutions and API access for law firms, legal tech companies, and enterprise customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <p className="subtitle">Get answers to common questions about ellio legal</p>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                How accurate is the AI legal assistant?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                Our AI is trained on extensive legal databases and provides accurate guidance for common legal questions. However, for complex matters, we always recommend consulting with a qualified attorney through our platform.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Can I cancel my subscription anytime?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Do you provide actual legal advice?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                ellio provides legal information and guidance, but not legal advice. For matters requiring legal advice, we connect you with licensed attorneys in your jurisdiction through our attorney matching service.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Is my data secure and confidential?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                Yes, we use enterprise-grade security measures and maintain strict confidentiality. All communications are encrypted and we follow attorney-client privilege standards for matched attorney consultations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Investment CTA */}
      <section style={{background: 'linear-gradient(135deg, var(--deep-indigo) 0%, var(--purple-blue) 100%)', padding: '4rem 0'}}>
        <div className="container">
          <div className="investment-cta text-center">
            <h2 style={{color: 'white'}}>Ready to invest in legal access?</h2>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem'}}>ellio is democratizing legal guidance through AI. Join us in building the future of legal services.</p>
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
                <div className="value">6</div>
                <div className="label">Pricing Tiers</div>
              </div>
              <div className="investment-item">
                <div className="value">4</div>
                <div className="label">Revenue Streams</div>
              </div>
            </div>
            <a href="mailto:investors@elliolegal.com?subject=Investment%20Inquiry" className="cta-btn-large" style={{background: 'var(--white)', color: 'var(--deep-indigo)', fontWeight: '600'}}>
              Request Pitch Deck
            </a>
            <p style={{marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)'}}>
              Or email investors@elliolegal.com for more information.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>ellio legal</h3>
              <p>Democratizing legal guidance through AI-powered assistance and attorney matching. Making legal services accessible to everyone.</p>
              <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                <Link href="/auth/signup" className="btn-primary">Get Started</Link>
                <Link href="/contact" className="btn-outline">Contact Us</Link>
              </div>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/how-it-works">How It Works</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/press">Press</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
                <li><Link href="/compliance">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 ellio legal. All rights reserved. Not a law firm. Attorney services provided by licensed third-party attorneys.</p>
          </div>
        </div>
      </footer>

      {/* Chat FOB */}
      <div className="chat-fob">
        <button className="chat-button">
          <MessageCircle />
        </button>
        <div className="chat-window">
          <div className="chat-header">ellio legal assistant</div>
          <div className="chat-messages">
            <div className="chat-msg ai">
              <div className="chat-msg-icon" style={{background: 'var(--indigo)'}}></div>
              <div className="chat-msg-content">Hi! I'm your AI legal assistant. How can I help you today?</div>
            </div>
          </div>
          <div className="chat-input-area">
            <input type="text" placeholder="Ask a legal question..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
