'use client'

import { ProtectedRoute } from '@/app/auth/ProtectedRoute'
import { Bell, Mail, MessageSquare, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

function NotificationsContent() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your consultation with Sarah Mitchell is confirmed for tomorrow at 2:00 PM',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'question',
      title: 'Answer to Your Question',
      message: 'Your question about LLC formation has been answered by the AI assistant',
      time: '5 hours ago',
      read: false,
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Document Review Reminder',
      message: 'Sarah Mitchell has reviewed your business contract. Check your messages.',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'promo',
      title: 'Upgrade to Pro',
      message: 'Get unlimited questions and advanced features for just $14.99/month',
      time: '2 days ago',
      read: true,
      icon: Info,
      color: 'text-purple-600'
    }
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#0f172a]">Notifications</h1>
          </div>
          <p className="text-[#64748b]">Stay updated on your legal matters and consultations</p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600">{unreadCount} new notifications</p>
            </div>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h2>
            <p className="text-gray-600">You're all set. No new notifications.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notif => {
              const Icon = notif.icon
              return (
                <div
                  key={notif.id}
                  className={`rounded-xl border-2 p-6 transition-all ${
                    notif.read
                      ? 'bg-white border-gray-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${notif.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                        <Icon className={`w-5 h-5 ${notif.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{notif.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                        <p className="text-xs text-gray-500">{notif.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      )}
                      <div className="flex gap-2">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Notification Settings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="space-y-6">
              {[
                { label: 'Booking Confirmations', desc: 'Get notified when your appointments are confirmed' },
                { label: 'New Answers', desc: 'Get notified when questions are answered' },
                { label: 'Document Reviews', desc: 'Get notified when documents are reviewed' },
                { label: 'Marketing Emails', desc: 'Receive updates about new features and promotions' }
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div>
                    <h3 className="font-semibold text-gray-900">{setting.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{setting.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsContent />
    </ProtectedRoute>
  )
}
