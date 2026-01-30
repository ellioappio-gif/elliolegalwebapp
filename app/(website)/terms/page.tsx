import Link from 'next/link'

export default function TermsPage() {
  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="logo-link">
            <img className="logo" src="/ellio-icon.png" alt="ellio" />
            <span className="logo-text">ellio legal</span>
          </Link>
          <div className="investor-badge">
            <div className="badge-dot"></div>
            Now Raising
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
            <div className="highlight">Legal</div>
          </div>
          <h1>Terms of Service</h1>
          <p className="hero-subtitle">
            Please read these terms carefully before using our service.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--light-gray)' }}>
            Last updated: January 26, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="section-alt">
        <div className="content">
          <div className="legal-content">
            <section>
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the ellio legal website and mobile application (the "Service"), 
                you agree to be bound by these Terms of Service ("Terms"). If you disagree with any 
                part of the terms, you may not access the Service.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2>2. Description of Service</h2>
              <p>
                ellio legal provides an AI-powered platform for legal information and guidance. 
                Our Service includes:
              </p>
              <ul>
                <li>AI-assisted answers to legal questions</li>
                <li>Document review and analysis</li>
                <li>Legal information resources</li>
                <li>Attorney matching and referrals</li>
              </ul>
            </section>

            <section>
              <h2>3. Important Disclaimer</h2>
              <p>
                <strong>ELLIO LEGAL IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL ADVICE.</strong>
              </p>
              <p>
                The information provided through our Service is for general informational purposes only 
                and should not be construed as legal advice. No attorney-client relationship is created 
                by using our Service.
              </p>
              <p>
                While we strive to provide accurate and helpful information, you should always consult 
                with a qualified attorney for advice regarding your specific legal situation. Legal 
                information changes frequently, and what applies in one jurisdiction may not apply in another.
              </p>
            </section>

            <section>
              <h2>4. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current 
                information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p>You are responsible for:</p>
              <ul>
                <li>Safeguarding the password that you use to access the Service</li>
                <li>Any activities or actions under your account</li>
                <li>Notifying us immediately upon becoming aware of any breach of security</li>
              </ul>
            </section>

            <section>
              <h2>5. Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate any person or entity</li>
                <li>Upload malicious code or interfere with the Service</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Harass, abuse, or harm another person</li>
              </ul>
            </section>

            <section>
              <h2>6. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding content provided by users), features, 
                and functionality are and will remain the exclusive property of ellio legal and its licensors.
              </p>
              <p>
                You retain ownership of any documents you upload. By uploading content, you grant us a 
                limited license to process that content to provide our Service.
              </p>
            </section>

            <section>
              <h2>7. Subscriptions and Payments</h2>
              <p>
                Some parts of the Service are billed on a subscription basis. You will be billed in 
                advance on a recurring basis ("Billing Cycle").
              </p>
              <ul>
                <li>Subscriptions renew automatically unless cancelled</li>
                <li>You can cancel at any time from your account settings</li>
                <li>Refunds are available under our 10x Value Guarantee for eligible plans</li>
                <li>Prices may change with 30 days notice</li>
              </ul>
            </section>

            <section>
              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall ellio legal, its directors, employees, partners, agents, suppliers, 
                or affiliates be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses.
              </p>
              <p>
                Our liability is limited to the amount you paid for the Service in the 12 months prior 
                to the event giving rise to the claim.
              </p>
            </section>

            <section>
              <h2>9. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. ellio legal makes no 
                warranties, expressed or implied, regarding the Service, including:
              </p>
              <ul>
                <li>Merchantability or fitness for a particular purpose</li>
                <li>Accuracy or completeness of information</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Results from using the Service</li>
              </ul>
            </section>

            <section>
              <h2>10. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason, including breach of these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately. You may export 
                your data before termination using our data export feature.
              </p>
            </section>

            <section>
              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide at 
                least 30 days notice before any new terms take effect.
              </p>
              <p>
                By continuing to access or use our Service after revisions become effective, you agree 
                to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the 
                State of Delaware, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2>13. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <div className="info-box">
                <p><strong>ellio legal</strong></p>
                <p>Email: legal@elliolegal.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Chat Fob */}
      <div className="chat-fob" id="chatFob">
        <div className="chat-fob-btn">
          <img src="/ellio-icon.png" alt="Chat with ellio" />
        </div>
      </div>

      {/* Footer */}
      <footer>
        <img className="footer-logo" src="/ellio-icon.png" alt="ellio legal" />
        <div className="footer-brand">ellio legal</div>
        <p>Democratizing access to legal guidance through AI</p>
        <p>© 2024 ellio legal. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </>
  )
}
