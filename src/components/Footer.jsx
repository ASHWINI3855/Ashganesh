import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16 md:py-20 px-6 md:px-20 font-inter border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
        
        {/* Left: Brand */}
        <div>
          <p className="text-3xl md:text-4xl font-extrabold leading-[1.15] tracking-tighter mb-0">
            Your business<br />
            solution agency.
          </p>
        </div>

        {/* Middle: Address */}
        <div>
          <h4 className="text-[15px] font-bold uppercase tracking-wider mb-4">Address</h4>
          <p className="text-[#9a9a9a] text-sm leading-relaxed font-medium">
            No: 45F Pandian Complex,<br />
            Bryant Nagar 7th Street Middle,<br />
            Tuticorin, Tamil Nadu, India.
          </p>
          <p className="text-[#7a7a7a] text-[13px] mt-4 font-medium italic">
            A. Nallasivan — Proprietor
          </p>
        </div>

        {/* Right: Contact */}
        <div className="space-y-6">
          <div>
            <h4 className="text-[15px] font-bold uppercase tracking-wider mb-4">Say Hello</h4>
            <a 
              href="mailto:info@thecornerstonegroups.in" 
              className="text-[#9a9a9a] text-sm hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white"
            >
              info@thecornerstonegroups.in
            </a>
          </div>

          <div>
            <h4 className="text-[15px] font-bold uppercase tracking-wider mb-3">Call Us</h4>
            <div className="flex flex-col gap-2">
              <a href="tel:+916381951152" className="text-white text-sm font-bold hover:text-purple-400 transition-colors uppercase tracking-tight">
                +91 63819 51152
              </a>
              <a href="tel:+919345818578" className="text-white text-sm font-bold hover:text-purple-400 transition-colors uppercase tracking-tight">
                +91 93458 18578
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Copyright bar - keeping it minimal */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[#5a5a5a] text-[11px] font-bold uppercase tracking-[0.2em]">
        <p>© 2026 THE CORNER STONES. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
