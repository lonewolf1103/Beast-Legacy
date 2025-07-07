import React from 'react'
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-[#AA89FF] mb-4"
      >
        Make Yourself
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-2xl text-[#C06CFC]"
      >
        Unleash Discipline. Build a Life You Don’t Want to Escape From.
      </motion.p>
    </section>
  );
};

export default Hero;
