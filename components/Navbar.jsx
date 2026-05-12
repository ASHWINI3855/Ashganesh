import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/#contact', skipActive: true },
  ];

  const handleNavClick = (e, item) => {
    if (item.path.includes('#')) {
      e.preventDefault();
      const id = item.path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-10',
        isScrolled
          ? 'bg-[#060010]/85 backdrop-blur-2xl py-4 border-b border-purple-900/30 shadow-lg shadow-black/40'
          : 'bg-transparent py-7'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition-transform duration-300"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #a855f7)' }}
          >
            CS
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            The Corner Stone Groups
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "relative text-sm font-medium transition-colors duration-300 py-1",
                location.pathname === item.path && !item.skipActive
                  ? "text-[#6C63FF]" 
                  : "text-white/55 hover:text-white"
              )}
            >
              {item.name}
              {location.pathname === item.path && !item.skipActive && (
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#6C63FF] rounded-full" />
              )}
            </Link>
          ))}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, { path: '/#contact' })}
            className="ml-4 bg-[#6C63FF] hover:bg-[#7c72ff] text-white px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-purple-900/30 hover:-translate-y-0.5 inline-block"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#060010] z-[55] flex flex-col px-8 pt-32 pb-12">
          <div className="flex flex-col gap-8 relative z-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "text-4xl font-black transition-colors duration-300",
                  location.pathname === item.path && !item.skipActive
                    ? "text-[#6C63FF]"
                    : "text-white/30 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="/#contact"
              onClick={(e) => handleNavClick(e, { path: '/#contact' })}
              className="mt-4 bg-[#6C63FF] text-white py-4 rounded-2xl font-bold text-lg text-center inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
