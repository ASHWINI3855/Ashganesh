import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ── animated floating-label field ─────────────────── */
function Field({ id, label, type = 'text', as, icon, value, onChange }) {
  const [active, setActive] = useState(false);
  const [filled, setFilled] = useState(false);

  const sharedProps = {
    id,
    placeholder: ' ',
    value,
    onChange,
    onFocus: () => setActive(true),
    onBlur: e => { setActive(false); setFilled(!!e.target.value); },
    style: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${active ? 'transparent' : '#252525'}`,
      padding: '8px 0 8px 26px',
      color: '#fff',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      outline: 'none',
      display: 'block',
      resize: 'none',
      height: as === 'textarea' ? 88 : undefined,
    },
  };

  return (
    <div style={{ position: 'relative', marginBottom: 32 }}>
      {/* icon */}
      <svg viewBox="0 0 24 24" style={{
        position: 'absolute', left: 0, top: 9, width: 15, height: 15,
        stroke: active ? '#8b5cf6' : '#333', fill: 'none', strokeWidth: 1.8,
        transition: 'stroke .3s', pointerEvents: 'none',
      }}>
        {icon}
      </svg>

      {/* input / textarea */}
      {as === 'textarea'
        ? <textarea {...sharedProps} required />
        : <input type={type} {...sharedProps} required />
      }

      {/* floating label */}
      <label htmlFor={id} style={{
        position: 'absolute',
        left: active || filled ? 0 : 26,
        top: active || filled ? -15 : 8,
        fontSize: active || filled ? 10 : 14,
        color: active ? '#8b5cf6' : '#3a3a3a',
        letterSpacing: active || filled ? '1.5px' : 0,
        textTransform: active || filled ? 'uppercase' : 'none',
        pointerEvents: 'none',
        transition: 'all .25s ease',
      }}>
        {label}
      </label>

      {/* animated underline */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '1.5px',
        width: active ? '100%' : 0,
        background: 'linear-gradient(90deg,#8b5cf6,#c4b5fd)',
        borderRadius: 2,
        transition: 'width .5s cubic-bezier(.4,0,.2,1)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ── contact info row ───────────────────────────────── */
function InfoRow({ icon, label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 26 }}>
      <svg viewBox="0 0 24 24" style={{
        width: 17, height: 17, flexShrink: 0, marginTop: 2,
        stroke: '#8b5cf6', fill: 'none', strokeWidth: 1.8,
      }}>
        {icon}
      </svg>
      <div>
        <strong style={{ color: '#ccc', fontWeight: 500, display: 'block', marginBottom: 3, fontSize: 12, letterSpacing: '.8px', textTransform: 'uppercase' }}>
          {label}
        </strong>
        <div style={{ color: '#888', fontSize: 14, lineHeight: 1.75 }}>{children}</div>
      </div>
    </div>
  );
}

/* ── main page ──────────────────────────────────────── */
const Contact = () => {
  const heroRef  = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const mapRef   = useRef(null);

  const [formData, setFormData] = useState({
    nm: '',
    em: '',
    ph: '',
    sb: '',
    mg: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the data collection policy.");
      return;
    }

    // 1. WhatsApp Integration (Constructing the message first)
    const waMessage = `🌟 Welcome to The Corner Stone Groups - Your Career Partner!\nWe're here to transform your Professional Journey with Personalized Placement Solutions. 💼🚀\n\nName: ${formData.nm}\nEmail: ${formData.em}\nPhone: ${formData.ph}\nSubject: ${formData.sb}\nMessage: ${formData.mg}`;
    const waUrl = `https://wa.me/916381951152?text=${encodeURIComponent(waMessage)}`;

    // Open WhatsApp directly and instantly
    window.open(waUrl, '_blank');

    // Update UI status
    setStatus('success');
    setFormData({ nm: '', em: '', ph: '', sb: '', mg: '' });

    // 2. Database Integration (In Background - Non-blocking)
    try {
      supabase
        .from('contact_submissions')
        .insert([{
          name: formData.nm,
          email: formData.em,
          phone: formData.ph,
          subject: formData.sb,
          message: formData.mg
        }])
        .then(({ error: dbError }) => {
          if (!dbError) {
             supabase.functions.invoke('send-contact-email', {
              body: {
                name: formData.nm,
                email: formData.em,
                phone: formData.ph,
                subject: formData.sb,
                message: formData.mg
              },
            }).catch(() => {});
          }
        });
    } catch (err) {
      console.error("Background Submission Error:", err);
    }
  };

  useEffect(() => {
    const targets = [heroRef, leftRef, rightRef, mapRef].map(r => r.current).filter(Boolean);
    const ob = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('cw-fi-on'); }),
      { threshold: 0.1 }
    );
    targets.forEach(t => ob.observe(t));
    // trigger immediately if already in view
    setTimeout(() => targets.forEach(t => t.classList.add('cw-fi-on')), 200);
    return () => ob.disconnect();
  }, []);

  return (
    <>
      {/* fade-in keyframes injected once */}
      <style>{`
        .cw-fi { opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .7s ease; }
        .cw-fi-on { opacity:1 !important; transform:translateY(0) !important; }
      `}</style>

      <div style={{ background: '#111', minHeight: '100vh', padding: '120px 70px 80px', fontFamily: "'Inter',sans-serif", color: '#fff' }}>

        {/* ── HERO ── */}
        <div ref={heroRef} className="cw-fi" style={{ marginBottom: 64 }}>
          <h1 style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', margin: 0 }}>
            Your <em style={{ fontStyle: 'normal', color: '#8b5cf6' }}>Career</em><br />Partner.
          </h1>
          <p style={{ color: '#666', fontSize: 15, marginTop: 16, maxWidth: 480, lineHeight: 1.85 }}>
            Connect with us and discover how The Cornerstone Groups can be your trusted partner in business solutions and career growth. Reach out today!
          </p>
        </div>

        {/* ── TWO-COLUMN GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 70,
          alignItems: 'start',
          marginBottom: 80,
        }}>

          {/* LEFT: Contact Details */}
          <div ref={leftRef} className="cw-fi" style={{ transitionDelay: '.1s' }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: 28 }}>
              Contact Details
            </h3>

            <InfoRow
              label="Our Location"
              icon={<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>}
            >
              No: 45F Pandian Complex, Bryant Nagar 7th Street Middle,<br />Tuticorin, Tamil Nadu, India.
            </InfoRow>

            <InfoRow
              label="Call Us"
              icon={<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 17.92z"/>}
            >
              <a href="tel:+916381951152" style={{ color: '#888', textDecoration: 'none' }}>+91 63819 51152</a><br />
              <a href="tel:+919345818578" style={{ color: '#888', textDecoration: 'none' }}>+91 93458 18578</a>
            </InfoRow>

            <InfoRow
              label="Say Hello"
              icon={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></>}
            >
              <a href="mailto:info@thecornerstonegroups.in" style={{ color: '#888', textDecoration: 'none' }}>info@thecornerstonegroups.in</a>
            </InfoRow>

            <InfoRow
              label="Founder"
              icon={<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
            >
              A. Nallasivan — Proprietor
            </InfoRow>
          </div>

          {/* RIGHT: Contact Form */}
          <div ref={rightRef} className="cw-fi" style={{ transitionDelay: '.2s' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 5, letterSpacing: '-.5px' }}>Get In Touch</h2>
            <p style={{ color: '#555', fontSize: 13, marginBottom: 38 }}>Fill the form — we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <Field id="nm" label="Name" value={formData.nm} onChange={handleChange}
                  icon={<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
                />
                <Field id="em" label="Email Address" type="email" value={formData.em} onChange={handleChange}
                  icon={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></>}
                />
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <Field id="ph" label="Phone" type="tel" value={formData.ph} onChange={handleChange}
                  icon={<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 17.92z"/>}
                />
                <Field id="sb" label="Subject" value={formData.sb} onChange={handleChange}
                  icon={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>}
                />
              </div>

              {/* Message */}
              <Field id="mg" label="How can we help you? Feel free to get in touch!" as="textarea" value={formData.mg} onChange={handleChange}
                icon={<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>}
              />

              {/* Status Messages */}
              {status === 'success' && <p style={{ color: '#10b981', fontSize: 13, marginBottom: 20 }}>Message sent successfully! Redirecting to WhatsApp...</p>}
              {status === 'error' && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 20 }}>Error: {errorMessage}</p>}

              {/* Submit row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginTop: 6 }}>
                <button
                  type="submit"
                  style={{
                    background: '#25D366', color: '#fff', border: 'none',
                    padding: '13px 28px', borderRadius: 50, fontSize: 14,
                    fontWeight: 700, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    fontFamily: "'Inter',sans-serif",
                    transition: 'background .3s, transform .2s, box-shadow .3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='#128C7E'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(37,211,102,.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
                >
                  <svg viewBox="0 0 24 24" style={{ width:16, height:16, fill:'#fff' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.117 1.522 5.845L.057 23.943l6.304-1.654A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.789 9.789 0 01-5.006-1.372l-.359-.215-3.722.977.994-3.63-.234-.373A9.821 9.821 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  Send Message
                </button>

                <label style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ accentColor:'#8b5cf6', width:14, height:14 }} 
                  />
                  <span style={{ fontSize:12, color:'#444' }}>
                    I agree that my data is <a href="#" style={{ color:'#8b5cf6', textDecoration:'underline' }}>collected</a>.
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* ── MAP ── */}
        <div ref={mapRef} className="cw-fi" style={{ transitionDelay: '.3s', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ width:'100%', height:350, borderRadius:30, overflow:'hidden', border:'1px solid rgba(255,255,255,0.05)', boxShadow:'0 25px 60px rgba(0,0,0,0.4)', position:'relative' }}>
            <iframe
              src="https://www.google.com/maps?q=8.7901876,78.133163&z=17&output=embed"
              style={{ width:'100%', height:'100%', border:0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:16 }}>
            <a
              href="https://www.google.com/maps/place/The+Corner+Stone+Groups/@8.7901876,78.1305881,17z/data=!3m1!4b1!4m6!3m5!1s0x3b03ef19c7ff648b:0xa687a8e37e7dc4a7!8m2!3d8.7901876!4d78.133163!16s%2Fg%2F11v_3qt20_?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:'#FF6B35', color:'#fff', padding:'12px 24px',
                borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none',
                display:'inline-flex', alignItems:'center', gap:8,
                transition:'background .3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='#e85a2a'}
              onMouseLeave={e => e.currentTarget.style.background='#FF6B35'}
            >
              Get Directions
              <MapPin size={16} />
            </a>
          </div>
        </div>

      </div>
    </>
  );
};

export default Contact;
