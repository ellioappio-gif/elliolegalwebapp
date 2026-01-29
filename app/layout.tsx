'use client'

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/app/auth/AuthContext';
import { SubscriptionProvider } from '@/lib/stores/subscriptionStore';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Metadata can't be used in client components, moving to a separate file if needed

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SubscriptionProvider>
            <Navigation />
            {children}
            <Footer />
          </SubscriptionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
