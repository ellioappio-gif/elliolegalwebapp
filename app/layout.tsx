import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'ellio legal - AI-Powered Legal Case Management | Investor Deck',
  description: 'Transform legal practice with AI-powered insights, secure collaboration, and instant access to legal specialists. Investment opportunity.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {/* Navigation */}
        <nav>
          <div className="container">
            <Link href="/" className="logo-link">
              <div className="logo-text">
                ellio legal
                <span className="investor-badge">INVESTOR</span>
              </div>
            </Link>
            
            <div className="nav-links">
              <Link href="#problem">Problem</Link>
              <Link href="#solution">Solution</Link>
              <Link href="#market">Market</Link>
              <Link href="#team">Team</Link>
              <Link href="#financials">Financials</Link>
              <button className="cta-btn">Request Demo</button>
            </div>
          </div>
        </nav>

        <main>
          {children}
        </main>

        {/* Footer */}
        <footer>
          <div className="footer-brand">ellio legal</div>
          <p>Transforming legal practice with AI-powered insights</p>
          <p>&copy; 2026 ellio legal. All rights reserved.</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link href="#privacy">Privacy Policy</Link>
            <Link href="#terms">Terms of Service</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
