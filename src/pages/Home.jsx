import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, FileCheck, GraduationCap, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BlurText from '../components/BlurText';
import BorderGlow from '../components/BorderGlow';
import CareerGallery from '../components/CareerGallery';
import HomeServices from '../components/HomeServices';
import ContactSection from '../components/ContactSection';
import { SupabaseVideo } from '../components/SupabaseImage';

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

  const scrollToServices = (e) => {
    e.preventDefault();
    const element = document.getElementById('services-section');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Handle hash scrolling on mount or location change
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

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
            className="text-4xl md:text-6xl lg:text-[80px] font-bold text-white tracking-tight leading-tight mb-12"
            onAnimationComplete={() => console.log('Animation completed')}
          />

          <div className="animate-blur-in-delay flex flex-col sm:flex-row gap-4 items-center">
            <Link 
              to="/contact"
              className="group flex items-center gap-3 bg-[#6C63FF] hover:bg-[#7c72ff] text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-purple-900/40 hover:-translate-y-0.5 z-20 relative"
            >
              Enquire Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={scrollToServices}
              className="text-white/55 hover:text-white text-sm font-semibold px-6 py-4 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300 z-20 relative cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── CAREER GALLERY (Visual Hub) ── */}
      <div className="px-4 md:px-8 max-w-[1440px] mx-auto">
        <CareerGallery />
      </div>

      {/* ── HIGHLIGHT SERVICES ── */}
      <section id="services-section" className="relative z-10 py-16">
        <HomeServices />
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Animated Video Background */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {/* 9:16 vertical video container — no crop, full frame visible */}
            <div
              className="relative w-full md:w-[320px] lg:w-[400px] rounded-[24px] md:rounded-[32px] overflow-hidden"
              style={{
                aspectRatio: '9 / 16',
                boxShadow: '0 40px 100px rgba(108,99,255,0.25)',
                background: '#000',
                margin: '0 auto'
              }}
            >
              <SupabaseVideo
                section="why_choose_us"
                fallbackSrc="/why-choose-us.mp4"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  background: '#000',
                }}
              />
              {/* Subtle inner glow border */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  border: '1px solid rgba(108,99,255,0.3)',
                  pointerEvents: 'none',
                }}
              />
              {/* Soft glow behind */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  top: '-40px',
                  left: '-40px',
                  width: '220px',
                  height: '220px',
                  background: 'rgba(108,99,255,0.2)',
                  filter: 'blur(80px)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[#6C63FF] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                WHY CHOOSE US
              </h4>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-12">
                Grow and succeed <br className="hidden md:block" /> with us
              </h2>
            </motion.div>

            <div className="space-y-10">
              {[
                { 
                  num: '01', 
                  title: 'Transparent & Hassle-Free Process', 
                  desc: 'Simple, reliable, and stress-free journey from training to job placement with complete transparency.' 
                },
                { 
                  num: '02', 
                  title: 'Affordable & Value-Driven Services', 
                  desc: 'Reasonable pricing with no hidden costs, ensuring maximum value for both candidates and employers.' 
                },
                { 
                  num: '03', 
                  title: 'End-to-End Training & Development', 
                  desc: 'Comprehensive training including IELTS, Spoken English, and soft skills to prepare for global careers.' 
                },
                { 
                  num: '04', 
                  title: 'Trusted Expertise Across India & Maldives', 
                  desc: 'Proven track record in connecting the right talent with top employers locally and internationally.' 
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="flex gap-6 group cursor-default"
                >
                  <span className="text-3xl md:text-4xl font-black text-[#6C63FF]/20 group-hover:text-[#6C63FF]/80 transition-colors duration-300 lining-nums">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#6C63FF] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-14"
            >
              <Link 
                to="/services"
                className="inline-flex items-center gap-3 bg-[#6C63FF] hover:bg-[#7c72ff] text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-xl shadow-purple-900/30 hover:-translate-y-1"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>
      
      {/* ── CONTACT SECTION ── */}
    </div>
  );
};

export default Home;
