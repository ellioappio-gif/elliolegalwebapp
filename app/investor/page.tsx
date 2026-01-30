'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, X } from 'lucide-react'

export default function InvestorPage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I can answer questions about ellio's business model, market opportunity, and investment thesis. What would you like to know?"
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const toggleChat = () => setChatOpen(!chatOpen)

  const sendMessage = () => {
    if (!inputValue.trim()) return
    
    const newMessages = [...messages, { type: 'user', content: inputValue }]
    setMessages(newMessages)
    
    setTimeout(() => {
      const response = getResponse(inputValue)
      setMessages([...newMessages, { type: 'ai', content: response }])
    }, 1000)
    
    setInputValue('')
  }

  const getResponse = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.includes('market') || lower.includes('tam') || lower.includes('opportunity')) 
      return "The US legal services market is $350B. Our serviceable market (LegalTech) is $28B growing at 12% CAGR. AI legal tools specifically are projected to reach $2.5B by 2027 with 37% CAGR."
    if (lower.includes('revenue') || lower.includes('business model')) 
      return "We have 4 revenue streams: subscription revenue (6 tiers from $0-$129.99), attorney referral fees, premium add-ons, and enterprise/API licensing. Target blended ARPU is $24/month."
    if (lower.includes('competition') || lower.includes('competitor')) 
      return "Unlike LegalZoom and Rocket Lawyer, we offer AI-powered chat with Claude. Unlike DoNotPay, we have attorney marketplace integration. We're the only platform combining advanced AI, document analysis, and attorney matching with a free tier."
    if (lower.includes('team')) 
      return "Our team includes the founder/CEO with legal tech and consumer app experience, JD/MBA legal advisors from BigLaw, AI engineers with leading lab experience, and product veterans from LegalZoom, Notion, and Stripe."
    if (lower.includes('traction') || lower.includes('progress')) 
      return "We have a production iOS app in TestFlight, Claude AI integration complete, 6-tier pricing implemented, and 50-state coverage ready. Currently preparing for public launch."
    if (lower.includes('invest') || lower.includes('raise') || lower.includes('round')) 
      return "We're raising a seed round to fuel growth through Year 2 milestones. Key targets include 100K users, $4M+ ARR, Android launch, and enterprise pilots. Email investors@elliolegal.com for the pitch deck."
    return "I can provide details on market opportunity, business model, competitive advantage, team, traction, and investment terms. What interests you most?"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <style jsx global>{`
        :root {
          --deep-indigo: #2D2B69;
          --medium-blue: #4A4FA5; 
          --sky-blue: #7BB3F0;
          --sage-green: #8AA68A;
          --warm-gold: #D4A574;
          --soft-pink: #E8A8A8;
          --elephant-gray: #E8E1DA;
        }

        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #2D2B69;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow-x: hidden;
        }

        .hero {
          background: linear-gradient(135deg, var(--deep-indigo) 0%, var(--medium-blue) 50%, var(--sky-blue) 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin: 0 0 1rem 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto 2rem auto;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-alt {
          background: rgba(255,255,255,0.97);
          padding: 5rem 2rem;
        }

        section {
          padding: 5rem 2rem;
        }

        .content {
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: var(--deep-indigo);
        }

        .subtitle {
          font-size: 1.25rem;
          text-align: center;
          margin-bottom: 3rem;
          color: var(--medium-blue);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .stat-card {
          background: linear-gradient(135deg, var(--deep-indigo), var(--medium-blue));
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          color: white;
          box-shadow: 0 10px 30px rgba(45, 43, 105, 0.3);
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(45, 43, 105, 0.4);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.15);
        }

        .card h3 {
          color: var(--deep-indigo);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 3rem 0;
        }

        .pricing-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .pricing-card.featured {
          border-color: var(--sky-blue);
          transform: scale(1.05);
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.15);
        }

        .pricing-tier {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--deep-indigo);
          margin-bottom: 0.5rem;
        }

        .pricing-price {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--sky-blue);
        }

        .pricing-period {
          color: var(--medium-blue);
          margin-bottom: 1rem;
        }

        .pricing-features {
          color: #666;
          line-height: 1.8;
        }

        .revenue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .revenue-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .revenue-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.15);
        }

        .revenue-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--sky-blue), var(--medium-blue));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .revenue-icon svg {
          width: 28px;
          height: 28px;
          color: white;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }

        .revenue-content h4 {
          color: var(--deep-indigo);
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .revenue-content p {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .guarantee {
          background: linear-gradient(135deg, var(--sage-green), var(--warm-gold));
          padding: 4rem;
          border-radius: 20px;
          text-align: center;
          color: white;
          margin: 3rem 0;
        }

        .guarantee h2 {
          color: white;
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .guarantee-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .guarantee-item h4 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: white;
        }

        .guarantee-item p {
          opacity: 0.9;
          line-height: 1.6;
        }

        .tech-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .tech-feature {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .tech-badge {
          background: linear-gradient(135deg, var(--sky-blue), var(--medium-blue));
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-right: 0.5rem;
        }

        .tech-feature h4 {
          color: var(--deep-indigo);
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .tech-feature p {
          color: #666;
          line-height: 1.6;
        }

        .projections {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          margin: 3rem 0;
        }

        .projections-row {
          display: grid;
          grid-template-columns: 2fr repeat(5, 1fr);
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
          align-items: center;
        }

        .projections-row.header {
          background: linear-gradient(135deg, var(--deep-indigo), var(--medium-blue));
          color: white;
          font-weight: 600;
        }

        .projections-row:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 600;
          color: var(--deep-indigo);
        }

        .value {
          text-align: center;
          font-weight: 500;
          padding: 0.5rem;
        }

        .value.highlight {
          background: linear-gradient(135deg, var(--sky-blue), var(--medium-blue));
          color: white;
          border-radius: 8px;
          font-weight: 700;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .team-member {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .team-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--sky-blue), var(--medium-blue));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1rem auto;
        }

        .team-member h4 {
          color: var(--deep-indigo);
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .role {
          color: var(--sky-blue);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .team-member p {
          color: #666;
          line-height: 1.6;
        }

        .investment-cta {
          background: linear-gradient(135deg, var(--deep-indigo), var(--sky-blue));
          padding: 4rem;
          border-radius: 20px;
          text-align: center;
          color: white;
          margin: 3rem 0;
        }

        .investment-cta h2 {
          color: white;
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .investment-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .investment-item {
          text-align: center;
        }

        .investment-item .value {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .investment-item .label {
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .cta-btn {
          display: inline-block;
          padding: 1rem 2rem;
          background: white;
          color: var(--deep-indigo);
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .cta-btn-large {
          padding: 1.5rem 3rem;
          font-size: 1.25rem;
        }

        .comparison-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          margin: 3rem 0;
        }

        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .comparison-table th,
        .comparison-table td {
          padding: 1.5rem 1rem;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        .comparison-table th {
          background: linear-gradient(135deg, var(--deep-indigo), var(--medium-blue));
          color: white;
          font-weight: 600;
        }

        .comparison-table .highlight-col {
          background: rgba(123, 179, 240, 0.1);
          font-weight: 600;
        }

        .check {
          color: #22c55e;
          font-weight: 600;
        }

        .cross {
          color: #ef4444;
          font-weight: 600;
        }

        .chat-fob {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .chat-fob.open .chat-window {
          display: block;
          animation: slideUp 0.3s ease-out;
        }

        .chat-fob-btn {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--sky-blue), var(--medium-blue));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .chat-fob-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        .chat-fob-btn img {
          width: 24px;
          height: 24px;
        }

        .chat-window {
          display: none;
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 400px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2);
          overflow: hidden;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-window-header {
          background: linear-gradient(135deg, var(--deep-indigo), var(--sky-blue));
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
        }

        .chat-window-header img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .chat-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-window-messages {
          height: 280px;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-msg {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .chat-msg.user {
          flex-direction: row-reverse;
        }

        .chat-msg-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .chat-msg-content {
          background: #f3f4f6;
          padding: 0.75rem;
          border-radius: 12px;
          max-width: 80%;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .chat-msg.user .chat-msg-content {
          background: var(--sky-blue);
          color: white;
        }

        .chat-window-input {
          padding: 1rem;
          border-top: 1px solid #eee;
          display: flex;
          gap: 0.5rem;
        }

        .chat-window-input input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .chat-window-input button {
          padding: 0.5rem 1rem;
          background: var(--sky-blue);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
        }

        footer {
          background: var(--deep-indigo);
          color: white;
          padding: 3rem 2rem 2rem 2rem;
          text-align: center;
        }

        .footer-logo {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem auto;
          display: block;
        }

        .footer-brand {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        footer p {
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .footer-links {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .footer-links a:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          .projections-row {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .chat-window {
            width: 300px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">
          Democratizing Legal Access <br />
          Through AI Innovation
        </h1>
        <p className="hero-subtitle">
          ellio transforms how Americans access legal guidance with AI-powered solutions, 
          attorney matching, and transparent pricing. Join our mission to make legal services 
          accessible to everyone.
        </p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">$350B</div>
            <div className="stat-label">US Legal Services Market</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">37%</div>
            <div className="stat-label">AI Legal Market CAGR</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Revenue Streams</div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <section>
        <div className="content">
          <h2>The $350 billion legal access problem.</h2>
          <p className="subtitle">63% of Americans can't afford legal services when needed. We're changing that.</p>
          
          <div className="cards-grid">
            <div className="card">
              <h3>The Problem</h3>
              <p>Average attorney consultation costs $300+/hour. Document review runs $200-500. Most Americans avoid legal guidance due to cost, creating a massive underserved market.</p>
            </div>
            <div className="card">
              <h3>Our Solution</h3>
              <p>AI-powered legal guidance starting at $0. Plain language explanations, document analysis, and attorney matching when needed. 24/7 access at consumer prices.</p>
            </div>
            <div className="card">
              <h3>Market Validation</h3>
              <p>LegalZoom: $2B+ revenue, 4M+ customers. DoNotPay: 150K+ subscribers. We combine the best of both with advanced AI and transparent pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <div className="section-alt">
        <div className="content">
          <h2>Why we win vs. existing solutions.</h2>
          <p className="subtitle">First-mover advantage in AI-native legal guidance with attorney marketplace integration.</p>
          
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>ellio</th>
                  <th>LegalZoom</th>
                  <th>Rocket Lawyer</th>
                  <th>DoNotPay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AI-Powered Chat</td>
                  <td className="highlight-col"><span className="check">✓ Claude</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">Basic</span></td>
                </tr>
                <tr>
                  <td>Document Analysis</td>
                  <td className="highlight-col"><span className="check">✓ AI-Powered</span></td>
                  <td><span className="cross">Limited</span></td>
                  <td><span className="cross">Templates</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
                <tr>
                  <td>Attorney Matching</td>
                  <td className="highlight-col"><span className="check">✓ All 50</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">Limited</span></td>
                </tr>
                <tr>
                  <td>24/7 Availability</td>
                  <td className="highlight-col"><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Business Model */}
      <section>
        <div className="content">
          <h2>Six-tier pricing model.</h2>
          <p className="subtitle">Freemium conversion with clear upgrade paths and strong unit economics.</p>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-period">forever</div>
              <div className="pricing-features">5 queries/mo, Basic FAQs, Ad-supported</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Basic</div>
              <div className="pricing-price">$9.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">50 queries/mo, Doc summaries, Email support</div>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-tier">Standard</div>
              <div className="pricing-price">$19.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">200 queries/mo, Doc review, 1 attorney consult</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Advanced</div>
              <div className="pricing-price">$29.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">500 queries/mo, Unlimited docs, 3 consults</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Comprehensive</div>
              <div className="pricing-price">$39.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">Unlimited queries, Priority matching, 5 consults</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Firms</div>
              <div className="pricing-price">$129.99</div>
              <div className="pricing-period">per month</div>
              <div className="pricing-features">5 users, Team features, API access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <div className="section-alt">
        <div className="content">
          <h2>Four revenue streams.</h2>
          <p className="subtitle">Diversified business model with multiple paths to profitability.</p>
          
          <div className="revenue-grid">
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Subscription Revenue</h4>
                <p>Recurring monthly subscriptions across 6 tiers. Target 15% free-to-paid conversion, 80% annual retention.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Attorney Referral Fees</h4>
                <p>Commission on attorney matches. Pre-qualified leads deliver value to attorneys, generating referral revenue.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Premium Add-Ons</h4>
                <p>Additional consultations, expedited review, premium templates. High-margin upsells to engaged users.</p>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="revenue-content">
                <h4>Enterprise & API</h4>
                <p>B2B licensing for law firms, HR departments, and legal aid organizations. White-label opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 10x Value Guarantee */}
      <section>
        <div className="content">
          <div className="guarantee">
            <h2>10x Value Guarantee</h2>
            <p style={{maxWidth: '700px', margin: '0 auto 2rem', opacity: 0.9}}>
              Our confidence in product-market fit: users save 10x their subscription cost or get a full refund.
            </p>
            <div className="guarantee-grid">
              <div className="guarantee-item">
                <h4>Transparent Tracking</h4>
                <p>Every interaction shows equivalent attorney cost savings.</p>
              </div>
              <div className="guarantee-item">
                <h4>Dashboard Metrics</h4>
                <p>Users see cumulative savings, driving retention and upgrades.</p>
              </div>
              <div className="guarantee-item">
                <h4>Risk Reversal</h4>
                <p>90-day refund policy reduces friction, increases conversions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Economics */}
      <div className="section-alt">
        <div className="content">
          <h2>Strong unit economics.</h2>
          <p className="subtitle">Scalable business with attractive margins and clear path to profitability.</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">$24</div>
              <div className="stat-label">Blended ARPU (Monthly)</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$8</div>
              <div className="stat-label">Target CAC</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3:1</div>
              <div className="stat-label">LTV:CAC Ratio</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">80%</div>
              <div className="stat-label">Gross Margin Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <section>
        <div className="content">
          <h2>Technology stack.</h2>
          <p className="subtitle">Built on cutting-edge AI with enterprise-grade security.</p>
          
          <div className="tech-features">
            <div className="tech-feature">
              <h4><span className="tech-badge">AI</span> Claude by Anthropic</h4>
              <p>State-of-the-art language model with Constitutional AI for safe, accurate responses.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">MOBILE</span> React Native / Expo</h4>
              <p>Cross-platform development with TypeScript for type safety and maintainability.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">BACKEND</span> Firebase</h4>
              <p>Scalable serverless infrastructure with real-time database and authentication.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">STATE</span> Zustand</h4>
              <p>Lightweight state management for fast, responsive user experience.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">RAG</span> Legal Database</h4>
              <p>Retrieval-augmented generation with verified legal sources for accuracy.</p>
            </div>
            <div className="tech-feature">
              <h4><span className="tech-badge">SECURITY</span> SOC 2 Type II</h4>
              <p>Enterprise security certification with end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Go-to-Market */}
      <div className="section-alt">
        <div className="content">
          <h2>Go-to-market strategy.</h2>
          <p className="subtitle">Three-phase approach to market penetration and growth.</p>
          
          <div className="cards-grid">
            <div className="card">
              <h3>Phase 1: Launch</h3>
              <p style={{color: 'var(--sky-blue)', fontWeight: 600, marginBottom: '0.5rem'}}>Months 1-6</p>
              <p>iOS app launch, early adopter acquisition, content marketing, SEO foundation. Target: 10K users.</p>
            </div>
            <div className="card">
              <h3>Phase 2: Scale</h3>
              <p style={{color: 'var(--medium-blue)', fontWeight: 600, marginBottom: '0.5rem'}}>Months 7-18</p>
              <p>Android launch, paid acquisition, attorney partnerships, enterprise pilots. Target: 100K users.</p>
            </div>
            <div className="card">
              <h3>Phase 3: Expand</h3>
              <p style={{color: 'var(--deep-indigo)', fontWeight: 600, marginBottom: '0.5rem'}}>Months 19-36</p>
              <p>B2B enterprise deals, white-label licensing, international expansion. Target: 1M+ users.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <section>
        <div className="content">
          <h2>Financial projections.</h2>
          <p className="subtitle">Conservative 5-year revenue and user growth model.</p>
          
          <div className="projections">
            <div className="projections-row header">
              <div></div>
              <div>Year 1</div>
              <div>Year 2</div>
              <div>Year 3</div>
              <div>Year 4</div>
              <div>Year 5</div>
            </div>
            <div className="projections-row">
              <div className="label">Users (K)</div>
              <div className="value">25</div>
              <div className="value">100</div>
              <div className="value">350</div>
              <div className="value">750</div>
              <div className="value highlight">1,500</div>
            </div>
            <div className="projections-row">
              <div className="label">Paid Users (K)</div>
              <div className="value">2.5</div>
              <div className="value">15</div>
              <div className="value">52</div>
              <div className="value">112</div>
              <div className="value highlight">225</div>
            </div>
            <div className="projections-row">
              <div className="label">ARR ($M)</div>
              <div className="value">$0.7</div>
              <div className="value">$4.3</div>
              <div className="value">$15</div>
              <div className="value">$32</div>
              <div className="value highlight">$65</div>
            </div>
            <div className="projections-row">
              <div className="label">Gross Margin</div>
              <div className="value">65%</div>
              <div className="value">72%</div>
              <div className="value">78%</div>
              <div className="value">80%</div>
              <div className="value highlight">82%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <div className="section-alt">
        <div className="content">
          <h2>Leadership team.</h2>
          <p className="subtitle">Experienced operators with legal tech and AI expertise.</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">CW</div>
              <h4>Cody Williams</h4>
              <div className="role">CEO & Founder</div>
              <p>Serial entrepreneur, legal tech background, consumer app experience.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">JD</div>
              <h4>Legal Advisory Board</h4>
              <div className="role">JD/MBA Advisors</div>
              <p>Former BigLaw partners and legal aid directors ensuring compliance.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">AI</div>
              <h4>AI Engineering</h4>
              <div className="role">ML Engineers</div>
              <p>AI researchers with experience at leading labs building legal AI.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">PD</div>
              <h4>Product & Design</h4>
              <div className="role">Product Team</div>
              <p>Veterans from LegalZoom, Notion, and Stripe building intuitive UX.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Traction */}
      <section>
        <div className="content">
          <h2>Current traction.</h2>
          <p className="subtitle">Building momentum with a production-ready product.</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">iOS</div>
              <div className="stat-label">Production App in TestFlight</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Claude</div>
              <div className="stat-label">AI Integration Complete</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">Pricing Tiers Implemented</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50</div>
              <div className="stat-label">State Coverage Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <div className="section-alt">
        <div className="content">
          <h2>Use of funds.</h2>
          <p className="subtitle">Strategic allocation to drive growth and profitability.</p>
          
          <div className="cards-grid">
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Engineering (40%)</h3>
              <p>AI improvements, Android development, enterprise features, scalability.</p>
            </div>
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Marketing (35%)</h3>
              <p>User acquisition, content marketing, SEO, attorney partner recruitment.</p>
            </div>
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Operations (25%)</h3>
              <p>Legal compliance, customer success, infrastructure, security certifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Terms */}
      <section>
        <div className="content">
          <h2>Investment opportunity.</h2>
          <p className="subtitle">Join us in democratizing access to legal guidance.</p>
          
          <div className="cards-grid">
            <div className="card">
              <h3>Seed Round</h3>
              <p>Raising seed capital to fuel growth through Year 2 milestones. Strategic investors preferred.</p>
            </div>
            <div className="card">
              <h3>Key Milestones</h3>
              <p>100K users, $4M+ ARR, Android launch, 50+ attorney partners, enterprise pilot customers.</p>
            </div>
            <div className="card">
              <h3>Exit Potential</h3>
              <p>LegalTech M&A activity strong. Comparable exits: Clio ($1.6B), LegalZoom (IPO), Ironclad ($3.2B).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="section-alt">
        <div className="content">
          <div className="investment-cta">
            <h2>Ready to invest in legal access?</h2>
            <p>ellio is democratizing legal guidance through AI. Join us in building the future of legal services.</p>
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
            <a 
              href="mailto:investors@elliolegal.com?subject=Investment%20Inquiry" 
              className="cta-btn cta-btn-large" 
              style={{background: 'var(--deep-indigo)'}}
            >
              Request Pitch Deck
            </a>
            <p style={{marginTop: '1.5rem', fontSize: '0.9rem'}}>
              Or email investors@elliolegal.com for more information.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Fob */}
      <div className={`chat-fob ${chatOpen ? 'open' : ''}`}>
        <div className="chat-fob-btn" onClick={toggleChat}>
          <MessageCircle color="white" size={24} />
        </div>
        <div className="chat-window">
          <div className="chat-window-header">
            <MessageCircle color="white" size={20} />
            <span>ellio investor relations</span>
            <button className="chat-close" onClick={toggleChat}>
              <X size={16} />
            </button>
          </div>
          <div className="chat-window-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.type}`}>
                {msg.type === 'ai' && (
                  <MessageCircle size={24} className="chat-msg-icon" style={{color: '#4A4FA5'}} />
                )}
                <div className="chat-msg-content">{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="chat-window-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the investment..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <MessageCircle size={60} className="footer-logo" style={{color: 'white'}} />
        <div className="footer-brand">ellio legal</div>
        <p>AI-Powered Legal Guidance for Everyone</p>
        <p>&copy; 2025 ellio legal. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/">For Users</Link>
          <Link href="/">For Attorneys</Link>
          <a href="mailto:investors@elliolegal.com">Investor Contact</a>
        </div>
      </footer>
    </div>
  )
}