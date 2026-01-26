'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { Heart, Star, MapPin, DollarSign, Video, MessageSquare } from 'lucide-react'
import { useState } from 'react'

function FavoritesContent() {
  const [favorites, setFavorites] = useState([
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
      name: 'Emily Rodriguez',
      specialty: 'Small Business Law',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 180,
      location: 'Texas, TX',
      bio: 'Helping startups and small businesses grow',
      available: false
    }
  ])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            Favorite Lawyers
          </h1>
          <p className="text-gray-600">Your saved list of favorite legal professionals</p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start saving lawyers you'd like to work with</p>
            <a href="/dashboard/lawyers" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Browse Lawyers
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {favorites.map(lawyer => (
              <div key={lawyer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">{lawyer.specialty}</p>
                  </div>
                  <button
                    onClick={() => removeFavorite(lawyer.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from favorites"
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </button>
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
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    <Video className="w-4 h-4" />
                    Schedule Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesContent />
    </ProtectedRoute>
  )
}
