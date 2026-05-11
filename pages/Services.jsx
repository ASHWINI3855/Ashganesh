import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, BookOpen, Mic, Brain, ShieldCheck, DollarSign, Target, Globe } from 'lucide-react';

const servicesData = [
  {
    title: 'Placement Service',
    description: 'Expertly matching qualified professionals with top-tier companies, reducing HR workload and ensuring the perfect cultural and technical fit.',
    icon: <Users size={28} />
  },
  {
    title: 'Placement Training',
    description: 'Comprehensive preparation to equip candidates with the exact skills, mock interviews, and confidence needed to succeed globally.',
    icon: <Target size={28} />
  },
  {
    title: 'IELTS Coaching',
    description: 'Top-notch coaching programs engineered to help you achieve your desired band score for international opportunities.',
    icon: <BookOpen size={28} />
  },
  {
    title: 'Spoken English',
    description: 'Interactive and immersive classes designed to drastically improve fluency, accuracy, and professional communication.',
    icon: <Mic size={28} />
  },
  {
    title: 'Soft Skill Training',
    description: 'Holistic development of interpersonal skills, leadership, and adaptability to ensure you make an immediate impact at work.',
    icon: <Brain size={28} />
  }
];



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.5, ease: 'easeOut' }
  }
};

const Services = () => {
  return (
    <div className="min-h-screen bg-[#060010] overflow-x-hidden pt-36 pb-24 px-6 md:px-12">
      
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-80" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 10%, rgba(132,0,255,0.15) 0%, transparent 60%)',
        }}
      />

      {/* ── SERVICES GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Our Core <span className="text-[#6C63FF]">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Delivering excellence in recruitment and training to empower your global career trajectory.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesData.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-[#0a0018] border border-purple-900/30 rounded-3xl p-8 hover:shadow-[0_0_30px_rgba(132,0,255,0.2)] hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20 group-hover:bg-[#6C63FF] bg-white/5 transition-colors duration-300">
                <div className="text-[#6C63FF] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* WHY CHOOSE US MOVED TO HOMEPAGE */}

    </div>
  );
};

export default Services;
