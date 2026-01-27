'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { Search, FileText, User, Filter, X } from 'lucide-react'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function SearchContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('all')
  const [results, setResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Sample data
  const documents = [
    { id: 1, name: 'Operating Agreement.pdf', type: 'document', date: '2024-01-15', category: 'Business' },
    { id: 2, name: 'Service Contract.docx', type: 'document', date: '2024-01-10', category: 'Contracts' },
    { id: 3, name: 'NDA Template.pdf', type: 'document', date: '2024-01-05', category: 'Agreements' },
  ]

  const lawyers = [
    { id: 1, name: 'Sarah Mitchell', specialty: 'Contract Law', location: 'New York, NY', rating: 4.9 },
    { id: 2, name: 'Emily Rodriguez', specialty: 'Small Business Law', location: 'Texas, TX', rating: 4.9 },
    { id: 3, name: 'James Chen', specialty: 'Corporate Law', location: 'California, CA', rating: 4.8 },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)

    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const docResults = documents
      .filter(doc => doc.name.toLowerCase().includes(query) || doc.category.toLowerCase().includes(query))
      .map(doc => ({ ...doc, resultType: 'document' }))

    const lawyerResults = lawyers
      .filter(lawyer => lawyer.name.toLowerCase().includes(query) || lawyer.specialty.toLowerCase().includes(query))
      .map(lawyer => ({ ...lawyer, resultType: 'lawyer' }))

    const combined = [...docResults, ...lawyerResults]

    if (searchType === 'documents') {
      setResults(docResults)
    } else if (searchType === 'lawyers') {
      setResults(lawyerResults)
    } else {
      setResults(combined)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#4f46e5]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">Search</h1>
          </div>
          <p className="text-[#64748b]">Find documents, lawyers, and legal resources</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents, lawyers, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Filter Options */}
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Filter className="w-4 h-4" />
                  Filter:
                </div>
                {[
                  { value: 'all', label: 'All Results' },
                  { value: 'documents', label: 'Documents' },
                  { value: 'lawyers', label: 'Lawyers' },
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="searchType"
                      value={option.value}
                      checked={searchType === option.value}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Results */}
        {!hasSearched ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Searching</h2>
            <p className="text-gray-600">Search for documents by name, type, or category. Find lawyers by name or specialty.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <X className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600">Try different keywords or adjust your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">Found {results.length} result{results.length !== 1 ? 's' : ''}</p>

            {results.map(result => (
              <div key={result.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                {result.resultType === 'document' ? (
                  // Document Result
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{result.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{result.category}</span>
                            <span>{result.date}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Lawyer Result
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{result.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{result.specialty}</span>
                            <span>⭐ {result.rating}</span>
                            <span className="text-gray-500">{result.location}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <SearchContent />
    </ProtectedRoute>
  )
}
