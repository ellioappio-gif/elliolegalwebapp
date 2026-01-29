'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const categories = [
    {
      title: 'Getting Started',
      questions: [
        {
          q: 'What is ellio legal?',
          a: 'ellio legal is an AI-powered legal assistance platform that helps you understand legal documents, know your rights, and connect with lawyers. We provide instant legal guidance through our advanced AI assistant, powered by Claude, along with document analysis, case management, and lawyer matching services.'
        },
        {
          q: 'How much does it cost?',
          a: 'We offer a free tier with basic features, a Premium plan at $29/month with advanced AI features and unlimited documents, and an Enterprise plan at $99/month with priority support and lawyer consultations. All paid plans include a 14-day free trial with no credit card required.'
        },
        {
          q: 'Do I need a credit card for the free trial?',
          a: 'No! Our 14-day free trial requires no credit card. You can explore all premium features risk-free and only provide payment information if you decide to continue after the trial period.'
        },
        {
          q: 'Can I cancel anytime?',
          a: 'Yes, absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees or long-term commitments. If you cancel, you\'ll retain access until the end of your current billing period.'
        }
      ]
    },
    {
      title: 'AI Legal Assistant',
      questions: [
        {
          q: 'Is the AI legal advice?',
          a: 'No. ellio provides legal information and guidance, not legal advice. Our AI helps you understand legal concepts, documents, and your rights, but it does not replace a licensed attorney. For specific legal representation or advice on your particular situation, we recommend consulting with a lawyer through our lawyer matching service.'
        },
        {
          q: 'How accurate is the AI?',
          a: 'Our AI is powered by Claude, one of the most advanced language models available, and is trained on extensive legal information. However, laws vary by jurisdiction and change over time. We always recommend verifying important information with a licensed attorney in your area.'
        },
        {
          q: 'What types of questions can I ask?',
          a: 'You can ask about tenant rights, employment law, contracts, consumer protection, family law, business formation, and more. The AI can explain legal terms, review situations, and provide guidance on next steps. It works best with specific, detailed questions about your situation.'
        },
        {
          q: 'Is there a limit on questions?',
          a: 'Free users can ask up to 10 questions per month. Premium users get unlimited questions with faster response times. Enterprise users get priority processing and can schedule consultations with real lawyers.'
        }
      ]
    },
    {
      title: 'Document Analysis',
      questions: [
        {
          q: 'What documents can I upload?',
          a: 'You can upload contracts, leases, employment agreements, NDAs, terms of service, legal notices, court documents, and more. We support PDF, DOCX, TXT, and image files (with OCR). Maximum file size is 25MB for free users and 100MB for premium users.'
        },
        {
          q: 'How does document analysis work?',
          a: 'Our AI reads your document and identifies key terms, obligations, deadlines, risks, and unusual clauses. You receive a plain-language summary highlighting what you need to know, potential red flags, and suggested questions to ask.'
        },
        {
          q: 'Is my document data private?',
          a: 'Yes, absolutely. All documents are encrypted in transit and at rest using 256-bit encryption. We never share your documents with third parties. You can delete documents anytime, and they\'re permanently removed from our servers.'
        },
        {
          q: 'Can I download the analysis?',
          a: 'Yes! Premium and Enterprise users can download analysis reports as PDFs. You can also share analysis links with your lawyer or other trusted parties.'
        }
      ]
    },
    {
      title: 'Lawyer Matching',
      questions: [
        {
          q: 'How does lawyer matching work?',
          a: 'Tell us about your legal issue, location, and budget. We match you with verified, licensed attorneys in your area who specialize in your type of case. You can review their profiles, ratings, and availability before scheduling a consultation.'
        },
        {
          q: 'Are the lawyers vetted?',
          a: 'Yes. All lawyers on our platform are verified to be licensed and in good standing with their state bar association. We check credentials, malpractice insurance, and client reviews.'
        },
        {
          q: 'Do I pay ellio or the lawyer?',
          a: 'You pay the lawyer directly for their services. ellio does not take a commission from lawyer fees. Our lawyer matching service is included with Premium and Enterprise subscriptions, or available as a one-time fee for free users.'
        },
        {
          q: 'What if I\'m not satisfied with the match?',
          a: 'If you\'re not happy with your lawyer match, contact our support team and we\'ll provide alternative recommendations at no additional cost.'
        }
      ]
    },
    {
      title: 'Security & Privacy',
      questions: [
        {
          q: 'How is my data protected?',
          a: 'We use bank-level 256-bit AES encryption for all data in transit and at rest. Our infrastructure is SOC 2 Type II certified and hosted on secure AWS servers with regular security audits and penetration testing.'
        },
        {
          q: 'Who can see my information?',
          a: 'Only you can access your data unless you explicitly share it. Our AI processes your information to provide assistance, but no human at ellio reads your documents or conversations unless you request support help.'
        },
        {
          q: 'Do you sell my data?',
          a: 'Never. We do not sell, rent, or share your personal information or legal data with third parties for marketing purposes. Your privacy is fundamental to our service.'
        },
        {
          q: 'Can I delete my account and data?',
          a: 'Yes. You can delete your account anytime from settings. This permanently removes all your data, including documents, conversations, and personal information within 30 days.'
        }
      ]
    },
    {
      title: 'Billing & Subscriptions',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and PayPal. Enterprise customers can request invoice billing.'
        },
        {
          q: 'Can I change my plan?',
          a: 'Yes! You can upgrade or downgrade your plan anytime from account settings. Upgrades take effect immediately. Downgrades take effect at the end of your current billing cycle.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'We offer a 14-day money-back guarantee on all subscriptions. If you\'re not satisfied within 14 days of purchase, contact support for a full refund.'
        },
        {
          q: 'What happens if I cancel?',
          a: 'You\'ll retain access to your subscription features until the end of your billing period. After that, your account reverts to the free tier. Your data remains accessible, but some features become limited.'
        }
      ]
    }
  ]

  const filteredCategories = categories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Everything you need to know about ellio legal
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#5B6BA8]">No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h2 className="font-sans text-3xl font-bold text-[#394C9A] mb-6">
                      {category.title}
                    </h2>
                    <div className="space-y-4">
                      {category.questions.map((faq, qIndex) => {
                        const globalIndex = catIndex * 100 + qIndex
                        return (
                          <div
                            key={qIndex}
                            className="bg-white border-2 border-[#D4DAF0] rounded-2xl overflow-hidden hover:border-[#394C9A] transition-colors"
                          >
                            <button
                              onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                              className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                              <span className="font-semibold text-lg text-[#394C9A] pr-4">
                                {faq.q}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 text-[#5B6BA8] flex-shrink-0 transition-transform ${
                                  openIndex === globalIndex ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {openIndex === globalIndex && (
                              <div className="px-6 pb-5 text-[#5B6BA8] leading-relaxed">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="w-12 h-12 text-[#394C9A] mx-auto mb-4" />
            <h2 className="font-sans text-3xl font-bold text-[#394C9A] mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-[#5B6BA8] mb-8">
              Our team is here to help you get the answers you need.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-8 py-4 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all"
              >
                Contact Support
              </a>
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-2 border-2 border-[#394C9A] text-[#394C9A] px-8 py-4 rounded-xl font-semibold hover:bg-[#394C9A] hover:text-white transition-all"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
