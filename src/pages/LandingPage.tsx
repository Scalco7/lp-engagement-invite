import { useState } from 'react';
import { Heart } from 'lucide-react';
import Header from '../components/organisms/Header';
import QuoteBanner from '../components/organisms/QuoteBanner';
import Footer from '../components/organisms/Footer';
import EnvelopeIntro from '../components/organisms/EnvelopeIntro';
import AdditionalDetailsSection from '../components/sections/AdditionalDetailsSection';
import ConfirmSection from '../components/sections/ConfirmSection';
import CountdownSection from '../components/sections/CountdownSection';
import EventDetailsSection from '../components/sections/EventDetailsSection';
import HeroSection from '../components/sections/HeroSection';
import HistorySection from '../components/sections/HistorySection';
import VlogsSection from '../components/sections/VlogsSection';

export default function LandingPage() {
  const engagementDate: Date = new Date('2026-07-25T19:00:00');
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <EnvelopeIntro onEnter={() => setEnvelopeOpened(true)} />

      {envelopeOpened && (
        <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-blush/40 relative animate-fade-in">

          {/* Delicate floating background ornaments */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
            {/* Floating heart 1 */}
            <div className="absolute top-1/4 left-10 animate-float-slow text-brand-blush">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            {/* Floating heart 2 */}
            <div className="absolute top-2/3 right-10 animate-float-slower text-brand-accent">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            {/* Decorative foliage SVG top right */}
            <svg className="absolute -top-20 -right-20 w-80 h-80 text-brand-blush/30" viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,90 Q30,60 50,80 T90,60 Q80,40 50,50 T10,90 Z" />
            </svg>
            {/* Decorative foliage SVG bottom left */}
            <svg className="absolute -bottom-20 -left-20 w-80 h-80 text-brand-sage/40" viewBox="0 0 100 100" fill="currentColor">
              <path d="M90,10 Q70,40 50,20 T10,40 Q20,60 50,50 T90,10 Z" />
            </svg>
          </div>

          {/* Navigation Header */}
          <Header scrollToSection={scrollToSection} />

          {/* Main Content */}
          <main className="relative z-10">
            <HeroSection />
            <HistorySection />
            <CountdownSection engagementDate={engagementDate} />
            <EventDetailsSection engagementDate={engagementDate} />
            <ConfirmSection engagementDate={engagementDate} />
            <AdditionalDetailsSection />
            <VlogsSection />
            <QuoteBanner />
          </main>

          {/* Footer */}
          <Footer engagementDate={engagementDate} />

        </div>
      )}
    </>
  );
}
