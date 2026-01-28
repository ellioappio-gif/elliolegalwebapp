'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">Welcome to Ellio Solutions</h2>
          <p className="text-xl mb-8 text-blue-100">
            Transform your business with cutting-edge web solutions and digital innovation
          </p>
          <Link 
            href="/#services" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
