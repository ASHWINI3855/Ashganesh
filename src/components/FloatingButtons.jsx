import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/916381951152"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#0d0022] border border-purple-900/40 flex items-center justify-center hover:border-purple-500/60 hover:bg-purple-900/20 transition-all duration-300 shadow-lg backdrop-blur-md group"
        title="WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/60 group-hover:text-white transition-colors">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.117 1.522 5.845L.057 23.943l6.304-1.654A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.789 9.789 0 01-5.006-1.372l-.359-.215-3.722.977.994-3.63-.234-.373A9.821 9.821 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" fill="currentColor"/>
        </svg>
      </a>

      {/* Scroll To Top */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-[#6C63FF] flex items-center justify-center hover:bg-[#7c72ff] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-purple-900/40"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="text-white" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
