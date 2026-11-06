import React from 'react';
import HeroSection from '../components/HeroSection';
import Footer from '../components/landingfooter';

export default function LandingPage() {
  return (
    <div className="w-full h-auto min-h-screen bg-[#8c0003] text-white flex flex-col">
      <main className="w-full flex-shrink-0">
        <HeroSection />
      </main>
      <div className="w-full min-h-screen">
  <LandingPage />
</div>
    </div>
  );
}
