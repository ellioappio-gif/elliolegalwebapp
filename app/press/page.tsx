'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Download, Image as ImageIcon, FileText, Video, Mail, ExternalLink, Award, Calendar } from 'lucide-react'

export default function PressPage() {
  const [copiedText, setCopiedText] = useState('')

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const pressReleases = [
    {
      title: 'Ellio Reaches 50,000 Users Milestone',
      date: 'January 15, 2025',
      excerpt: 'Legal AI platform celebrates helping 50,000 users save an average of $4,200 each on legal costs.',
      link: '#'
    },
    {
      title: 'Ellio Launches Advanced Document Comparison Feature',
      date: 'January 10, 2025',
      excerpt: 'New AI-powered side-by-side contract comparison helps users identify critical differences instantly.',
      link: '#'
    },
    {
      title: 'Platform Achieves SOC 2 Type II Compliance',
      date: 'December 20, 2024',
      excerpt: 'Enterprise-grade security certification demonstrates commitment to user data protection.',
      link: '#'
    }
  ]

  const coverage = [
    {
      outlet: 'TechCrunch',
      title: 'Ellio raises $5M to democratize legal access with AI',
      date: 'Dec 2024',
      link: '#'
    },
    {
      outlet: 'The Verge',
      title: 'Can AI really replace lawyers? This startup thinks so',
      date: 'Nov 2024',
      link: '#'
    },
    {
      outlet: 'Forbes',
      title: 'Legal Tech Startups to Watch in 2025',
      date: 'Jan 2025',
      link: '#'
    }
  ]

  const assets = [
    {
      type: 'Logo Pack',
      description: 'Primary logo, wordmark, icon variations in PNG and SVG',
      icon: ImageIcon,
      downloadUrl: '#'
    },
    {
      type: 'Brand Guidelines',
      description: 'Colors, typography, usage rules, dos and don\'ts',
      icon: FileText,
      downloadUrl: '#'
    },
    {
      type: 'Product Screenshots',
      description: 'High-resolution UI screenshots and feature demos',
      icon: ImageIcon,
      downloadUrl: '#'
    },
    {
      type: 'Founder Photos',
      description: 'Professional headshots and team photos',
      icon: ImageIcon,
      downloadUrl: '#'
    },
    {
      type: 'Demo Video',
      description: '2-minute product walkthrough and explainer',
      icon: Video,
      downloadUrl: '#'
    }
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-['Quicksand'] text-5xl md:text-6xl font-bold mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-white/90">
              News, resources, and media assets about Ellio
            </p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-16 bg-[#F5F7FC] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-3xl font-bold text-[#394C9A] text-center mb-12">
              Quick Facts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6">
                <h3 className="font-bold text-[#394C9A] mb-2">Company Name</h3>
                <p className="text-[#5B6BA8]">Ellio Solutions, Inc.</p>
                <button
                  onClick={() => handleCopy('Ellio Solutions, Inc.', 'company')}
                  className="text-sm text-[#394C9A] hover:underline mt-2"
                >
                  {copiedText === 'company' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              <div className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6">
                <h3 className="font-bold text-[#394C9A] mb-2">Founded</h3>
                <p className="text-[#5B6BA8]">2024</p>
              </div>

              <div className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6">
                <h3 className="font-bold text-[#394C9A] mb-2">Headquarters</h3>
                <p className="text-[#5B6BA8]">San Francisco, CA</p>
              </div>

              <div className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6">
                <h3 className="font-bold text-[#394C9A] mb-2">Tagline</h3>
                <p className="text-[#5B6BA8]">Not a lawyer. Just helpful.</p>
                <button
                  onClick={() => handleCopy('Not a lawyer. Just helpful.', 'tagline')}
                  className="text-sm text-[#394C9A] hover:underline mt-2"
                >
                  {copiedText === 'tagline' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              <div className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 md:col-span-2">
                <h3 className="font-bold text-[#394C9A] mb-2">Mission</h3>
                <p className="text-[#5B6BA8]">
                  Democratize access to legal help through AI, making it affordable and accessible for everyone, not just the wealthy.
                </p>
                <button
                  onClick={() => handleCopy('Democratize access to legal help through AI, making it affordable and accessible for everyone, not just the wealthy.', 'mission')}
                  className="text-sm text-[#394C9A] hover:underline mt-2"
                >
                  {copiedText === 'mission' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              <div className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 md:col-span-2">
                <h3 className="font-bold text-[#394C9A] mb-2">Boilerplate</h3>
                <p className="text-[#5B6BA8]">
                  Ellio is an AI-powered legal assistant that helps everyday people understand contracts, know their rights, and get legal answers without expensive lawyer fees. With over 50,000 users saving an average of $4,200 each, Ellio is making legal help accessible to everyone.
                </p>
                <button
                  onClick={() => handleCopy('Ellio is an AI-powered legal assistant that helps everyday people understand contracts, know their rights, and get legal answers without expensive lawyer fees. With over 50,000 users saving an average of $4,200 each, Ellio is making legal help accessible to everyone.', 'boilerplate')}
                  className="text-sm text-[#394C9A] hover:underline mt-2"
                >
                  {copiedText === 'boilerplate' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Recent Press Releases
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {pressReleases.map((release, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-[#5B6BA8] mb-2">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </div>
                      <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-3">
                        {release.title}
                      </h3>
                      <p className="text-[#5B6BA8]">
                        {release.excerpt}
                      </p>
                    </div>
                    <a
                      href={release.link}
                      className="ml-6 flex-shrink-0 inline-flex items-center gap-2 text-[#394C9A] font-semibold hover:gap-3 transition-all"
                    >
                      Read More
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              In the News
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {coverage.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="flex items-center justify-between bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 hover:border-[#394C9A] hover:-translate-y-1 hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="font-bold text-[#394C9A] text-sm mb-1">{item.outlet}</div>
                    <div className="text-[#5B6BA8] font-medium group-hover:text-[#394C9A] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-[#5B6BA8]/60 mt-1">{item.date}</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#394C9A] flex-shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Media Kit & Assets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {assets.map((asset, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-xl transition-all group"
                >
                  <asset.icon className="w-12 h-12 text-[#394C9A] mb-4" />
                  <h3 className="font-['Quicksand'] text-xl font-bold text-[#394C9A] mb-3">
                    {asset.type}
                  </h3>
                  <p className="text-[#5B6BA8] mb-6">
                    {asset.description}
                  </p>
                  <a
                    href={asset.downloadUrl}
                    className="inline-flex items-center gap-2 text-[#394C9A] font-semibold hover:gap-3 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-8 py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5" />
                Download Complete Media Kit
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Mail className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="font-['Quicksand'] text-4xl font-bold text-white mb-6">
              Press Inquiries
            </h2>
            <p className="text-xl text-white/90 mb-8">
              For interviews, quotes, or additional information
            </p>
            <a
              href="mailto:press@ellio.solutions"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <Mail className="w-6 h-6" />
              press@ellio.solutions
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
