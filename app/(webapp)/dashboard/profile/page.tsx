'use client'

import { ProtectedRoute } from '../../../(auth)/auth/ProtectedRoute'
import { useAuth } from '@/app/auth/AuthContext'
import Link from 'next/link'
import { User, Mail, FileText, Star } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function ProfileContent() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#4f46e5]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">My profile</h1>
          </div>
          <p className="text-[#64748b]">Manage your account information and preferences</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-3">Member since January 2026</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
            {[
              { icon: FileText, label: 'Documents', value: '2' },
              { icon: Star, label: 'Favorite Lawyers', value: '0' },
              { icon: Mail, label: 'Questions Asked', value: '0' }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg text-center">
                <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="/dashboard/settings" className="block w-full px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center font-semibold text-gray-900">
              Edit Profile
            </Link>
            <Link href="/dashboard/documents" className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center font-semibold text-white">
              View Documents
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="text-center py-8">
            <p className="text-gray-600">No recent activity yet</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
