import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SupabaseImage from './SupabaseImage';
import OptimizedImage from './OptimizedImage';

const initialGallerySlots = [
  // Top Row (2 columns)
  {
    id: 1,
    type: 'image',
    src: '/images/trust.jpg',
    className: 'md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto'
  },
  {
    id: 2,
    type: 'image',
    src: '/images/grads.jpg',
    className: 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto'
  },
  // Middle Row (panoramic + portrait)
  {
    id: 3,
    type: 'image',
    src: '/images/custom-3.jpg',
    className: 'md:col-span-2 md:row-span-1 aspect-[21/9] md:aspect-auto'
  },
  {
    id: 4,
    type: 'image',
    src: '/images/tips.jpg',
    className: 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto'
  },
  // Bottom Row (Learn More card + 1 small image)
  {
    id: 5,
    type: 'card', // Learn More Card
    className: 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto'
  },
  {
    id: 6,
    type: 'image',
    src: '/images/study-abroad.jpg',
    className: 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const MasonryGallery = () => {
  const navigate = useNavigate();
  const [gallerySlots, setGallerySlots] = useState(initialGallerySlots);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .select('section, public_url')
          .like('section', 'masonry%')
          .order('section');

        if (error) throw error;
        
        if (data && data.length > 0) {
          // Re-map images based on data
          // Assuming data length covers all image slots
          let dataIndex = 0;
          setGallerySlots(prev => prev.map(slot => {
            if (slot.type === 'image' && data[dataIndex]) {
              const item = data[dataIndex++];
              return {
                ...slot,
                isDb: true,
                section: item.section,
                fallbackSrc: slot.src,
                alt: `Gallery Image ${slot.id}`
              };
            }
            return slot;
          }));
        }
      } catch (err) {
        console.warn("Failed to fetch masonry images from Supabase:", err);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="w-full bg-[#f5f5f5] py-20 px-4 md:px-8 lg:px-12 rounded-[40px] shadow-2xl relative z-20 my-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Gallery Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Visual Discovery
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Explore our dynamic masonry grid.</p>
        </div>

        {/* Z-Pattern Masonry Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-5"
        >
          {gallerySlots.map((slot) => {
            
            if (slot.type === 'card') {
              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => navigate('/services')}
                  className={`relative group overflow-hidden rounded-[16px] flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${slot.className}`}
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #f97316 100%)' // Teal to Orange
                  }}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                  <h3 className="text-white font-bold text-2xl tracking-tight mb-3">
                    Learn More
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-[#f97316] transition-all duration-300 shadow-lg">
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative group overflow-hidden rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-500 hover:z-10 bg-gray-200 ${slot.className}`}
              >
                {slot.isDb ? (
                  <SupabaseImage
                    section={slot.section}
                    fallbackSrc={slot.fallbackSrc}
                    alt={slot.alt || `Gallery Image ${slot.id}`}
                    aspectRatio="auto"
                    wrapperClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <OptimizedImage
                    src={slot.src}
                    alt={`Gallery Image ${slot.id}`}
                    aspectRatio="auto"
                    wrapperClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
};

export default MasonryGallery;
