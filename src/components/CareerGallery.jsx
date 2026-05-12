import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { supabase } from '../lib/supabase';
import bento1 from '../assets/images/bento1.jpg';
import bento2 from '../assets/images/bento2.jpg';
import bento3 from '../assets/images/bento3.jpg';
import bento4 from '../assets/images/bento4.jpg';
import bento5 from '../assets/images/bento5.jpg';
import bento6 from '../assets/images/bento6.jpg';
import bento7 from '../assets/images/bento7.jpg';

const defaultImages = [bento1, bento2, bento3, bento4, bento5, bento6, bento7];

export default function LShapeBentoGrid({ images: externalImages }) {
  const [images, setImages] = useState(() => {
    if (externalImages && externalImages.length > 0) {
      return externalImages.slice(0, 7).map((url, idx) => ({ id: idx, url, failed: false, isDb: false }));
    }
    return defaultImages.slice(0, 7).map((url, idx) => ({ id: idx, url, fallbackUrl: url, failed: false, isDb: false }));
  });
  const gridRef = useRef(null);

  useEffect(() => {
    async function fetchImages() {
      // If external images provided (legacy prop), use them
      if (externalImages && externalImages.length > 0) {
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .select('section, public_url')
          .like('section', 'bento%')
          .order('section');
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formatted = data.slice(0, 7).map((item, idx) => ({
            id: idx,
            section: item.section,
            url: item.public_url,
            fallbackUrl: defaultImages[idx] || defaultImages[0],
            failed: false,
            isDb: true
          }));
          // Pad with fallbacks if needed
          while (formatted.length < 7) {
            const idx = formatted.length;
            formatted.push({ id: idx, url: defaultImages[idx] || defaultImages[0], failed: false, isDb: false });
          }
          setImages(formatted);
        } else {
          throw new Error("No data returned");
        }
      } catch (err) {
        console.warn("Failed to fetch gallery images from Supabase, using fallbacks:", err);
        setImages(defaultImages.slice(0, 7).map((url, idx) => ({ id: idx, url, fallbackUrl: url, failed: false, isDb: false })));
      }
    }
    
    fetchImages();
  }, [externalImages]);

  // ── Image reveal observer ──────────────────────────────
  useEffect(() => {
    if (!gridRef.current) return;

    const revealEls = gridRef.current.querySelectorAll('.img-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, i * 150);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [images]); // re-run when images load

  const handleImageError = (id) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, failed: true } : img));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const validImages = images.filter(img => !img.failed);

  const getImageClass = (index) => {
    const layoutMap = [
      'col-span-1 row-span-2 md:col-span-1 md:row-span-2',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
      'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
      'col-span-2 row-span-1 md:col-span-2 md:row-span-1',
    ];
    return layoutMap[index] || 'col-span-1 row-span-1';
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-10 flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4 md:gap-5 grid-flow-dense"
        >
          {/* 1. Text Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            whileHover={{ scale: 1.02 }}
            className="col-span-2 row-span-1 bg-zinc-900 rounded-2xl flex items-center justify-center p-6 md:p-10 cursor-pointer shadow-xl border border-white/5"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-center md:text-left">
              THINK<br/>
              OUTSIDE<br/>
              THE BOX
            </h2>
          </motion.div>

          {/* Dynamic Images */}
          {validImages.length > 0 ? (
            validImages.map((img, index) => (
              <motion.div
                key={img.id}
                custom={index + 1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                className={`${getImageClass(index)} img-reveal rounded-2xl group cursor-pointer overflow-hidden`}
              >
                <OptimizedImage
                  src={img.url}
                  alt={`Gallery view ${index + 1}`}
                  fallbackSrc={img.fallbackUrl}
                  aspectRatio="auto"
                  wrapperClassName="w-full h-full"
                  className="image-bw group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  fadeIn={false}
                  onImageLoad={() => img.failed && handleImageError(img.id)}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 pointer-events-none rounded-2xl" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 md:col-span-4 row-span-1 bg-zinc-900 rounded-2xl flex justify-center items-center text-gray-500 text-lg">
              No images available
            </div>
          )}

          {/* 2. CTA Card */}
          <motion.div
            custom={validImages.length + 1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            className="col-span-1 row-span-1 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex flex-col items-center justify-center text-white cursor-pointer group shadow-xl"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
            <span className="text-base md:text-lg font-medium">Learn more</span>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
