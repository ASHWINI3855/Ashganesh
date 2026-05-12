import React from 'react';
import { motion } from 'framer-motion';
import SupabaseImage from '../components/SupabaseImage';
import logoFallback from '../assets/images/logo.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-[#060010] overflow-x-hidden pt-36 pb-24 px-6 flex items-center justify-center relative">
      
      {/* Ambient background layers */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-80" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(132,0,255,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[800px] mx-auto flex flex-col items-center text-center">
        
        {/* Business Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-32 h-32 mb-10 overflow-hidden flex items-center justify-center p-2"
        >
          <SupabaseImage 
            section="logo"
            fallbackSrc={logoFallback}
            alt="The Corner Stone Groups Logo" 
            className="w-full h-full object-contain"
            priority={true}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight"
        >
          About{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, #a855f7, #6C63FF, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Corner Stone Groups
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="text-gray-300 text-lg md:text-xl leading-relaxed md:leading-loose max-w-[700px] bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm"
        >
          The Corner Stone Groups is a Professional Placement Service specializing in hiring and supplying qualified candidates, significantly reducing HR workload. We also deliver top-notch IELTS coaching, Spoken English classes, and comprehensive Soft Skill training to prepare candidates thoroughly. Our expertise ensures clients receive highly skilled professionals who make an immediate impact. Committed to integrity and excellence, we streamline the company hiring process with precision. Discover talent beyond expectations with The Corner Stone Groups.
        </motion.p>
      </div>
    </div>
  );
};

export default About;
