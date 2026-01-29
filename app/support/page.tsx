'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { MessageCircle, Mail, Phone, Clock, HelpCircle, Search, Book, Video, FileText } from 'lucide-react'

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Getting Started', 'Billing', 'Technical', 'Legal Questions', 'Account']

  const articles = [
    {
      title: 'How do I upload a document for review?',
      category: 'Getting Started',
      excerpt: 'Step-by-step guide to uploading PDFs, images, and other documents for AI analysis.',
      readTime: '2 min',
      views: '12.5k'
    },
    {
      title: 'What file formats are supported?',
      category: 'Technical',
      excerpt: 'Supported formats: PDF, DOC, DOCX, JPG, PNG. Max file size: 50MB.',
      readTime: '1 min',
      views: '8.2k'
    },
    {
      title: 'How do I cancel my subscription?',
      category: 'Billing',
      excerpt: 'Cancel anytime from your account settings. No cancellation fees.',
      readTime: '2 min',
      views: '6.1k'
    },
    {
      title: 'Is my data private and secure?',
      category: 'Legal Questions',
      excerpt: 'Yes - we use 256-bit encryption and never share your data. SOC 2 certified.',
      readTime: '3 min',
      views: '15.3k'
    },
    {
      title: 'How accurate is the AI?',
      category: 'Legal Questions',
      excerpt: 'Our AI achieves 94% accuracy on legal questions, but should not replace lawyers for complex matters.',
      readTime: '4 min',
      views: '9.8k'
    },
    {
      title: 'How do I reset my password?',
      category: 'Account',
      excerpt: 'Click "Forgot Password" on the login page to receive a reset link via email.',
      readTime: '1 min',
      views: '5.4k'
    },
    {
      title: 'What\'s included in the free trial?',
      category: 'Billing',
      excerpt: 'Full access to all features for 7 days. No credit card required.',
      readTime: '2 min',
      views: '18.7k'
    },
    {
      title: 'Can I get a refund?',
      category: 'Billing',
      excerpt: '30-day money-back guarantee if you\'re not satisfied.',
      readTime: '2 min',
      views: '4.9k'
    },
    {
      title: 'How do I export my documents?',
      category: 'Technical',
      excerpt: 'Download all your documents and chat history from Account Settings.',
      readTime: '2 min',
      views: '3.2k'
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 4 hours',
      action: 'support@ellio.solutions',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with a support specialist',
      availability: 'Mon-Fri 9am-6pm PT',
      action: '1-888-ELLIO-01',
      color: 'from-green-500 to-green-600'
    }
  ]

  const resources = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Complete guide to using Ellio effectively',
      link: '#'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step walkthrough videos',
      link: '#'
    },
    {
      icon: FileText,
      title: 'API Documentation',
      description: 'For developers integrating with Ellio',
      link: '#'
    }
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6">
              How Can We Help?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Search our knowledge base or contact support
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-4 border-white/20 bg-white/10 text-white placeholder-white/60 focus:bg-white/20 focus:outline-none text-lg backdrop-blur-sm"
              />
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Contact Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all text-center group"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-[#394C9A] mb-3">
                    {option.title}
                  </h3>
                  <p className="text-[#5B6BA8] mb-4">
                    {option.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-[#5B6BA8] mb-6">
                    <Clock className="w-4 h-4" />
                    {option.availability}
                  </div>
                  <button className="bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all">
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge Base */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Knowledge Base
            </h2>

            {/* Category Filter */}
            <div className="flex justify-center items-center gap-3 overflow-x-auto pb-8 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white'
                      : 'bg-white text-[#5B6BA8] border-2 border-[#D4DAF0] hover:border-[#394C9A]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#5B6BA8]">No articles found matching your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 hover:border-[#394C9A] hover:-translate-y-1 hover:shadow-xl transition-all group"
                  >
                    <div className="inline-block bg-[#D4DAF0] text-[#394C9A] px-3 py-1 rounded-lg text-sm font-semibold mb-3">
                      {article.category}
                    </div>
                    <h3 className="font-['Quicksand'] text-xl font-bold text-[#394C9A] mb-3 group-hover:text-[#5B6BA8] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[#5B6BA8] mb-4 text-sm">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-[#5B6BA8]">
                      <span>{article.readTime} read</span>
                      <span>{article.views} views</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Resources */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] text-center mb-12">
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.link}
                  className="bg-white border-2 border-[#D4DAF0] rounded-2xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-xl transition-all text-center group"
                >
                  <resource.icon className="w-12 h-12 text-[#394C9A] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-['Quicksand'] text-xl font-bold text-[#394C9A] mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-[#5B6BA8]">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-white mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our support team is standing by to assist you 24/7
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all">
              <MessageCircle className="w-6 h-6" />
              Start Live Chat
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
