import React from 'react';
import { Globe, Linkedin, Twitter } from 'lucide-react';

const Footer = () => (
  <footer id="contact" className="relative z-10 border-t border-purple-900/20 bg-[#060010] py-20 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
      {/* Brand */}
      <div className="max-w-sm">
        <div className="flex items-center gap-2.5 mb-7">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #a855f7)' }}
          >
            CS
          </div>
          <span className="font-extrabold text-lg text-white">Corner Stone</span>
        </div>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          Empowering individuals and businesses to reach their global potential through expert recruitment and education.
        </p>
        <div className="flex gap-3">
          {[Linkedin, Globe, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full bg-white/4 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-purple-500/40 hover:bg-purple-900/20 transition-all duration-300"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-16">
        <div>
          <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Services</h4>
          <ul className="space-y-3 text-sm text-white/40">
            {['Recruitment – Maldives', 'Study in Singapore', 'IELTS Prep', 'Career Counselling'].map(s => (
              <li key={s} className="hover:text-white transition-colors cursor-pointer">{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Contact</h4>
          <ul className="space-y-3 text-sm text-white/40">
            <li>hello@cornerstone.com</li>
            <li>+91 12345 67890</li>
            <li className="leading-relaxed max-w-[180px]">Global Business Park, Singapore</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-purple-900/15 flex flex-col md:flex-row justify-between items-center gap-4 text-white/25 text-xs">
      <p>© 2026 Corner Stone International. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
