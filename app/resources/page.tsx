'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BookOpen, Download, Video, FileText, Search, Filter } from 'lucide-react'

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', 'Tenant Rights', 'Employment', 'Contracts', 'Business', 'Family Law', 'Consumer Rights']

  const resources = [
    {
      title: 'Complete Guide to Tenant Rights',
      category: 'Tenant Rights',
      type: 'guide',
      description: 'Everything you need to know about renting: your rights, landlord obligations, security deposits, evictions, and more.',
      downloadUrl: '#',
      readTime: '15 min read'
    },
    {
      title: 'Employment Contract Checklist',
      category: 'Employment',
      type: 'checklist',
      description: 'Essential items to review before signing any employment agreement, including red flags to watch for.',
      downloadUrl: '#',
      readTime: '8 min read'
    },
    {
      title: 'Understanding Non-Compete Agreements',
      category: 'Employment',
      type: 'guide',
      description: 'Are non-competes enforceable? What\'s reasonable? How to negotiate better terms with your employer.',
      downloadUrl: '#',
      readTime: '12 min read'
    },
    {
      title: 'Small Business Legal Checklist',
      category: 'Business',
      type: 'checklist',
      description: 'Step-by-step guide to legal requirements when starting a business: formation, licenses, contracts, insurance.',
      downloadUrl: '#',
      readTime: '20 min read'
    },
    {
      title: 'Contract Review Template',
      category: 'Contracts',
      type: 'template',
      description: 'Downloadable template for reviewing any contract with built-in questions and red flag indicators.',
      downloadUrl: '#',
      readTime: 'Template'
    },
    {
      title: 'Divorce Process Guide',
      category: 'Family Law',
      type: 'guide',
      description: 'State-by-state guide to divorce proceedings, custody arrangements, asset division, and what to expect.',
      downloadUrl: '#',
      readTime: '25 min read'
    },
    {
      title: 'Consumer Rights Handbook',
      category: 'Consumer Rights',
      type: 'guide',
      description: 'Your rights when buying goods and services, handling defective products, and disputing charges.',
      downloadUrl: '#',
      readTime: '18 min read'
    },
    {
      title: 'Lease Agreement Review Video',
      category: 'Tenant Rights',
      type: 'video',
      description: 'Watch our expert walk through a real lease agreement, highlighting common pitfalls and negotiation points.',
      downloadUrl: '#',
      readTime: '45 min video'
    },
    {
      title: 'LLC vs S-Corp Comparison',
      category: 'Business',
      type: 'guide',
      description: 'Detailed comparison of business structures with tax implications, liability protection, and formation costs.',
      downloadUrl: '#',
      readTime: '10 min read'
    },
    {
      title: 'NDA Template Pack',
      category: 'Contracts',
      type: 'template',
      description: 'Three professional NDA templates: mutual, one-way, and employee NDAs with clause explanations.',
      downloadUrl: '#',
      readTime: 'Templates'
    },
    {
      title: 'Workplace Discrimination Guide',
      category: 'Employment',
      type: 'guide',
      description: 'Understanding protected classes, recognizing discrimination, documenting incidents, and filing complaints.',
      downloadUrl: '#',
      readTime: '15 min read'
    },
    {
      title: 'Security Deposit Recovery',
      category: 'Tenant Rights',
      type: 'guide',
      description: 'How to get your full security deposit back: documentation, move-out checklist, and demand letter template.',
      downloadUrl: '#',
      readTime: '10 min read'
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-6 h-6" />
      case 'template':
        return <FileText className="w-6 h-6" />
      default:
        return <BookOpen className="w-6 h-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-brand-indigo-400 text-brand-indigo-600'
      case 'template':
        return 'bg-semantic-success-subtle text-semantic-success'
      case 'checklist':
        return 'bg-semantic-info-subtle text-semantic-info'
      default:
        return 'bg-semantic-warning-subtle text-semantic-warning'
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-['Quicksand'] text-5xl md:text-6xl font-bold mb-6">
              Legal Resources
            </h1>
            <p className="text-xl text-white/90">
              Free guides, templates, and educational content to help you understand your legal rights
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border-subtle focus:border-brand-indigo-600 focus:outline-none text-text-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-[#5B6BA8] flex-shrink-0" />
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

        {/* Resources Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-[#5B6BA8]">
                Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
              </p>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[#5B6BA8]">No resources found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, i) => (
                  <div
                    key={i}
                    className="bg-white border-2 border-[#D4DAF0] rounded-3xl p-8 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-2xl transition-all group"
                  >
                    {/* Type Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-4 ${getTypeColor(resource.type)}`}>
                      {getIcon(resource.type)}
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </div>

                    {/* Title */}
                    <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-3 group-hover:text-[#5B6BA8] transition-colors">
                      {resource.title}
                    </h3>

                    {/* Category */}
                    <p className="text-sm text-[#5B6BA8] mb-4">{resource.category}</p>

                    {/* Description */}
                    <p className="text-[#5B6BA8] leading-relaxed mb-6">
                      {resource.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#5B6BA8]">{resource.readTime}</span>
                      <button className="inline-flex items-center gap-2 text-[#394C9A] font-semibold hover:gap-3 transition-all">
                        <Download className="w-5 h-5" />
                        Access
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#F5F7FC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[#394C9A] mb-6">
              Need Personalized Help?
            </h2>
            <p className="text-xl text-[#5B6BA8] mb-8">
              Our AI assistant can answer your specific legal questions in real-time
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Start Free Trial
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
