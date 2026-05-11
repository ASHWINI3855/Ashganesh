import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BorderGlow = ({
  children,
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#060010',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  className = ''
}) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Check if mouse is near edges to activate the intense glow
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const isNearEdge = 
      x < edgeSensitivity || 
      x > rect.width - edgeSensitivity || 
      y < edgeSensitivity || 
      y > rect.height - edgeSensitivity;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        borderRadius,
        background: backgroundColor,
        padding: '1px' // This acts as the border width
      }}
    >
      {/* Animated base border color if requested */}
      {isHovered && animated && (
        <div className="absolute inset-[-50%] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent animate-spin-slow opacity-30 z-0" />
      )}

      {/* Main cursor-following glow effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        animate={{ opacity: isHovered ? glowIntensity : 0 }}
        style={{
          background: `radial-gradient(circle ${glowRadius * 2}px at ${mousePosition.x}px ${mousePosition.y}px, ${colors[0]}80, transparent)`,
          filter: `blur(${coneSpread / 2}px)`,
        }}
      />

      <motion.div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
        animate={{ opacity: isHovered ? glowIntensity : 0 }}
        style={{
          background: `radial-gradient(circle ${glowRadius}px at ${mousePosition.x}px ${mousePosition.y}px, ${colors[1]}, transparent)`,
          filter: `blur(${coneSpread}px)`,
        }}
      />

      {/* Inner background layer directly covering the glow leaving only the 1px edge revealed */}
      <div
        className="relative z-10 w-full h-full"
        style={{
          borderRadius: borderRadius - 1,
          background: backgroundColor
        }}
      >
        {children}
      </div>
      
      {/* Background radial glow that follows the cursor inside the card for premium feel */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 rounded-[inherit]"
        animate={{ opacity: isHovered ? glowIntensity * 0.15 : 0 }}
        style={{
          background: `radial-gradient(circle ${glowRadius * 2.5}px at ${mousePosition.x}px ${mousePosition.y}px, rgb(${glowColor.split(' ').join(',')}), transparent)`,
          borderRadius: borderRadius - 1,
        }}
      />
    </div>
  );
};

export default BorderGlow;
