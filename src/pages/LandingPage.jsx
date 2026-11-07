import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TimelineSection from "../components/Timeline/TimelineSection";

export default function LandingPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#8c0003] text-white overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
    </main>
  );
}
