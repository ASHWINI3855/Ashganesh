import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 relative z-10">
            Looking to hire or build <br className="hidden md:block" /> your career abroad?
          </h2>
          <p className="text-primary-light/80 text-xl mb-12 max-w-2xl mx-auto relative z-10">
            Join thousands of professionals and students who have successfully reached their global goals with Corner Stone.
          </p>
          <button className="bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-all shadow-2xl relative z-10 scale-100 hover:scale-105 active:scale-95">
            Get In Touch Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
