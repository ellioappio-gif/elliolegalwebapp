'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Home, Search, FileQuestion, ArrowLeft, MessageCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-[#F5F7FC] to-white flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* 404 Graphic */}
          <div className="mb-12">
            <div className="relative inline-block">
              <h1 className="font-['Quicksand'] text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] leading-none">
                404
              </h1>
              <FileQuestion className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-[#D4DAF0]" />
            </div>
          </div>

          {/* Message */}
          <h2 className="font-['Quicksand'] text-4xl md:text-5xl font-bold text-[#394C9A] mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-[#5B6BA8] mb-12 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find what you need.
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/"
              className="flex items-center justify-center gap-3 bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-xl transition-all group"
            >
              <Home className="w-6 h-6 text-[#394C9A] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h3 className="font-bold text-[#394C9A]">Go Home</h3>
                <p className="text-sm text-[#5B6BA8]">Back to homepage</p>
              </div>
            </Link>

            <Link
              href="/auth/signup"
              className="flex items-center justify-center gap-3 bg-white border-2 border-[#D4DAF0] rounded-2xl p-6 hover:border-[#394C9A] hover:-translate-y-2 hover:shadow-xl transition-all group"
            >
              <MessageCircle className="w-6 h-6 text-[#394C9A] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h3 className="font-bold text-[#394C9A]">Ask AI</h3>
                <p className="text-sm text-[#5B6BA8]">Get instant answers</p>
              </div>
            </Link>
          </div>

          {/* Popular Pages */}
          <div className="border-t-2 border-[#D4DAF0] pt-12">
            <h3 className="font-['Quicksand'] text-2xl font-bold text-[#394C9A] mb-6">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/features"
                className="px-6 py-3 bg-white border-2 border-[#D4DAF0] rounded-xl text-[#5B6BA8] font-semibold hover:border-[#394C9A] hover:text-[#394C9A] transition-all"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-white border-2 border-[#D4DAF0] rounded-xl text-[#5B6BA8] font-semibold hover:border-[#394C9A] hover:text-[#394C9A] transition-all"
              >
                Pricing
              </Link>
              <Link
                href="/how-it-works"
                className="px-6 py-3 bg-white border-2 border-[#D4DAF0] rounded-xl text-[#5B6BA8] font-semibold hover:border-[#394C9A] hover:text-[#394C9A] transition-all"
              >
                How It Works
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 bg-white border-2 border-[#D4DAF0] rounded-xl text-[#5B6BA8] font-semibold hover:border-[#394C9A] hover:text-[#394C9A] transition-all"
              >
                FAQ
              </Link>
              <Link
                href="/resources"
                className="px-6 py-3 bg-white border-2 border-[#D4DAF0] rounded-xl text-[#5B6BA8] font-semibold hover:border-[#394C9A] hover:text-[#394C9A] transition-all"
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white border-2 border-[#D4DAF0] rounded-xl text-[#5B6BA8] font-semibold hover:border-[#394C9A] hover:text-[#394C9A] transition-all"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] rounded-3xl text-white">
            <h3 className="font-['Quicksand'] text-2xl font-bold mb-3">
              Still Can't Find What You Need?
            </h3>
            <p className="text-white/90 mb-6">
              Our support team is here to help 24/7
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 bg-white text-[#394C9A] px-8 py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
