import { MessageCircle, Shield, Users, Zap, TrendingUp, Award, Star, ArrowRight, BarChart3, DollarSign, FileText } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav>
        <div className="container">
          <Link href="#" className="logo-link">
            <img 
              className="logo-icon" 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzOTRDOUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMSAxNmgtN2wtMi0zaDlWNmgtMmwtMi0zaDE3djE3aC0yeiIgZmlsbD0id2hpdGUiLz4KPHN2Zz4K" 
              alt="ellio" 
            />
            <span className="logo-text">ellio legal</span>
            <span className="investor-badge">INVESTORS</span>
          </Link>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#market">Market</a>
            <a href="#business">Business</a>
            <a href="#team">Team</a>
            <a href="/users">For Users</a>
            <a href="/lawyers">For Attorneys</a>
            <a href="#invest" className="cta-btn">Invest Now</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Legal guidance should be <span className="highlight">accessible</span>.</h1>
          <p>ellio democratizes legal help through AI-powered guidance and attorney matching. Making legal services affordable, accessible, and available 24/7.</p>
          
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
                      <strong>ellio:</strong> Most states require landlords to return deposits within 14-30 days. Based on your state, I can help you draft a demand letter or find a tenant rights attorney.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid" style={{maxWidth: '800px', margin: '2rem auto'}}>
            <div className="stat-card">
              <div className="stat-number">iOS</div>
              <div className="stat-label">React Native App</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Claude</div>
              <div className="stat-label">AI Integration</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50</div>
              <div className="stat-label">State Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section id="market">
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
        <div className="stats-grid" style={{marginTop: '2rem'}}>
          <div className="stat-card">
            <div className="stat-number">340%</div>
            <div className="stat-label">LegalTech adoption growth since 2019</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">73%</div>
            <div className="stat-label">Law firms using or planning to use AI</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">83%</div>
            <div className="stat-label">Consumers open to AI legal help</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$1.5B</div>
            <div className="stat-label">LegalTech VC funding in 2023</div>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section id="business">
        <h2>Six-tier pricing model.</h2>
        <p className="subtitle">Freemium conversion with clear upgrade paths and strong unit economics.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-period">forever</div>
            </div>
            <div className="pricing-features">5 queries/mo, Basic FAQs, Ad-supported</div>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-tier">Basic</div>
              <div className="pricing-price">$9.99</div>
              <div className="pricing-period">per month</div>
            </div>
            <div className="pricing-features">50 queries/mo, Doc summaries, Email support</div>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-header">
              <div className="pricing-tier">Standard</div>
              <div className="pricing-price">$19.99</div>
              <div className="pricing-period">per month</div>
            </div>
            <div className="pricing-features">200 queries/mo, Doc review, 1 attorney consult</div>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-tier">Advanced</div>
              <div className="pricing-price">$29.99</div>
              <div className="pricing-period">per month</div>
            </div>
            <div className="pricing-features">500 queries/mo, Unlimited docs, 3 consults</div>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-tier">Comprehensive</div>
              <div className="pricing-price">$39.99</div>
              <div className="pricing-period">per month</div>
            </div>
            <div className="pricing-features">Unlimited queries, Priority matching, 5 consults</div>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-tier">Firms</div>
              <div className="pricing-price">$129.99</div>
              <div className="pricing-period">per month</div>
            </div>
            <div className="pricing-features">5 users, Team features, API access</div>
          </div>
        </div>
      </section>

      {/* Revenue Streams Section */}
      <div className="section-alt" id="revenue">
        <div className="content">
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
      </div>

      {/* Final CTA Section */}
      <div className="section-alt" id="invest" style={{background: 'linear-gradient(135deg, var(--deep-indigo) 0%, var(--royal-purple) 100%)'}}>
        <div className="content">
          <div className="investment-cta">
            <h2 style={{color: 'white'}}>Ready to invest in legal access?</h2>
            <p style={{color: 'rgba(255,255,255,0.9)'}}>ellio is democratizing legal guidance through AI. Join us in building the future of legal services.</p>
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
            <a href="mailto:investors@elliolegal.com?subject=Investment%20Inquiry" className="cta-btn cta-btn-large" style={{background: 'var(--deep-indigo)', border: '2px solid rgba(255,255,255,0.2)'}}>
              Request Pitch Deck
            </a>
            <p style={{marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)'}}>
              Or email investors@elliolegal.com for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
