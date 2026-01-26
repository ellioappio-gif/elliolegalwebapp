'use client'

import { ProtectedRoute } from '../../auth/ProtectedRoute'
import { Shield, Smartphone, Copy, Check } from 'lucide-react'
import { useState } from 'react'

function TwoFactorContent() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [step, setStep] = useState('menu') // menu, setup, verify, success
  const [qrCode] = useState('data:image/png;base64,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')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('JBSWY3DPEBLW64TMMQQQ====')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600">Add an extra layer of security to your account</p>
        </div>

        {step === 'menu' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isEnabled ? 'Your account is protected with 2FA' : 'Not yet enabled'}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'
                }`}>
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              {!isEnabled ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Two-factor authentication (2FA) adds an extra layer of security by requiring a second form of verification when you sign in.
                  </p>
                  <button
                    onClick={() => setStep('setup')}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Enable 2FA
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-900">
                      ✓ Your account is protected with authenticator app verification
                    </p>
                  </div>
                  <button
                    onClick={() => setStep('setup')}
                    className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Reconfigure
                  </button>
                  <button className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
                    Disable 2FA
                  </button>
                </div>
              )}
            </div>

            {/* Backup Codes */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Backup Codes</h3>
              <p className="text-sm text-gray-600 mb-4">
                Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2 mb-4">
                <div>5623-1847-2931</div>
                <div>7392-5018-4726</div>
                <div>2846-9103-5729</div>
                <div>9102-3847-6210</div>
              </div>
              <button className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors">
                Download Backup Codes
              </button>
            </div>
          </div>
        )}

        {step === 'setup' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Set Up Authenticator</h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Download Authenticator App</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Install one of these apps on your mobile device:
                    </p>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors">
                        Google Authenticator
                      </button>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors">
                        Microsoft Authenticator
                      </button>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors">
                        Authy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-900 mb-4">Scan QR Code</h3>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-center">
                      <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Or enter this key manually:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="JBSWY3DPEBLW64TMMQQQ===="
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                      />
                      <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-900 mb-4">Verify Code</h3>
                    <p className="text-sm text-gray-600 mb-4">Enter the 6-digit code from your authenticator app:</p>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setStep('menu')
                  setIsEnabled(true)
                }}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Confirm & Enable
              </button>
              <button
                onClick={() => setStep('menu')}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TwoFactorPage() {
  return (
    <ProtectedRoute>
      <TwoFactorContent />
    </ProtectedRoute>
  )
}
