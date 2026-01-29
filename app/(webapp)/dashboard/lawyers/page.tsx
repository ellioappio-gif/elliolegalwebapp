'use client'

import { ProtectedRoute } from '@/app/auth/ProtectedRoute'
import { Star, MapPin, DollarSign, Video, MessageSquare, Users } from 'lucide-react'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function LawyersContent() {
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null)
  const [showModal, setShowModal] = useState<'schedule' | 'message' | null>(null)

  const lawyers = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      specialty: 'Contract Law',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 250,
      location: 'New York, NY',
      bio: '15+ years of corporate contract experience',
      available: true
    },
    {
      id: 2,
      name: 'James Chen',
      specialty: 'Family Law',
      rating: 4.8,
      reviews: 94,
      hourlyRate: 200,
      location: 'California, CA',
      bio: 'Specializing in divorce and custody cases',
      available: true
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialty: 'Small Business Law',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 180,
      location: 'Texas, TX',
      bio: 'Helping startups and small businesses grow',
      available: false
    },
    {
      id: 4,
      name: 'Michael Brown',
      specialty: 'Real Estate Law',
      rating: 4.7,
      reviews: 82,
      hourlyRate: 220,
      location: 'Florida, FL',
      bio: 'Expert in property transactions and disputes',
      available: true
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">Find a lawyer</h1>
          </div>
          <p className="text-[#64748b]">Connect with qualified legal professionals</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>All Specialties</option>
                <option>Contract Law</option>
                <option>Family Law</option>
                <option>Business Law</option>
                <option>Real Estate Law</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>All Locations</option>
                <option>New York</option>
                <option>California</option>
                <option>Texas</option>
                <option>Florida</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Any Price</option>
                <option>Under $150/hr</option>
                <option>$150-$250/hr</option>
                <option>$250-$400/hr</option>
                <option>$400+/hr</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lawyers grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {lawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
                  <p className="text-sm text-gray-600 font-medium mt-1">{lawyer.specialty}</p>
                </div>
                {lawyer.available && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Available
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4">{lawyer.bio}</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{lawyer.rating}</span>
                  <span className="text-gray-600">({lawyer.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>${lawyer.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{lawyer.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedLawyer(lawyer.id)
                    setShowModal('schedule')
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Video className="w-4 h-4" />
                  Schedule Call
                </button>
                <button 
                  onClick={() => {
                    setSelectedLawyer(lawyer.id)
                    setShowModal('message')
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for scheduling/messaging */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {showModal === 'schedule' ? 'Schedule a Call' : 'Send a Message'}
              </h3>
              <p className="text-gray-600 mb-6">
                {showModal === 'schedule' 
                  ? 'Video consultations with lawyers are coming soon. We\'re working hard to bring you this feature.'
                  : 'Direct messaging with lawyers is coming soon. In the meantime, you can use our AI assistant for legal questions.'}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function LawyersPage() {
  return (
    <ProtectedRoute>
      <LawyersContent />
    </ProtectedRoute>
  )
}
