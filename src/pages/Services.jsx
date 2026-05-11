import React from 'react';
import { motion } from 'framer-motion';
import ServiceFlipCards from '../components/ServiceFlipCards';

const Services = () => {
  return (
    <div className="min-h-screen bg-[#060010] overflow-x-hidden">
      {/* Ambient grid */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-80" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(132,0,255,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-40 pb-28">

        {/* ── Single heading (no duplicate) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[10px] font-black tracking-[0.22em] uppercase text-[#6C63FF] bg-[#6C63FF]/10 border border-[#6C63FF]/25 rounded-full px-5 py-2 mb-6">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white tracking-tighter leading-tight mb-5">
            Our Core{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-purple-400">
              Services
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Delivering excellence in recruitment, education and professional training
            to empower your global career trajectory.
          </p>
        </motion.div>

        {/* ── Uniform 5-card grid ── */}
        <ServiceFlipCards />
      </div>
    </div>
  );
};

export default Services;
