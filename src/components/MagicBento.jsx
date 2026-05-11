import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import gsap from 'gsap';

// ─── Particle System ──────────────────────────────────────────────────────────
const StarParticle = ({ x, y, color = '132, 0, 255' }) => {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    background: `rgba(${color}, 0.9)`,
  };
  return <div className="star-particle" style={style} />;
};

// ─── Ripple System ────────────────────────────────────────────────────────────
const Ripple = ({ x, y, size = 40 }) => {
  const style = {
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
  };
  return <div className="ripple-effect" style={style} />;
};

// ─── MagicBentoCard ───────────────────────────────────────────────────────────
const MagicBentoCard = ({
  className,
  image,
  title,
  description,
  isCTA = false,
  spotlightRadius = 400,
  glowColor = '132, 0, 255',
  particleCount = 12,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  clickEffect = true,
  cardIndex = 0,
}) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const particleTimerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightBg = useMotionTemplate`radial-gradient(
    ${spotlightRadius}px circle at ${mouseX}px ${mouseY}px,
    rgba(${glowColor}, 0.12),
    transparent 80%
  )`;

  const borderGlow = useMotionTemplate`radial-gradient(
    200px circle at ${mouseX}px ${mouseY}px,
    rgba(${glowColor}, 0.6),
    transparent 80%
  )`;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const localX = e.clientX - left;
    const localY = e.clientY - top;
    mouseX.set(localX);
    mouseY.set(localY);
  }, [mouseX, mouseY]);

  // GSAP-powered lift on hover
  useEffect(() => {
    if (!cardRef.current) return;
    if (hovered) {
      gsap.to(cardRef.current, {
        y: -8,
        scale: 1.01,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [hovered]);

  // Particle generator on hover
  useEffect(() => {
    if (!enableStars) return;
    if (hovered) {
      particleTimerRef.current = setInterval(() => {
        const card = cardRef.current;
        if (!card) return;
        const { width, height } = card.getBoundingClientRect();
        const newParticles = Array.from({ length: 2 }, () => ({
          id: Math.random(),
          x: Math.random() * (width - 20),
          y: Math.random() * height,
        }));
        setParticles(prev => [...prev.slice(-particleCount), ...newParticles]);
        setTimeout(() => {
          setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
        }, 1200);
      }, 180);
    } else {
      clearInterval(particleTimerRef.current);
    }
    return () => clearInterval(particleTimerRef.current);
  }, [hovered, enableStars, particleCount]);

  // Click ripple
  const handleClick = useCallback((e) => {
    if (!clickEffect || !cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const newRipple = {
      id: Math.random(),
      x: e.clientX - left,
      y: e.clientY - top,
    };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 700);
  }, [clickEffect]);

  const sharedProps = {
    ref: cardRef,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: handleClick,
  };

  // ── CTA Card ────────────────────────────────────────
  if (isCTA) {
    return (
      <div
        {...sharedProps}
        className={cn(
          'relative overflow-hidden group cursor-pointer h-full',
          className
        )}
        style={{
          background: `linear-gradient(135deg, rgba(${glowColor}, 0.7) 0%, rgba(80, 0, 180, 0.9) 100%)`,
        }}
      >
        {/* Border Glow */}
        {enableBorderGlow && (
          <motion.div
            className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: borderGlow, zIndex: 1 }}
          />
        )}

        {/* Inner */}
        <div className="absolute inset-[1px] rounded-[inherit] overflow-hidden"
          style={{ background: `linear-gradient(135deg, rgba(${glowColor}, 0.65) 0%, rgba(50, 0, 140, 0.92) 100%)` }}>
          {/* Spotlight */}
          {enableSpotlight && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: spotlightBg }}
            />
          )}

          {/* Ripples */}
          {ripples.map(r => <Ripple key={r.id} x={r.x} y={r.y} />)}

          {/* Particles */}
          {particles.map(p => (
            <StarParticle key={p.id} x={p.x} y={p.y} color="255, 255, 255" />
          ))}

          {/* Content */}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
            <motion.div
              animate={hovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
              className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 self-end"
            >
              <ArrowUpRight className="text-white" size={28} />
            </motion.div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-3">
                LEARN<br />MORE
              </h3>
              <p className="text-white/75 text-sm font-medium">
                Discover how we empower careers worldwide.
              </p>
            </div>
          </div>

          {/* Decorative orb */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-3xl"
            style={{ background: `rgba(${glowColor}, 0.25)` }} />
        </div>
      </div>
    );
  }

  // ── Image Card ───────────────────────────────────────
  return (
    <div
      {...sharedProps}
      className={cn(
        'relative overflow-hidden group cursor-pointer h-full',
        className
      )}
      style={{ background: '#0d0020' }}
    >
      {/* Border Glow */}
      {enableBorderGlow && (
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: borderGlow, zIndex: 1 }}
        />
      )}

      {/* Inner container */}
      <div className="absolute inset-[1px] rounded-[inherit] overflow-hidden bg-[#0a0018]">
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover image-bw group-hover:scale-110 transition-transform duration-[900ms] ease-out"
          />
        </div>

        {/* Very light dark vignette at bottom for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Spotlight */}
        {enableSpotlight && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Ripples */}
        {ripples.map(r => <Ripple key={r.id} x={r.x} y={r.y} />)}

        {/* Particles */}
        {particles.map(p => (
          <StarParticle key={p.id} x={p.x} y={p.y} color={glowColor} />
        ))}
      </div>
    </div>
  );
};

// ─── MagicBento Grid ─────────────────────────────────────────────────────────
export const MagicBento = ({
  cards = [],
  glowColor = '132, 0, 255',
  spotlightRadius = 400,
  particleCount = 12,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  clickEffect = true,
}) => {
  const sharedProps = { glowColor, spotlightRadius, particleCount, enableStars, enableSpotlight, enableBorderGlow, clickEffect };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 w-full"
      style={{ gridTemplateRows: 'auto' }}>

      {/* 1 — Wide landscape top-left (col 1-8, row 1) */}
      <div className="md:col-span-8" style={{ minHeight: '320px' }}>
        <MagicBentoCard
          {...sharedProps}
          {...cards[0]}
          cardIndex={0}
          className="rounded-3xl card-enter"
          style={{ animationDelay: '0ms' }}
        />
      </div>

      {/* 2 — Tall portrait top-right (col 9-12, rows 1-2) */}
      <div className="md:col-span-4 md:row-span-2" style={{ minHeight: '660px' }}>
        <MagicBentoCard
          {...sharedProps}
          {...cards[1]}
          cardIndex={1}
          className="rounded-3xl card-enter h-full"
          style={{ animationDelay: '100ms' }}
        />
      </div>

      {/* 3 — Small square (col 1-4, row 2) */}
      <div className="md:col-span-4" style={{ minHeight: '320px' }}>
        <MagicBentoCard
          {...sharedProps}
          {...cards[2]}
          cardIndex={2}
          className="rounded-3xl card-enter"
          style={{ animationDelay: '200ms' }}
        />
      </div>

      {/* 4 — CTA purple (col 5-8, row 2) */}
      <div className="md:col-span-4" style={{ minHeight: '320px' }}>
        <MagicBentoCard
          {...sharedProps}
          isCTA
          cardIndex={3}
          className="rounded-3xl card-enter"
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {/* 5 — Wide bottom left (col 1-8, row 3) */}
      <div className="md:col-span-8" style={{ minHeight: '320px' }}>
        <MagicBentoCard
          {...sharedProps}
          {...cards[3]}
          cardIndex={4}
          className="rounded-3xl card-enter"
          style={{ animationDelay: '400ms' }}
        />
      </div>

      {/* 6 — Square bottom right (col 9-12, row 3) */}
      <div className="md:col-span-4" style={{ minHeight: '320px' }}>
        <MagicBentoCard
          {...sharedProps}
          {...cards[4]}
          cardIndex={5}
          className="rounded-3xl card-enter"
          style={{ animationDelay: '500ms' }}
        />
      </div>
    </div>
  );
};

export default MagicBento;
