import React from 'react'
import { motion } from "framer-motion";

const VibeGlowCard = ({ title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative bg-[#111827] border border-[#C06CFC]/30 rounded-2xl p-6 shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-[#AA89FF]/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl" />
      <h3 className="text-xl font-semibold text-[#EDEDED] mb-2">{title}</h3>
      <p className="text-sm text-[#AA89FF]">{description}</p>
    </motion.div>
  );
};

export default VibeGlowCard;
