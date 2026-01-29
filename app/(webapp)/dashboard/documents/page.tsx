'use client'

import { ProtectedRoute } from '@/app/auth/ProtectedRoute'
import { useState } from 'react'
import { 
  Upload, FileText, Trash2, Download, Share2, Star, Clock, 
  Search, Filter, Scan, Eye, Tag, Grid3X3, List, X, Check
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FeatureGate, useFeature, useLimit } from '@/components/FeatureGate'
import Link from 'next/link'

type ViewMode = 'grid' | 'list'
type TabFilter = 'all' | 'starred' | 'recent'

interface Document {
  id: number
  name: string
  type: string
  size: string
  uploaded: string
  status: 'analyzing' | 'analyzed' | 'ocr_complete' | 'pending'
  starred: boolean
  lastViewed?: string
  tags: string[]
  ocrText?: string
  caseId?: string
}

function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: 1, 
      name: 'Contract Template', 
      type: 'PDF', 
      size: '2.4 MB', 
      uploaded: '2 days ago', 
      status: 'analyzed',
      starred: true,
      lastViewed: '1 hour ago',
      tags: ['contracts', 'template'],
    },
    { 
      id: 2, 
      name: 'Agreement', 
      type: 'DOCX', 
      size: '1.8 MB', 
      uploaded: '1 week ago', 
      status: 'pending',
      starred: false,
      tags: ['agreement'],
    },
    { 
      id: 3, 
      name: 'Court Filing', 
      type: 'PDF', 
      size: '3.2 MB', 
      uploaded: '3 days ago', 
      status: 'ocr_complete',
      starred: true,
      lastViewed: '2 days ago',
      tags: ['court', 'filing'],
      ocrText: 'Sample OCR extracted text...',
    },
  ])
  
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [tabFilter, setTabFilter] = useState<TabFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showOCRModal, setShowOCRModal] = useState<Document | null>(null)
  const [processingOCR, setProcessingOCR] = useState<number | null>(null)
  
  const hasOCR = useFeature('documentOcr')
  const { isWithinLimit, remaining } = useLimit('documentsPerMonth')

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (tabFilter === 'starred') return matchesSearch && doc.starred
    if (tabFilter === 'recent') return matchesSearch && doc.lastViewed
    return matchesSearch
  })

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const newDoc: Document = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: (file.name.split('.').pop() || 'file').toUpperCase(),
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploaded: 'Just now',
        status: 'analyzing',
        starred: false,
        tags: [],
      }
      setDocuments(prev => [newDoc, ...prev])
      
      // Simulate analysis completing
      setTimeout(() => {
        setDocuments(prev => prev.map(d => 
          d.id === newDoc.id ? { ...d, status: 'analyzed' as const } : d
        ))
      }, 3000)
    })
  }

  const handleToggleStar = (docId: number) => {
    setDocuments(docs => docs.map(d => 
      d.id === docId ? { ...d, starred: !d.starred } : d
    ))
  }

  const handleRunOCR = async (doc: Document) => {
    if (!hasOCR) return
    setProcessingOCR(doc.id)
    
    // Simulate OCR processing
    setTimeout(() => {
      setDocuments(prev => prev.map(d => 
        d.id === doc.id 
          ? { ...d, status: 'ocr_complete' as const, ocrText: 'OCR extracted text from the document. This would contain the full text content extracted from images and scanned pages...' }
          : d
      ))
      setProcessingOCR(null)
    }, 2000)
  }

  const handleViewDocument = (doc: Document) => {
    setDocuments(docs => docs.map(d =>
      d.id === doc.id ? { ...d, lastViewed: 'Just now' } : d
    ))
    // In a real app, this would open a document viewer
    alert(`Opening ${doc.name}`)
  }

  const handleDownload = (doc: Document) => {
    alert(`Downloading ${doc.name}`)
  }

  const handleShare = (doc: Document) => {
    alert(`Share link copied for ${doc.name}`)
  }

  const handleDelete = (docId: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== docId))
    }
  }

  const statusBadge = (status: Document['status']) => {
    const styles = {
      analyzing: 'bg-semantic-info-subtle text-semantic-info',
      analyzed: 'bg-semantic-success-subtle text-semantic-success',
      ocr_complete: 'bg-brand-indigo-400 text-brand-indigo-600',
      pending: 'bg-semantic-warning-subtle text-semantic-warning',
    }
    const labels = {
      analyzing: 'Analyzing...',
      analyzed: 'Analyzed',
      ocr_complete: 'OCR Complete',
      pending: 'Pending',
    }
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-semantic-success-subtle flex items-center justify-center">
                <FileText className="w-5 h-5 text-semantic-success" />
              </div>
              <h1 className="text-2xl font-semibold text-text-primary">Documents</h1>
            </div>
            <p className="text-text-secondary">
              {documents.length} documents • {remaining === 'unlimited' ? 'Unlimited uploads' : `${remaining} uploads remaining`}
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTabFilter('all')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tabFilter === 'all' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTabFilter('starred')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                tabFilter === 'starred' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star className="w-4 h-4" />
              Starred
            </button>
            <button
              onClick={() => setTabFilter('recent')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                tabFilter === 'recent' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              Recent
            </button>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-border-default rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo-600 w-64"
              />
            </div>
            
            <div className="flex bg-surface-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List className="w-4 h-4 text-text-secondary" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid3X3 className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* Upload area */}
        <FeatureGate limit="documentsPerMonth" showUpgradePrompt={false}>
          <div className={`bg-white rounded-xl border-2 border-dashed ${isWithinLimit ? 'border-semantic-success/50 hover:border-semantic-success' : 'border-border-default'} p-8 text-center mb-6 transition-colors`}>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg"
              disabled={!isWithinLimit}
            />
            <label htmlFor="file-upload" className={`${isWithinLimit ? 'cursor-pointer' : 'cursor-not-allowed'} block`}>
              <Upload className={`w-10 h-10 mx-auto mb-3 ${isWithinLimit ? 'text-[#10b981]' : 'text-gray-300'}`} />
              <p className="text-lg font-semibold text-gray-900 mb-1">
                {isWithinLimit ? 'Drop files here or click to upload' : 'Upload limit reached'}
              </p>
              <p className="text-gray-600 text-sm">
                {isWithinLimit ? 'Supported: PDF, DOCX, TXT, Images (Max 10 MB)' : (
                  <Link href="/pricing" className="text-[#10b981] hover:underline">Upgrade for more uploads</Link>
                )}
              </p>
            </label>
          </div>
        </FeatureGate>

        {/* Documents */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl border border-border-default p-12 text-center">
            <FileText className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">No documents found</h2>
            <p className="text-text-secondary">
              {searchTerm ? 'Try a different search term' : 
               tabFilter === 'starred' ? 'Star documents to see them here' :
               tabFilter === 'recent' ? 'Recently viewed documents will appear here' :
               'Upload your first document to get started'}
            </p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="bg-white rounded-xl border border-border-default overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="px-6 py-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggleStar(doc.id)}
                      className="p-1 hover:bg-neutral-100 rounded"
                    >
                      <Star className={`w-5 h-5 ${doc.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    </button>
                    
                    <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#10b981]" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploaded}</span>
                        {doc.lastViewed && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {doc.lastViewed}
                            </span>
                          </>
                        )}
                      </div>
                      {doc.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {doc.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {statusBadge(doc.status)}
                      
                      {/* OCR Button - Premium Feature */}
                      {doc.type === 'PDF' && (
                        <FeatureGate feature="documentOcr" showUpgradePrompt={false}>
                          <button
                            onClick={() => doc.ocrText ? setShowOCRModal(doc) : handleRunOCR(doc)}
                            disabled={processingOCR === doc.id}
                            className={`p-2 rounded-lg transition-colors ${
                              doc.ocrText 
                                ? 'bg-brand-indigo-400 text-brand-indigo-600 hover:bg-brand-indigo-500' 
                                : 'hover:bg-gray-100 text-gray-500'
                            }`}
                            title={doc.ocrText ? 'View OCR Text' : 'Run OCR'}
                          >
                            {processingOCR === doc.id ? (
                              <div className="w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
                            ) : (
                              <Scan className="w-5 h-5" />
                            )}
                          </button>
                        </FeatureGate>
                      )}
                      
                      <button onClick={() => handleViewDocument(doc)} className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <button onClick={() => handleDownload(doc)} className="p-2 hover:bg-gray-100 rounded-lg" title="Download">
                        <Download className="w-5 h-5 text-gray-500" />
                      </button>
                      <button onClick={() => handleShare(doc)} className="p-2 hover:bg-gray-100 rounded-lg" title="Share">
                        <Share2 className="w-5 h-5 text-gray-500" />
                      </button>
                      <button onClick={() => handleDelete(doc.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <button onClick={() => handleToggleStar(doc.id)}>
                    <Star className={`w-5 h-5 ${doc.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  </button>
                </div>
                
                <h3 className="font-medium text-gray-900 truncate mb-1">{doc.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{doc.size} • {doc.type}</p>
                {statusBadge(doc.status)}
                
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button onClick={() => handleViewDocument(doc)} className="flex-1 p-2 hover:bg-gray-50 rounded text-gray-500">
                    <Eye className="w-4 h-4 mx-auto" />
                  </button>
                  <button onClick={() => handleDownload(doc)} className="flex-1 p-2 hover:bg-gray-50 rounded text-gray-500">
                    <Download className="w-4 h-4 mx-auto" />
                  </button>
                  <button onClick={() => handleDelete(doc.id)} className="flex-1 p-2 hover:bg-red-50 rounded text-red-500">
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* OCR Text Modal */}
        {showOCRModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scan className="w-5 h-5 text-purple-600" />
                  <h2 className="font-semibold text-gray-900">OCR Extracted Text</h2>
                </div>
                <button onClick={() => setShowOCRModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className="text-sm text-gray-500 mb-2">{showOCRModal.name}</p>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                  {showOCRModal.ocrText || 'No OCR text available'}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(showOCRModal.ocrText || '')
                    alert('Text copied to clipboard')
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
                >
                  Copy Text
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <DocumentsContent />
    </ProtectedRoute>
  )
}
