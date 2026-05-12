import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import OptimizedImage from './OptimizedImage';

const ImageCard = ({ image, index, className, isCTA }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" }
    }
  };

  if (isCTA) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animationVariants}
        className={cn(
          "bg-[#6C63FF] rounded-3xl p-8 flex flex-col justify-end cursor-pointer group hover:shadow-2xl hover:shadow-[#6C63FF]/20 transition-all duration-300 relative overflow-hidden aspect-[4/3]",
          className
        )}
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
        <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tighter z-10 relative group-hover:scale-105 transition-transform origin-bottom-left duration-300">
          Learn More
        </h3>
        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
          <ArrowUpRight className="text-white" size={28} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
      className={cn(
        "rounded-3xl overflow-hidden group bg-[#111111] relative shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[4/3]", 
        className
      )}
    >
      <OptimizedImage
        src={image}
        alt=""
        aspectRatio="auto"
        wrapperClassName="absolute inset-0"
        className="image-bw group-hover:scale-105 transition-transform duration-700 ease-out"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

export const ImageGrid = ({ images }) => {
  // Use exactly 5 images + 1 CTA card for a perfect 6-card symmetrical grid
  const displayImages = images.slice(0, 5);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {displayImages.map((img, idx) => (
          <ImageCard key={`img-${idx}`} image={img} index={idx} />
        ))}
        {/* CTA Card as the 6th item */}
        <ImageCard isCTA index={5} />
      </div>
    </div>
  );
};

export default ImageGrid;
