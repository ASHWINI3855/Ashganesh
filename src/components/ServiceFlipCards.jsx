import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Mic, Brain, Plane, GraduationCap, ArrowRight, X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import maldivesImg from '../assets/images/maldives_recruitment.jpg';
import singaporeImg from '../assets/images/singapore_study.jpg';
import ieltsImg from '../../public/images/study-abroad.jpg';
import spokenImg from '../../public/images/recruitment-1.jpg';
import softSkillsImg from '../../public/images/soft-skills.jpg';

/* ─────────────────────────────────────────────────────────────
   GlareHover — mouse-position radial glare, rAF-throttled
───────────────────────────────────────────────────────────── */
function GlareHover({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.22,
  glareSize = 280,
  transitionDuration = 750,
  style = {},
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const [pos, setPos] = useState({ x: -200, y: -200, visible: false });

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    });
  }, []);

  const onLeave = useCallback(() => {
    setPos((p) => ({ ...p, visible: false }));
  }, []);

  /* parse hex → rgba */
  const toRgba = (hex, a) => {
    const h = hex.replace('#', '');
    const full = h.length === 3
      ? h.split('').map((c) => c + c).join('')
      : h;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <div
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          transition: `opacity ${transitionDuration}ms ease`,
          opacity: pos.visible ? 1 : 0,
          background: `radial-gradient(circle ${glareSize}px at ${pos.x}px ${pos.y}px,
            ${toRgba(glareColor, glareOpacity)} 0%,
            transparent 65%)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Service data — 5 uniform entries
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'maldives',
    icon: <Plane size={24} />,
    title: 'Career in Maldives',
    tagline: 'International Placement',
    description:
      'We connect skilled professionals with top employers across Maldives — Hotels, Resorts, Healthcare, Construction and more — with end-to-end support.',
    accent: '#6C63FF',
    accentB: '#a855f7',
    folder: 'service-1',
    fallbackSrc: maldivesImg,
    modal: {
      title: 'Career in Maldives',
      intro: 'Leading white-collar recruitment for Maldives across resorts, supermarkets, construction, logistics, airports and IT.',
      description: 'We source accountants, HR managers, IT professionals, receptionists, front-office executives, civil engineers and cashiers.',
      sections: [
        {
          heading: 'Industries We Serve',
          items: ['Hotels & Luxury Resorts', 'Supermarkets & Retail', 'Healthcare & Medical', 'Civil Construction', 'Manufacturing', 'Logistics & Airports'],
        },
        {
          heading: 'Key Job Roles',
          items: [
            'Front office, Receptionists, HR coordinators, Managers',
            'Cashiers, Accountants, Inventory supervisors',
            'Civil engineers, Project coordinators, Site supervisors',
            'IT specialists, Logistics managers, Airport staff',
          ],
        },
      ],
    },
  },
  {
    id: 'singapore',
    icon: <GraduationCap size={24} />,
    title: 'Study in Singapore',
    tagline: 'Study & Earn',
    description:
      'Top diploma programs with full admission support, visa assistance and a paid internship — earn ₹70K–₹90K/month while you study.',
    accent: '#a855f7',
    accentB: '#ec4899',
    folder: 'service-2',
    fallbackSrc: singaporeImg,
    modal: {
      title: 'Study in Singapore',
      intro: 'Full student support from admission to onboarding, visa included.',
      specialNote: 'Study & Earn Program',
      earnings: [
        { label: 'Course Duration', value: '6 Months' },
        { label: 'Paid Internship', value: '6 Months' },
        { label: 'Stipend', value: '₹70,000 – ₹90,000 / month' },
      ],
      feesNote: 'No service charge — pay directly to the college.',
      sections: [
        {
          heading: 'Courses Offered',
          items: [
            'Diploma in Hospitality Management',
            'Diploma in Logistics and Supply Chain',
            'Diploma in Business (IT)',
            'Diploma in Baking Technology / Patisserie',
            'Diploma in Food and Beverage Operations',
            'Higher Diploma in Hospitality & Tourism',
            'PG Diploma in Management / Hospitality',
          ],
        },
      ],
    },
  },
  {
    id: 'ielts',
    icon: <BookOpen size={24} />,
    title: 'IELTS Coaching',
    tagline: 'Band Score',
    description:
      'Expert coaching for every IELTS section — Listening, Reading, Writing and Speaking — with full mock tests and personalised score tracking.',
    accent: '#0ea5e9',
    accentB: '#6C63FF',
    folder: 'service-3',
    fallbackSrc: ieltsImg,
    modal: {
      title: 'IELTS Coaching',
      intro: 'Structured modules tailored to achieve your target band score.',
      description: 'We cover all four skills with real exam audio, timed drills, writing feedback and live speaking practice.',
      sections: [
        {
          heading: 'What We Offer',
          items: [
            'Listening practice with real exam audio',
            'Reading speed & comprehension drills',
            'Writing Task 1 & 2 structured feedback',
            'Speaking LIVE practice with certified trainers',
            'Full-length mock tests & score analysis',
          ],
        },
      ],
    },
  },
  {
    id: 'spoken',
    icon: <Mic size={24} />,
    title: 'Spoken English',
    tagline: 'Fluency First',
    description:
      'Immersive, interactive classes built to sharpen fluency, accuracy and professional communication — essential for a global career.',
    accent: '#f59e0b',
    accentB: '#ef4444',
    folder: 'service-4',
    fallbackSrc: spokenImg,
    modal: {
      title: 'Spoken English',
      intro: 'Build real-world confidence through structured conversational practice.',
      description: 'From phonetics to professional vocabulary, every session makes English second nature.',
      sections: [
        {
          heading: 'Program Highlights',
          items: [
            'Phonetics & pronunciation correction',
            'Business English communication',
            'Group discussion & debate sessions',
            'Interview preparation module',
            'Accent neutralisation practice',
          ],
        },
      ],
    },
  },
  {
    id: 'softskills',
    icon: <Brain size={24} />,
    title: 'Soft Skill Training',
    tagline: 'Leadership',
    description:
      'Holistic development of interpersonal skills, leadership and adaptability — built for immediate impact in any global workplace.',
    accent: '#10b981',
    accentB: '#0ea5e9',
    folder: 'service-5',
    fallbackSrc: softSkillsImg,
    modal: {
      title: 'Soft Skill Training',
      intro: 'Develop the full spectrum of professional skills employers value most.',
      description: 'Practical workshops on leadership, teamwork, conflict resolution, time management and emotional intelligence.',
      sections: [
        {
          heading: 'Core Modules',
          items: [
            'Leadership & decision making',
            'Team dynamics & collaboration',
            'Problem solving & critical thinking',
            'Time management & productivity',
            'Emotional intelligence & empathy',
            'Professional etiquette & grooming',
          ],
        },
      ],
    },
  },
];

/* ─────────────────────────────────────────────────────────────
   ServiceCard — uniform card for all 5 services
───────────────────────────────────────────────────────────── */
function ServiceCard({ service, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.22}
        glareSize={280}
        transitionDuration={700}
        style={{ borderRadius: 20, height: '100%' }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setTimeout(() => setHovered(false), 900)}
          onClick={() => onOpen(service)}
          style={{
            height: '100%',
            borderRadius: 20,
            padding: '2rem',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: hovered
              ? `1px solid ${service.accent}66`
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: hovered
              ? `0 0 0 1px ${service.accent}22, 0 20px 60px ${service.accent}25`
              : '0 4px 24px rgba(0,0,0,0.28)',
            cursor: 'pointer',
            transition: 'border 0.35s ease, box-shadow 0.35s ease',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Top image section */}
          <div style={{
            height: 140,
            width: 'calc(100% + 4rem)',
            margin: '-2rem -2rem 1rem -2rem',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src={service.imageUrl || service.fallbackSrc} 
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
              loading="lazy"
              onError={(e) => { e.target.src = service.fallbackSrc; }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, transparent, rgba(6,0,16,0.8))`,
            }} />
          </div>

          {/* Top accent stripe */}
          <div style={{
            position: 'absolute',
            top: 140, left: 0, right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${service.accent}, ${service.accentB})`,
            opacity: hovered ? 1 : 0.35,
            transition: 'opacity 0.35s ease',
          }} />

          {/* Icon */}
          <div style={{
            width: 50, height: 50,
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${service.accent}22, ${service.accentB}11)`,
            border: `1px solid ${service.accent}33`,
            color: service.accent,
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)',
            flexShrink: 0,
          }}>
            {service.icon}
          </div>

          {/* Tag */}
          <span style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: service.accent,
          }}>
            {service.tagline}
          </span>

          {/* Title */}
          <h3 style={{
            fontSize: '1.2rem', fontWeight: 800,
            color: '#fff', lineHeight: 1.3, margin: 0,
          }}>
            {service.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75,
            margin: 0,
            flex: 1,
          }}>
            {service.description}
          </p>

          {/* CTA */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.55, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'transparent',
              border: `1px solid ${service.accent}55`,
              color: service.accent,
              padding: '0.45rem 1.1rem',
              borderRadius: 50,
              fontWeight: 700, fontSize: '0.78rem',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${service.accent}18`;
                e.currentTarget.style.borderColor = `${service.accent}99`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = `${service.accent}55`;
              }}
            >
              Learn More <ArrowRight size={13} />
            </button>
          </motion.div>
        </motion.div>
      </GlareHover>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal
───────────────────────────────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  if (!service) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(6px)',
          zIndex: 100,
        }}
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 sm:inset-0 sm:m-auto z-[101] w-full sm:w-[90%] sm:max-w-[720px] h-[88vh] sm:h-fit sm:max-h-[88vh] bg-gradient-to-br from-[#0d0520] to-[#060010] shadow-2xl rounded-t-3xl sm:rounded-3xl border-t sm:border border-[#333] flex flex-col overflow-hidden"
        style={{
          borderColor: `${service.accent}44`,
          boxShadow: `0 40px 100px ${service.accent}22`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.75rem 2.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.02)',
          flexShrink: 0,
          gap: '1rem',
        }}>
          <div>
            <div style={{
              height: 3, width: 40, borderRadius: 99,
              background: `linear-gradient(90deg, ${service.accent}, ${service.accentB})`,
              marginBottom: 10,
            }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {service.modal.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="custom-scrollbar p-6 sm:p-8 overflow-y-auto flex-1">
          <p style={{ color: service.accent, fontSize: '1rem', fontWeight: 700, lineHeight: 1.7, marginBottom: '0.85rem' }}>
            {service.modal.intro}
          </p>
          {service.modal.description && (
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
              {service.modal.description}
            </p>
          )}

          {/* Study & Earn stats */}
          {service.modal.earnings && (
            <div style={{
              background: `${service.accent}12`,
              border: `1px solid ${service.accent}25`,
              borderRadius: 18,
              padding: '1.5rem',
              marginBottom: '1.75rem',
            }}>
              <h4 style={{ color: '#fff', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '1.1rem' }}>
                {service.modal.specialNote}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.85rem' }}>
                {service.modal.earnings.map((e, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.25)', padding: '0.9rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{e.label}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>{e.value}</div>
                  </div>
                ))}
              </div>
              {service.modal.feesNote && (
                <p style={{ marginTop: '0.9rem', display: 'inline-block', background: service.accent, color: '#fff', fontSize: '0.74rem', fontWeight: 700, padding: '5px 14px', borderRadius: 50 }}>
                  {service.modal.feesNote}
                </p>
              )}
            </div>
          )}

          {/* Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1.5rem' }}>
            {service.modal.sections.map((sec, si) => (
              <div key={si}>
                <h4 style={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', borderLeft: `3px solid ${service.accent}`, paddingLeft: 10, marginBottom: '0.9rem' }}>
                  {sec.heading}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {sec.items.map((item, ii) => (
                    <li key={ii} style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.875rem', lineHeight: 1.75, paddingBottom: '0.45rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.45rem' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 2.25rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'flex-end',
          background: 'rgba(0,0,0,0.2)', flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              background: `linear-gradient(135deg, ${service.accent}, ${service.accentB})`,
              color: '#fff', border: 'none',
              padding: '0.7rem 2rem', borderRadius: 50,
              fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
              boxShadow: `0 8px 24px ${service.accent}44`,
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export — renders the 5-card uniform grid + modal
   No section header here; the Services PAGE owns the heading.
───────────────────────────────────────────────────────────── */
const ServiceFlipCards = () => {
  const [active, setActive] = useState(null);
  const [serviceImages, setServiceImages] = useState({});

  React.useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from('media_assets')
        .select('file_path, public_url')
        .eq('section', 'services');

      if (data) {
        console.log("Fetched Services Images:", data);
        const mapping = {};
        data.forEach(item => {
          // item.file_path is like 'service-1/image.jpg'
          const folder = item.file_path.split('/')[0];
          mapping[folder] = item.public_url;
        });
        setServiceImages(mapping);
      }
    }
    fetchImages();
  }, []);

  return (
    <>
      {/* Ambient glows */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '5%', left: '5%', width: 500, height: 500, background: 'rgba(108,99,255,0.07)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 440, height: 440, background: 'rgba(168,85,247,0.06)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Uniform 5-card responsive grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          position: 'relative', zIndex: 1,
        }}
          className="services-grid"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={{ ...service, imageUrl: serviceImages[service.folder] }}
              index={i}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        .services-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <ServiceModal service={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceFlipCards;
