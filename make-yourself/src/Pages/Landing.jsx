import React from 'react';
import Hero from "../Components/Hero";
import SectionReveal from "../Components/SectionReveal";
import VibeGlowCard from "../Components/VibeGlowCard";
import ChatBot from "../Components/Chatbot";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="bg-[#0B0F1A] text-[#EDEDED] min-h-screen px-6 md:px-12 py-8 space-y-20 flex flex-col items-center">
      
      {/* Branding */}
      <Hero />

      {/* Subtitle / Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl text-[#C06CFC] text-center mt-[-40px]"
      >
        Your mentor awaits. Speak, young warrior.
      </motion.div>

      {/* GandivX ChatBot with aura glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Divine glowing aura behind */}
        <div className="absolute -inset-6 z-[-1] rounded-3xl blur-2xl bg-[#AA89FF33] shadow-[0_0_100px_#AA89FF44]" />
        
        {/* Chat Interface */}
        <ChatBot />
      </motion.div>

      {/* Journey Cards */}
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
