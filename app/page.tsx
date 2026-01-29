import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import UseCases from '@/components/UseCases';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <UseCases />
      <HowItWorks />
      <Services />
      <Testimonials />
      <CTA />
    </main>
  );
}
