import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, FileCheck, GraduationCap, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BlurText from '../components/BlurText';
import BorderGlow from '../components/BorderGlow';
import ServicesCards from '../components/ServicesCards';
import CareerGallery from '../components/CareerGallery';

const reasonsData = [
  {
    title: 'Transparent Process',
    description: 'We believe in complete transparency — from job placement to training, every step is simple, reliable, and stress-free.',
    icon: <Target className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />,
    className: 'md:col-span-2 lg:col-span-2 lg:row-span-2'
  },
  {
    title: 'Fast Processing',
    description: 'We ensure quick turnaround times without compromising quality or accuracy.',
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    className: 'col-span-1'
  },
  {
    title: 'Reliable Support',
    description: 'From consultation to placement, we guide you at every stage with consistent and dependable support.',
    icon: <FileCheck className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    className: 'col-span-1'
  },
  {
    title: 'Quality Training',
    description: 'We provide high-quality training programs that prepare candidates for real-world success.',
    icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    className: 'col-span-1'
  },
  {
    title: 'Affordable Services',
    description: 'Our service charges are reasonable, ensuring candidates and employers get the best without hidden costs.',
    icon: <Globe className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    className: 'md:col-span-2 lg:col-span-2'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeOut" }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(null);

  return (
    <div id="home" className="min-h-screen bg-[#060010] overflow-x-hidden">

      {/* Ambient background layers */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-80" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(132,0,255,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── HERO ── */}
      <section className="relative z-10 pt-32 pb-6 px-5 md:px-10 lg:px-16 max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Text & UI Cleanup */}
        <div className="text-center flex flex-col items-center mb-8 px-4">
          <BlurText
            text="Your Career Partner"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-6xl lg:text-[80px] font-bold text-white tracking-tight leading-tight mb-6"
            onAnimationComplete={() => console.log('Animation completed')}
          />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-blur-in-delay">
            Elevating your professional journey with expert guidance, elite study abroad programs, and top-tier recruitment matching.
          </p>

          <div className="animate-blur-in-delay flex flex-col sm:flex-row gap-4 items-center">
             <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 bg-[#6C63FF] hover:bg-[#7c72ff] text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-purple-900/40 hover:-translate-y-0.5 z-20 relative"
            >
              Enquire Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link 
              to="/about"
              className="text-white/55 hover:text-white text-sm font-semibold px-6 py-4 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300 z-20 relative"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAREER GALLERY (Visual Hub) ── */}
      <div className="px-4 md:px-8 max-w-[1440px] mx-auto">
        <CareerGallery />
      </div>

      {/* ── SERVICES DETAIL CARDS ── */}
      <div className="relative z-10 pt-10 pb-20">
        <ServicesCards />
      </div>

      {/* ── WHY CHOOSE US ── */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-10 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Why Choose Us
          </h2>
          <div className="w-20 h-1.5 bg-[#6C63FF] mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-fr relative"
        >
          {/* Soft dark gradient background behind section (absolute layer) */}
          <div className="absolute inset-x-[-10vw] inset-y-[-50px] bg-gradient-to-b from-transparent via-[#c084fc]/5 to-transparent z-[-1] pointer-events-none rounded-full blur-3xl opacity-50" />

          {reasonsData.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={() => setOpenCard(openCard === idx ? null : idx)}
              className={`group hover:-translate-y-[5px] hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[160px] md:min-h-[180px] lg:min-h-[200px] ${reason.className}`}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#060010"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                className="w-full h-full shadow-lg hover:shadow-2xl hover:shadow-[#c084fc]/10 transition-shadow duration-300"
              >
                <div className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center relative z-10 bg-[#060010]/80">
                  <div className="text-[#6C63FF] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(108,99,255,0.4)]">
                    {reason.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl mt-4 tracking-tight group-hover:text-[#c084fc] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out w-full max-w-[80%] mx-auto ${openCard === idx ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Home;
