'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 26, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p>
                ellio legal ("we" or "us" or "our") operates the elliolegal.com website (the "Service"). This page informs you of our 
                policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have 
                associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Types of Data Collected:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Email address, name, phone number, address</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visit</li>
                <li><strong>Document Data:</strong> Legal documents you upload for analysis</li>
                <li><strong>Cookies:</strong> Data stored on your device for authentication and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Data</h2>
              <p>ellio legal uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of 
                electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
                we cannot guarantee its absolute security.
              </p>
              <p className="mt-4">
                All documents uploaded are encrypted using bank-level AES-256 encryption and stored securely on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold">ellio legal Privacy Team</p>
                <p>Email: privacy@elliolegal.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Download your data in a portable format</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
