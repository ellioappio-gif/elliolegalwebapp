'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { useState } from 'react'
import { Upload, FileText, Trash2, Download, Share2 } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function DocumentsContent() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Contract Template', type: 'PDF', size: '2.4 MB', uploaded: '2 days ago', status: 'Analyzed' },
    { id: 2, name: 'Agreement', type: 'DOCX', size: '1.8 MB', uploaded: '1 week ago', status: 'Pending' },
  ])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: (file.name.split('.').pop() || 'file').toUpperCase(),
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploaded: 'Just now',
        status: 'Analyzing...'
      }
      setDocuments([newDoc, ...documents])
    })
  }

  const handleDownload = (doc: typeof documents[0]) => {
    // In a real app, this would download the file
    alert(`Downloading ${doc.name}`)
  }

  const handleShare = (doc: typeof documents[0]) => {
    // In a real app, this would open a share dialog
    alert(`Share link copied for ${doc.name}`)
  }

  const handleDelete = (docId: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== docId))
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#10b981]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">Documents</h1>
          </div>
          <p className="text-[#64748b]">Upload and manage your legal documents</p>
        </div>

        {/* Upload area */}
        <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 p-12 text-center mb-8 hover:border-blue-400 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.docx,.doc,.txt"
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            <Upload className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900 mb-1">Drop files here or click to upload</p>
            <p className="text-gray-600 text-sm">Supported: PDF, DOCX, TXT (Max 10 MB)</p>
          </label>
        </div>

        {/* Documents list */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Your Documents</h2>
          </div>

          {documents.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No documents yet. Upload one to get started.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {documents.map(doc => (
                <div key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.size} • {doc.uploaded}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'Analyzed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {doc.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDownload(doc)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors" 
                        title="Download"
                      >
                        <Download className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleShare(doc)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors" 
                        title="Share"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
