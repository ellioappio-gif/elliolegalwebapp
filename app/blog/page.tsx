'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Calendar, User, ArrowRight, Tag, Search, FileText, Rocket, Home, BarChart3, Briefcase, Key, CheckCircle, Clipboard, DollarSign, BookOpen } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', 'Legal Tips', 'Platform Updates', 'Case Studies', 'Industry News', 'How-To Guides']

  // Helper function to render icon components
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "w-16 h-16 text-brand-indigo-600" }
    
    switch (iconName) {
      case 'FileText': return <FileText {...iconProps} />
      case 'Rocket': return <Rocket {...iconProps} />
      case 'Home': return <Home {...iconProps} />
      case 'BarChart3': return <BarChart3 {...iconProps} />
      case 'Briefcase': return <Briefcase {...iconProps} />
      case 'Key': return <Key {...iconProps} />
      case 'CheckCircle': return <CheckCircle {...iconProps} />
      case 'Clipboard': return <Clipboard {...iconProps} />
      case 'DollarSign': return <DollarSign {...iconProps} />
      default: return <FileText {...iconProps} />
    }
  }

  const articles = [
    {
      title: '10 Red Flags to Watch For in Employment Contracts',
      category: 'Legal Tips',
      author: 'Sarah Johnson',
      date: 'Jan 15, 2025',
      readTime: '8 min read',
      excerpt: 'Learn to identify problematic clauses before you sign your next job offer, including non-competes, IP assignments, and more.',
      image: 'FileText',
      tags: ['Employment', 'Contracts', 'Career']
    },
    {
      title: 'New AI Features: Document Comparison & Analysis',
      category: 'Platform Updates',
      author: 'Ellio Team',
      date: 'Jan 12, 2025',
      readTime: '5 min read',
      excerpt: 'We\'ve launched side-by-side document comparison and advanced clause analysis powered by our latest AI model.',
      image: 'Rocket',
      tags: ['Product', 'AI', 'Features']
    },
    {
      title: 'How Sarah Saved $3,500 Reviewing Her Lease',
      category: 'Case Studies',
      author: 'Michael Chen',
      date: 'Jan 10, 2025',
      readTime: '6 min read',
      excerpt: 'Real story: How our AI helped a renter identify unfair clauses and negotiate better terms with her landlord.',
      image: 'Home',
      tags: ['Tenant Rights', 'Success Story', 'Real Estate']
    },
    {
      title: 'The Rise of AI in Legal Services: 2025 Trends',
      category: 'Industry News',
      author: 'David Park',
      date: 'Jan 8, 2025',
      readTime: '12 min read',
      excerpt: 'How artificial intelligence is transforming legal accessibility and what it means for everyday consumers.',
      image: 'BarChart3',
      tags: ['AI', 'Industry', 'Trends']
    },
    {
      title: 'Step-by-Step: Starting an LLC in Your State',
      category: 'How-To Guides',
      author: 'Jessica Williams',
      date: 'Jan 5, 2025',
      readTime: '15 min read',
      excerpt: 'Complete guide to forming a limited liability company, including state-specific requirements and costs.',
      image: 'Briefcase',
      tags: ['Business', 'Formation', 'Guide']
    },
    {
      title: 'Understanding Your Rights as a Tenant',
      category: 'Legal Tips',
      author: 'Robert Martinez',
      date: 'Jan 3, 2025',
      readTime: '10 min read',
      excerpt: 'Comprehensive breakdown of tenant protections: repairs, deposits, privacy, evictions, and more.',
      image: 'Key',
      tags: ['Tenant Rights', 'Housing', 'Rights']
    },
    {
      title: 'Platform Performance: 99.99% Uptime in 2024',
      category: 'Platform Updates',
      author: 'Ellio Team',
      date: 'Dec 31, 2024',
      readTime: '4 min read',
      excerpt: 'Year in review: Our infrastructure improvements, security updates, and commitment to reliability.',
      image: 'CheckCircle',
      tags: ['Infrastructure', 'Performance', 'Year in Review']
    },
    {
      title: 'Small Business Legal Checklist for 2025',
      category: 'How-To Guides',
      author: 'Sarah Johnson',
      date: 'Dec 28, 2024',
      readTime: '11 min read',
      excerpt: 'Essential legal tasks every small business owner should complete in the new year.',
      image: 'Clipboard',
      tags: ['Business', 'Checklist', 'Compliance']
    },
    {
      title: 'The True Cost of DIY Legal Documents',
      category: 'Industry News',
      author: 'Michael Chen',
      date: 'Dec 25, 2024',
      readTime: '9 min read',
      excerpt: 'Why template contracts from the internet can cost you thousands in the long run.',
      image: 'DollarSign',
      tags: ['Contracts', 'Risk', 'Templates']
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <BookOpen className="w-16 h-16 mx-auto text-white/90" />
            </div>
            <h1 className="font-['Quicksand'] text-5xl md:text-6xl font-bold mb-6">
              Legal Insights
            </h1>
            <p className="text-xl text-white/90">
              Expert advice, platform updates, and real stories from our community
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-12 bg-[#F5F7FC] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border-subtle focus:border-brand-indigo-600 focus:outline-none text-text-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
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
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-[#5B6BA8]">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#5B6BA8]">No articles found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, i) => (
                  <article
                    key={i}
                    className="bg-white border-2 border-[#D4DAF0] rounded-3xl overflow-hidden hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all group cursor-pointer"
                  >
                    {/* Icon Header */}
                    <div className="bg-gradient-to-br from-surface-secondary to-neutral-100 h-48 flex items-center justify-center">
                      {renderIcon(article.image)}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="inline-block bg-[#D4DAF0] text-[#394C9A] px-3 py-1 rounded-lg text-sm font-semibold mb-3">
                        {article.category}
                      </div>

                      {/* Title */}
                      <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-3 group-hover:text-[#5B6BA8] transition-colors">
                        {article.title}
                      </h3>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-[#5B6BA8] mb-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </span>
                      </div>

                      {/* Excerpt */}
                      <p className="text-[#5B6BA8] leading-relaxed mb-4">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="inline-flex items-center gap-1 text-xs text-[#5B6BA8] bg-[#F5F7FC] px-2 py-1 rounded"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#D4DAF0]">
                        <span className="text-sm text-[#5B6BA8]">{article.readTime}</span>
                        <button className="inline-flex items-center gap-2 text-[#394C9A] font-semibold hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-white mb-6">
              Never Miss an Update
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get weekly legal tips and platform updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:bg-white/20 focus:outline-none"
              />
              <button className="bg-white text-[#394C9A] px-8 py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-2xl transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
