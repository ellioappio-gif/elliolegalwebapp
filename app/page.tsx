import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Services />
      <CTA />
    </main>
  );
}
