import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import OptimizedImage from './OptimizedImage';
import maldivesImgFallback from '../assets/images/maldives_recruitment.jpg';
import singaporeImgFallback from '../assets/images/singapore_study.jpg';

const homeServicesData = [
  {
    id: 'maldives',
    fallbackImage: maldivesImgFallback,
    section: 'maldives',
    accent: '#6C63FF',
    preview: {
      title: 'Career in Maldives',
      lines: [
        { label: 'Industries', value: 'Hotels, Resorts, Supermarkets, Healthcare, Construction, IT' },
        { label: 'Roles', value: 'Accountants, HR, IT, Front Office, Engineers' }
      ]
    },
    fullDetails: (
      <div className="text-white text-base leading-relaxed tracking-wide">
        <p className="font-bold mb-1">Industries like:</p>
        <p className="opacity-80 mb-6">Hotel, Resorts, Supermarkets, Health Care, Manufacturing, Civil Construction and more</p>

        <p className="font-bold mb-1">Leading white-collar recruitment for Maldives in:</p>
        <p className="opacity-80 mb-6">Resorts, supermarkets, construction, logistics, airports, and IT.</p>

        <p className="font-bold mb-1">Sourcing top talent like:</p>
        <p className="opacity-80 mb-8">Accountants, HR managers, IT professionals, receptionists, front office executives, civil engineers, and cashiers.</p>

        <h4 className="font-bold text-xl mb-6 tracking-wide text-[#6C63FF]">Key Domains &amp; Job Roles</h4>

        <p className="font-bold mb-2">Resorts / Hotels / Guest House:</p>
        <div className="mb-6 opacity-80">
          Front office executives<br/>
          Receptionists<br/>
          HR coordinators<br/>
          Managers
        </div>

        <p className="font-bold mb-2">Retail / Supermarkets:</p>
        <div className="mb-6 opacity-80">
          Cashiers<br/>
          Accountants<br/>
          Inventory supervisors
        </div>

        <p className="font-bold mb-2">Construction / Engineering:</p>
        <div className="mb-6 opacity-80">
          Civil engineers<br/>
          Project coordinators<br/>
          Site supervisors
        </div>

        <p className="font-bold mb-2">Logistics / Airport / IT:</p>
        <div className="opacity-80">
          Logistics managers<br/>
          IT specialists<br/>
          Airport operations staff
        </div>
      </div>
    )
  },
  {
    id: 'singapore',
    fallbackImage: singaporeImgFallback,
    section: 'singapore',
    accent: '#a855f7',
    preview: {
      title: 'Study in Singapore',
      points: [
        'Admission + Visa Support',
        'Study + Paid Internship',
        'Earn while learning'
      ]
    },
    fullDetails: (
      <div className="text-white text-base leading-relaxed tracking-wide">
        <h3 className="font-bold text-xl mb-4 text-[#a855f7]">STUDY IN SINGAPORE</h3>
        <p className="opacity-80 mb-8">
          We support students through every step of the admission process, visa, and ensure a smooth onboarding experience.
        </p>

        <h4 className="font-bold text-xl mb-4 text-[#a855f7]">COURSES OFFERED</h4>
        <div className="opacity-80 mb-8">
          Diploma in Hospitality Management<br/>
          Diploma in Logistics and Supply Chain<br/>
          Diploma in Business (IT)<br/>
          Diploma in Baking Technology<br/>
          Diploma in Patisserie and Baking<br/>
          Diploma in Food and Beverage Operations<br/>
          Higher Diploma in Hospitality Management<br/>
          Higher Diploma in Hospitality and Tourism<br/>
          PG Diploma in Management<br/>
          PG Diploma in Hospitality Operations
        </div>

        <h4 className="font-bold text-xl mb-4 text-[#a855f7]">STUDY AND EARN IN SINGAPORE</h4>
        <div className="opacity-80 mb-8">
          Course Duration: 6 months<br/>
          6 months of Paid Internship<br/>
          Earn ₹70,000 to ₹90,000 per month
        </div>

        <p className="font-bold mb-1">NOTE:</p>
        <p className="opacity-80">
          No service charge. Pay directly to the college.
        </p>
      </div>
    )
  }
];

const HomeServices = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [servicesData, setServicesData] = useState(homeServicesData);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .select('section, public_url')
          .in('section', ['maldives', 'singapore']);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setServicesData(prev => prev.map(service => {
            const dbImg = data.find(item => item.section === service.section);
            if (dbImg && dbImg.public_url) {
              return { ...service, imageUrl: dbImg.public_url };
            }
            return service;
          }));
        }
      } catch (err) {
        console.warn("Failed to fetch service images from Supabase:", err);
      }
    }
    fetchImages();
  }, []);

  const handleCardClick = (id) => {
    // Determine if we are on a touch device / mobile
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 1024) {
      setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto px-6" style={{ perspective: '1000px' }}>
        {servicesData.map((service, idx) => (
          <div 
            key={idx} 
            className="group relative w-full h-[400px] md:h-[450px] cursor-pointer block" 
            style={{ perspective: '1000px' }}
            onClick={() => handleCardClick(service.id)}
          >
            <div 
              className="relative w-full h-full transition-transform duration-[0.6s]" 
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: 'rotateY(0deg)', // Initial State
              }}
            >
              {/* @media (hover: hover) ensures that desktop gets hover flips, but mobile doesn't trigger sticky hovers */}
              <style>{`
                @media (hover: hover) {
                  .group:hover .flip-container-${service.id} { transform: rotateY(180deg); }
                }
                .flipped-${service.id} { transform: rotateY(180deg) !important; }
              `}</style>
              <div 
                className={`flip-container-${service.id} ${flippedCards[service.id] ? 'flipped-' + service.id : ''} absolute w-full h-full transition-transform duration-[0.6s]`}
                style={{ transformStyle: 'preserve-3d'}}
              >
                {/* FRONT SIDE */}
                <div 
                  className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#333]" 
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <OptimizedImage
                    src={service.imageUrl || service.fallbackImage}
                    fallbackSrc={service.fallbackImage}
                    alt={service.preview.title}
                    aspectRatio="auto"
                    wrapperClassName="w-full h-full"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* BACK SIDE */}
                <div 
                  className="absolute w-full h-full rounded-2xl bg-[#0d051a] border border-[#333] p-8 md:p-10 flex flex-col justify-center items-center text-center shadow-2xl" 
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)' 
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-widest text-[#6C63FF]">
                    {service.preview.title}
                  </h3>
                  
                  <div className="text-gray-300 text-sm md:text-base space-y-4 mb-8">
                    {service.preview.lines && service.preview.lines.map((line, i) => (
                      <p key={i}>
                        <span className="font-bold text-white">{line.label}:</span> {line.value}
                      </p>
                    ))}
                    {service.preview.points && service.preview.points.map((pt, i) => (
                      <p key={i}>✓ {pt}</p>
                    ))}
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card flip
                      setActiveModal(service);
                    }}
                    className="px-8 py-3 rounded-full font-bold text-sm tracking-widest transition-transform hover:scale-105"
                    style={{ background: service.accent, color: '#fff', boxShadow: `0 8px 24px ${service.accent}44` }}
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL DETAILS MODAL */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col sm:items-center sm:justify-center p-0 sm:p-6 justify-end"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#0a0018] border border-[#333] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col mt-auto sm:mt-0"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 md:p-6 border-b border-[#333] bg-[#060010]">
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider" style={{ color: activeModal.accent }}>
                  {activeModal.preview.title}
                </h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#333]/30 hover:bg-[#333] transition-colors text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0a0018] to-[#060010]">
                {activeModal.fullDetails}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeServices;
