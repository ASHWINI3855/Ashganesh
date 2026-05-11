import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="contact" className="bg-[#0f0f0f] text-white py-24 md:py-32 px-6 md:px-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32 items-start relative z-10"
      >
        
        {/* LEFT SIDE: Identity */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tighter">
              Your business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                solution agency.
              </span>
            </h2>
          </div>
          
          <p className="text-gray-400 text-lg max-w-sm leading-relaxed font-light">
            We deliver excellence across borders. Get in touch with our team to explore tailored solutions for your professional growth.
          </p>
        </motion.div>

        {/* RIGHT SIDE: Contact Details */}
        <div className="grid gap-10">
          
          {/* ADDRESS ITEM */}
          <motion.div variants={itemVariants} className="group flex gap-8">
            <div className="flex-none w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/10 transition-all duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Address</h3>
              <p className="text-lg text-white font-medium">
                No: 45F Pandian Complex Bryant Nagar <br />
                7th Street Middle, Tuticorin, <br />
                Tamil Nadu, India
              </p>
            </div>
          </motion.div>

          {/* EMAIL & PHONE GRID */}
          <div className="grid sm:grid-cols-2 gap-10">
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Say Hello</h3>
              <a href="mailto:info@thecornerstonegroups.in" className="block text-white hover:text-purple-400 transition-colors font-medium border-b border-white/10 inline-block">
                info@thecornerstonegroups.in
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Call Us</h3>
              <div className="flex flex-col gap-1">
                <a href="tel:+916381951152" className="text-white hover:text-purple-400 transition-colors font-medium">+91 63819 51152</a>
                <a href="tel:+919345818578" className="text-white hover:text-purple-400 transition-colors font-medium">+91 93458 18578</a>
              </div>
            </motion.div>
          </div>

        </div>

      </motion.div>
      
      {/* Map Section - Below Details, Small and Clean */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto mt-16 relative z-10"
      >
        <div className="w-full h-[320px] rounded-[30px] overflow-hidden border border-white/5 shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps?q=8.7901876,78.133163&z=17&output=embed"
            className="w-full h-full border-0 grayscale invert opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </motion.div>

      {/* Subtle particle effect or glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </section>
  );
}
