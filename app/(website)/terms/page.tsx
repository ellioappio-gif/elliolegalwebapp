import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

export default function TermsPage() {
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
            <div className="highlight">Terms of Service</div>
          </div>
          <h1>Terms of Service</h1>
          <p className="hero-subtitle">Please read these terms carefully before using our service.</p>
        </div>
      </section>

      {/* Content */}
      <div className="section-alt">
        <div className="content">
          <h2>Terms of Service</h2>
          <p className="subtitle">Last updated: January 26, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on ellio legal's website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under 
                this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. Disclaimer</h2>
              <p>
                The materials on ellio legal's website are provided on an 'as is' basis. ellio legal makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of 
                merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Limitations</h2>
              <p>
                In no event shall ellio legal or its suppliers be liable for any damages (including, without limitation, damages for loss of 
                data or profit, or due to business interruption) arising out of the use or inability to use the materials on ellio legal's website, 
                even if ellio legal or an authorized representative has been notified of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on ellio legal's website could include technical, typographical, or photographic errors. ellio legal 
                does not warrant that any of the materials on its website are accurate, complete, or current. ellio legal may make changes to 
                the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Links</h2>
              <p>
                ellio legal has not reviewed all of the sites linked to its website and is not responsible for the contents of any such 
                linked site. The inclusion of any link does not imply endorsement by ellio legal of the site. Use of any such linked website 
                is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Modifications</h2>
              <p>
                ellio legal may revise these terms of service for its website at any time without notice. By using this website, you are 
                agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-semantic-info-subtle rounded-lg">
                <p className="font-semibold">ellio legal</p>
                <p>Email: legal@elliolegal.com</p>
              </div>
            </section>
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
