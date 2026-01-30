import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClientProviders from './providers';
import './globals.css';
import '@/src/styles/ads.css';

export const metadata: Metadata = {
  title: 'ellio legal - AI-Powered Legal Guidance',
  description: 'Democratizing legal help through AI-powered guidance and attorney matching. Making legal services affordable, accessible, and available 24/7.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body text-text-primary bg-surface-primary">
        <ClientProviders>
          <Navigation />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
