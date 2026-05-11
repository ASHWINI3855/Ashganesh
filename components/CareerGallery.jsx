import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';

const CareerGallery = () => {
  const navigate = useNavigate();

  const gridElements = [
    {
      type: 'image',
      url: img1,
      title: 'Think Outside the Box',
      height: 'tall' // Will be 2 rows
    },
    {
      type: 'cta',
      height: 'short' // Will be 1 row
    },
    {
      type: 'image',
      url: img2,
      title: 'Confidence Building',
      height: 'medium' // Will be 1.5 rows
    },
    {
      type: 'image',
      url: img3,
      title: 'Scale New Heights',
      height: 'tall' // Will be 2 rows
    },
    {
      type: 'image',
      url: img4,
      title: 'Trust & Partnerships',
      height: 'short' // Will be 1 row
    }
  ];

  const getHeightClass = (height) => {
    switch (height) {
      case 'short':
        return 'row-span-1';
      case 'medium':
        return 'row-span-2';
      case 'tall':
        return 'row-span-3';
      default:
        return 'row-span-1';
    }
  };

  return (
    <section className="w-full py-10 relative z-20 my-6">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">

        {/* Masonry/Pinterest Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[120px] md:auto-rows-[150px] pb-12">

          {gridElements.map((item, index) => {
            const heightClass = getHeightClass(item.height);

            // Render CTA Card
            if (item.type === 'cta') {
              return (
                <div
                  key={`cta-${index}`}
                  onClick={() => navigate('/services')}
                  className={`group relative overflow-hidden rounded-[20px] cursor-pointer bg-gradient-to-br from-[#0f5c53] to-[#0a4239] hover:from-[#137a6e] hover:to-[#0f5c53] transition-all duration-500 border border-teal-600/30 flex flex-col p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] ${heightClass}`}
                >
                  <div className="flex justify-between items-start w-full h-full">
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                        Learn<br />more
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 border border-white/20">
                      <ArrowUpRight className="text-white" size={18} />
                    </div>
                  </div>
                </div>
              );
            }

            // Render Image Card
            return (
              <div
                key={`img-${index}`}
                onClick={() => navigate('/services')}
                className={`group relative overflow-hidden rounded-[20px] cursor-pointer bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-[1.02] ${heightClass}`}
              >
                {/* Image with grayscale effect */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-4 md:p-6">
                  <span className="text-white font-bold text-sm md:text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerGallery;