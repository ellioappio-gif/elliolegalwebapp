import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, Server, FileCheck, Users, CheckCircle, AlertTriangle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6">
              Security & Trust
            </h1>
            <p className="text-xl text-white/90">
              Your privacy and data security are our top priorities. Here's how we protect you.
            </p>
          </div>
        </section>

        {/* Key Security Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-12 text-center">
              Enterprise-Grade Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Lock,
                  title: '256-bit Encryption',
                  description: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). Same encryption used by banks and government agencies.'
                },
                {
                  icon: Server,
                  title: 'SOC 2 Type II Certified',
                  description: 'Independently audited and certified for security, availability, processing integrity, confidentiality, and privacy.'
                },
                {
                  icon: Shield,
                  title: 'Regular Security Audits',
                  description: 'Quarterly penetration testing and annual third-party security audits to identify and fix vulnerabilities.'
                },
                {
                  icon: Eye,
                  title: 'Zero Knowledge Architecture',
                  description: 'Your documents and conversations are encrypted with keys only you control. We can\'t read your data even if we wanted to.'
                },
                {
                  icon: FileCheck,
                  title: 'GDPR & CCPA Compliant',
                  description: 'Full compliance with international privacy regulations. You own your data and can export or delete it anytime.'
                },
                {
                  icon: Users,
                  title: 'Access Controls',
                  description: 'Multi-factor authentication, role-based permissions, and session management keep your account secure.'
                }
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all">
                    <Icon className="w-12 h-12 text-[#394C9A] mb-4" />
                    <h3 className="font-sans text-xl font-bold text-[#394C9A] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[#5B6BA8] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-sans text-4xl font-bold text-[#394C9A] mb-6">
                Secure Infrastructure
              </h2>
              <p className="text-lg text-[#5B6BA8]">
                Built on industry-leading cloud infrastructure with redundancy and failover protection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8">
                <h3 className="font-sans text-2xl font-bold text-[#394C9A] mb-6">
                  Hosting & Infrastructure
                </h3>
                <ul className="space-y-4">
                  {[
                    'Hosted on AWS with 99.99% uptime SLA',
                    'Multi-region redundancy for disaster recovery',
                    'Automated backups every 6 hours',
                    'DDoS protection and WAF filtering',
                    'CDN for fast, secure content delivery',
                    'Regular infrastructure updates and patches'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                      <span className="text-[#5B6BA8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8">
                <h3 className="font-sans text-2xl font-bold text-[#394C9A] mb-6">
                  Data Protection
                </h3>
                <ul className="space-y-4">
                  {[
                    'All databases encrypted at rest',
                    'Automatic data retention policies',
                    'Secure data deletion on account closure',
                    'No data mining or selling to third parties',
                    'Isolated customer data environments',
                    'Regular data integrity validation'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                      <span className="text-[#5B6BA8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Commitments */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-12 text-center">
              Our Privacy Commitments
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'We Never Sell Your Data',
                  description: 'Your personal information, legal documents, and conversations are never sold, rented, or shared with third parties for marketing purposes.'
                },
                {
                  title: 'You Control Your Data',
                  description: 'Export your data anytime in standard formats. Delete your account and all associated data with one click. No questions asked.'
                },
                {
                  title: 'Minimal Data Collection',
                  description: 'We only collect data necessary to provide our service. No tracking pixels, no third-party analytics, no unnecessary cookies.'
                },
                {
                  title: 'Transparent Practices',
                  description: 'Our privacy policy is written in plain English. We notify you of any changes and give you the choice to accept or close your account.'
                },
                {
                  title: 'AI Privacy Guarantee',
                  description: 'Your conversations with our AI are encrypted and private. We don\'t use your data to train models or share it with AI providers.'
                },
                {
                  title: 'Legal Privilege Respect',
                  description: 'Documents shared with matched lawyers through our platform maintain attorney-client privilege. We act only as a secure conduit.'
                }
              ].map((commitment, i) => (
                <div key={i} className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 hover:border-[#394C9A] transition-colors">
                  <h3 className="font-sans text-xl font-bold text-[#394C9A] mb-2">
                    {commitment.title}
                  </h3>
                  <p className="text-[#5B6BA8] leading-relaxed">
                    {commitment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-12 text-center">
              Compliance & Certifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                'SOC 2 Type II',
                'GDPR Compliant',
                'CCPA Compliant',
                'HIPAA Ready',
                'ISO 27001',
                'PCI DSS Level 1',
                'ABA Approved',
                'State Bar Verified'
              ].map((cert, i) => (
                <div key={i} className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-[#394C9A]">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-6 text-center">
              Security Best Practices for Users
            </h2>
            <p className="text-lg text-[#5B6BA8] text-center mb-12">
              We do our part, but security is a shared responsibility. Here's how you can stay safe:
            </p>
            <div className="space-y-4">
              {[
                'Enable two-factor authentication (2FA) on your account',
                'Use a strong, unique password and change it regularly',
                'Never share your login credentials with anyone',
                'Review your account activity log regularly for suspicious behavior',
                'Log out when using shared or public computers',
                'Keep your email account secure (we send important security alerts there)',
                'Be cautious of phishing emails claiming to be from ellio',
                'Report any suspicious activity to security@ellio.legal immediately'
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border-2 border-[#D4DAF0] rounded-2xl p-4">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <span className="text-[#5B6BA8]">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Report Security Issue */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-white mb-6">
              Report a Security Issue
            </h2>
            <p className="text-xl text-white/90 mb-8">
              If you discover a security vulnerability, please report it responsibly to our security team.
            </p>
            <a
              href="mailto:security@ellio.legal"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              security@ellio.legal
            </a>
            <p className="text-white/70 mt-6">
              We have a responsible disclosure program and recognize security researchers.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
