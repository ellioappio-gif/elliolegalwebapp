'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" className="bg-blue-600 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Let&apos;s work together to bring your vision to life
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
          <Link 
            href="/pricing" 
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
