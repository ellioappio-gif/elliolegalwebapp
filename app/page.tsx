export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          🐘
        </div>
        <h1 className="hero-brand">
          ellio <span className="highlight">legal</span>
        </h1>
        <p className="hero-tagline">AI-Powered Legal Case Management</p>
        <p className="hero-subtitle">
          Transform your legal practice with AI-powered insights, secure collaboration, 
          and instant access to legal specialists.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '1rem 1.5rem',
            background: 'var(--white)',
            borderRadius: '12px',
            border: '1px solid var(--soft-blue)'
          }}>
            <div style={{
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--deep-indigo)'
            }}>$280B</div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--gray)'
            }}>Market Size</div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '1rem 1.5rem',
            background: 'var(--white)',
            borderRadius: '12px',
            border: '1px solid var(--soft-blue)'
          }}>
            <div style={{
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--deep-indigo)'
            }}>1.3M</div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--gray)'
            }}>Lawyers in US</div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button className="cta-btn cta-btn-large">Request Demo</button>
          <button className="btn-secondary" style={{padding: '1rem 2.5rem', fontSize: '1.1rem'}}>
            View Pitch Deck
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-alt">
        <div className="content">
          <div className="text-center">
            <h2>Our Solution</h2>
            <p className="subtitle">ellio legal: AI-powered legal case management platform</p>
          </div>
          
          <div className="cards-grid">
            <div className="card">
              <h3>AI Case Analysis</h3>
              <p>Powered by Claude AI for instant contract and document analysis</p>
            </div>
            
            <div className="card">
              <h3>Secure Collaboration</h3>
              <p>End-to-end encrypted communication with team members and clients</p>
            </div>
            
            <div className="card">
              <h3>Lawyer Directory</h3>
              <p>Connect with verified legal specialists in your practice area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--sky-blue), var(--light-sky))',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center',
        color: 'var(--deep-indigo)',
        margin: '2rem 0'
      }}>
        <h2 style={{color: 'var(--deep-indigo)'}}>Ready to Transform Legal Practice?</h2>
        <p className="subtitle">Join the future of AI-powered legal case management</p>
        <button className="cta-btn cta-btn-large">Request Investment Deck</button>
      </section>
    </>
  )
}
