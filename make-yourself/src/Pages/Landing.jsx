import React from 'react'
import Hero from "../Components/Hero";
import SectionReveal from "../Components/SectionReveal";
import VibeGlowCard from "../Components/VibeGlowCard";

const Landing = () => {
  return (
    <div className="bg-[#0B0F1A] text-[#EDEDED] min-h-screen px-6 md:px-12 py-8 space-y-20">
      <Hero />

      <SectionReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#C06CFC] mb-6">
          Start Your Journey
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionReveal delay={0.2}>
          <VibeGlowCard
            title="Brick by Brick – The Ebook"
            description="A 63-page guide to extreme discipline and identity shift."
          />
        </SectionReveal>
        <SectionReveal delay={0.3}>
          <VibeGlowCard
            title="Self Discipline Video Course"
            description="Actionable modules, visual challenges, and habit-building."
          />
        </SectionReveal>
        <SectionReveal delay={0.4}>
          <VibeGlowCard
            title="Wisdom Vault"
            description="Lifetime knowledge drops, blogs, and personal notes."
          />
        </SectionReveal>
      </div>
    </div>
  );
};

export default Landing;
