'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { useState } from 'react'
import { 
  Plus, Search, Filter, FolderOpen, Calendar, 
  AlertTriangle, CheckCircle, Clock, Trash2, Edit, 
  ChevronRight, X 
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FeatureGate, useLimit } from '@/components/FeatureGate'
import Link from 'next/link'

type CaseStatus = 'active' | 'pending' | 'closed' | 'on_hold'
type CasePriority = 'low' | 'medium' | 'high' | 'critical'

interface Case {
  id: string
  title: string
  caseNumber: string
  description: string
  status: CaseStatus
  priority: CasePriority
  caseType: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  documents: number
  notes: string
}

const statusColors: Record<CaseStatus, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-gray-100 text-gray-700',
  on_hold: 'bg-red-100 text-red-700',
}

const priorityColors: Record<CasePriority, string> = {
  low: 'bg-blue-100 text-blue-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}

const statusIcons: Record<CaseStatus, React.ReactNode> = {
  active: <CheckCircle className="w-4 h-4" />,
  pending: <Clock className="w-4 h-4" />,
  closed: <CheckCircle className="w-4 h-4" />,
  on_hold: <AlertTriangle className="w-4 h-4" />,
}

function CasesContent() {
  const [cases, setCases] = useState<Case[]>([
    {
      id: '1',
      title: 'Smith vs. Johnson',
      caseNumber: '2024-CV-001',
      description: 'Contract dispute regarding service delivery terms',
      status: 'active',
      priority: 'high',
      caseType: 'Civil',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      dueDate: '2024-03-15',
      documents: 5,
      notes: '',
    },
    {
      id: '2',
      title: 'Estate Planning - Williams',
      caseNumber: '2024-EP-002',
      description: 'Complete estate planning including will and trust setup',
      status: 'pending',
      priority: 'medium',
      caseType: 'Estate',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      documents: 3,
      notes: '',
    },
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<CasePriority | 'all'>('all')
  const [showNewCaseModal, setShowNewCaseModal] = useState(false)
  const [editingCase, setEditingCase] = useState<Case | null>(null)
  
  const { isWithinLimit, remaining, total } = useLimit('cases')

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleDeleteCase = (id: string) => {
    if (confirm('Are you sure you want to delete this case?')) {
      setCases(cases.filter(c => c.id !== id))
    }
  }

  const handleCreateCase = (newCase: Omit<Case, 'id' | 'createdAt' | 'updatedAt' | 'documents'>) => {
    const caseToAdd: Case = {
      ...newCase,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      documents: 0,
    }
    setCases([caseToAdd, ...cases])
    setShowNewCaseModal(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8ECF8] flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-brand-indigo-700" />
              </div>
              <h1 className="font-sans text-2xl font-semibold text-brand-indigo-700">My Cases</h1>
            </div>
            <p className="text-[#5B6BA8]">
              {cases.length} case{cases.length !== 1 ? 's' : ''} • 
              {remaining === 'unlimited' ? ' Unlimited' : ` ${remaining} remaining`}
            </p>
          </div>
          
          <FeatureGate limit="cases" showUpgradePrompt={false}>
            <button
              onClick={() => setShowNewCaseModal(true)}
              disabled={!isWithinLimit}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg disabled:opacity-50 text-white rounded-lg font-medium transition-all"
            >
              <Plus className="w-5 h-5" />
              New Case
            </button>
          </FeatureGate>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-border-subtle p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5B6BA8]" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-indigo-700"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as CaseStatus | 'all')}
                className="px-3 py-2 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
                <option value="on_hold">On Hold</option>
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as CasePriority | 'all')}
                className="px-3 py-2 border border-[#D4DAF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394C9A]"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cases List */}
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-xl border border-border-subtle p-12 text-center">
            <FolderOpen className="w-12 h-12 text-[#D4DAF0] mx-auto mb-4" />
            <h2 className="font-sans text-xl font-semibold text-brand-indigo-700 mb-2">No cases found</h2>
            <p className="text-[#5B6BA8] mb-6">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first case to get started'}
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && (
              <button
                onClick={() => setShowNewCaseModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                Create First Case
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCases.map(caseItem => (
              <div 
                key={caseItem.id} 
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[caseItem.priority]}`}>
                        {caseItem.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Case #{caseItem.caseNumber}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingCase(caseItem)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteCase(caseItem.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{caseItem.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusColors[caseItem.status]}`}>
                      {statusIcons[caseItem.status]}
                      {caseItem.status.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {caseItem.dueDate || 'No due date'}
                    </span>
                    <span>{caseItem.documents} documents</span>
                  </div>
                  
                  <Link
                    href={`/dashboard/cases/${caseItem.id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Case Modal */}
        {showNewCaseModal && (
          <NewCaseModal
            onClose={() => setShowNewCaseModal(false)}
            onSubmit={handleCreateCase}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

interface NewCaseModalProps {
  onClose: () => void
  onSubmit: (data: Omit<Case, 'id' | 'createdAt' | 'updatedAt' | 'documents'>) => void
}

function NewCaseModal({ onClose, onSubmit }: NewCaseModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    description: '',
    status: 'active' as CaseStatus,
    priority: 'medium' as CasePriority,
    caseType: 'Civil',
    dueDate: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.caseNumber) return
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">New Case</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Case Title *</label>
            <input
              type="text"
              required
              placeholder="e.g., Smith vs. Jones"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Case Number *</label>
            <input
              type="text"
              required
              placeholder="e.g., 2024-CV-001"
              value={formData.caseNumber}
              onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe the case..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CaseStatus })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as CasePriority })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
              <select
                value={formData.caseType}
                onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Civil">Civil</option>
                <option value="Criminal">Criminal</option>
                <option value="Family">Family</option>
                <option value="Estate">Estate</option>
                <option value="Corporate">Corporate</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Employment">Employment</option>
                <option value="Immigration">Immigration</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Create Case
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CasesPage() {
  return (
    <ProtectedRoute>
      <CasesContent />
    </ProtectedRoute>
  )
}
