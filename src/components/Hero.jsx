import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gray-50">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Top Recruitment & Training Partner
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
            Your <span className="text-primary italic">Career</span> <br /> 
            Partner 
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
            Connecting talent with global opportunities in recruitment and education. We bridge the gap between skill and success.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
              Contact Us
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-gray-500 font-medium">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" loading="lazy" decoding="async" width="40" height="40" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">
                +2k
              </div>
            </div>
            <span>Trusted by 2,000+ professionals</span>
          </div>
        </motion.div>

        {/* Visual Content (Wait for images or use placeholders) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1522071823957-0985705299ad?ixlib=rb-4.0.3&fit=crop&w=800&q=80"
              alt="Team of professionals collaborating in a modern office"
              priority={true}
              aspectRatio="4/3"
              objectFit="cover"
              sizes="(max-width: 1024px) 0px, 50vw"
              wrapperClassName="rounded-2xl"
            />
          </div>
          {/* Decorative Floaties */}
          <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute -top-10 -right-10 glass-morphism p-6 rounded-2xl shadow-xl z-20"
          >
            <div className="text-primary font-bold text-2xl">98%</div>
            <div className="text-gray-600 text-xs font-medium uppercase tracking-wider">Success Rate</div>
          </motion.div>
          
          <motion.div 
             animate={{ y: [0, 20, 0] }}
             transition={{ duration: 5, repeat: Infinity, delay: 1 }}
             className="absolute -bottom-10 -left-10 glass-morphism p-6 rounded-2xl shadow-xl z-20"
          >
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 leading-tight">Fast Hiring</div>
                  <div className="text-gray-500 text-xs">Process streamlined</div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
