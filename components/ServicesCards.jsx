import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Building2, ShoppingCart, HardHat, Plane, GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Modal = ({ isOpen, onClose, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0018] border border-purple-900/30 rounded-3xl p-8 md:p-12 max-w-4xl w-full relative my-auto shadow-2xl shadow-purple-900/25 overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <X size={20} />
              </button>
              <div className="relative z-10 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar">
                {content}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ServicesCards = () => {
  const [activeModal, setActiveModal] = useState(null);

  const maldivesContent = (
    <div className="text-white">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">Key Domains & Job Roles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Resorts/Hotels & Guest House",
            icon: <Building2 className="text-[#6C63FF]" size={28} />,
            roles: ["Front office executives", "Receptionists", "HR coordinators", "Managers"]
          },
          {
            title: "Retail & Supermarkets",
            icon: <ShoppingCart className="text-[#6C63FF]" size={28} />,
            roles: ["Cashiers", "Accountants", "Inventory supervisors"]
          },
          {
            title: "Construction & Engineering",
            icon: <HardHat className="text-[#6C63FF]" size={28} />,
            roles: ["Civil engineers", "Project coordinators", "Site supervisors"]
          },
          {
            title: "Logistics, Airport & IT",
            icon: <Plane className="text-[#6C63FF]" size={28} />,
            roles: ["Logistics managers", "IT specialists", "Airport operations staff"]
          }
        ].map((domain, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center">
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold">{domain.title}</h3>
            </div>
            <ul className="space-y-3">
              {domain.roles.map((role, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const singaporeContent = (
    <div className="text-white space-y-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Courses Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Diploma in Hospitality Management",
            "Diploma in Logistics and Supply Chain",
            "Diploma in Business (IT)",
            "Diploma in Baking Technology",
            "Diploma in Patisserie and Baking",
            "Diploma in Food and Beverage Operations",
            "Higher Diploma in Hospitality Management",
            "Higher Diploma in Hospitality and Tourism",
            "PG Diploma in Management",
            "PG Diploma in Hospitality Operations"
          ].map((course, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-3">
              <GraduationCap className="text-[#6C63FF] shrink-0" size={20} />
              <span className="text-gray-300 font-medium">{course}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#6C63FF]/10 border border-[#6C63FF]/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-[#6C63FF] mb-6 flex items-center gap-3">
          <Briefcase /> Study and Earn in Singapore
        </h3>
        <ul className="space-y-4">
          {[
            "Course Duration: 6 months",
            "6 months of Paid Internship",
            "Earn 70,000 INR to 90,000 INR/month"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-lg font-medium">
              <CheckCircle2 className="text-[#6C63FF]" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
        <p className="text-red-400 font-bold text-xl uppercase tracking-wide">
          Notice: No Service Charge. Pay directly to the college.
        </p>
      </div>
    </div>
  );

  return (
    <section id="services" className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        
        {/* Maldives Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a0018] border border-purple-900/25 rounded-3xl p-8 md:p-12 flex flex-col group cursor-pointer hover:shadow-2xl hover:shadow-purple-900/30 hover:border-purple-700/40 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-900/40" style={{background: 'linear-gradient(135deg, #6C63FF, #a855f7)'}}>
            <Briefcase className="text-white" size={32} />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Recruitment Services in Maldives</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-grow">
            Leading white-collar recruitment for Maldives in resorts, supermarkets, construction, logistics, airports, and IT. Sourcing top talent like accountants, HR managers, IT pros, receptionists, front office executives, civil engineers and cashiers.
          </p>
          <button 
            onClick={() => setActiveModal('maldives')}
            className="flex items-center justify-between w-full bg-white/5 hover:bg-[#6C63FF] text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 group-hover:bg-[#6C63FF] border border-white/5 group-hover:border-transparent"
          >
            <span>View Details</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Singapore Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0a0018] border border-purple-900/25 rounded-3xl p-8 md:p-12 flex flex-col group cursor-pointer hover:shadow-2xl hover:shadow-purple-900/30 hover:border-purple-700/40 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-900/40" style={{background: 'linear-gradient(135deg, #a855f7, #6C63FF)'}}>
            <GraduationCap className="text-white" size={32} />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Study in Singapore</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-grow">
            We support students through every step of the admission process, visa and ensuring a smooth and successful onboarding experience in Singapore.
          </p>
          <button 
            onClick={() => setActiveModal('singapore')}
            className="flex items-center justify-between w-full bg-white/5 hover:bg-[#6C63FF] text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 group-hover:bg-[#6C63FF] border border-white/5 group-hover:border-transparent"
          >
            <span>View Details</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>

      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        content={activeModal === 'maldives' ? maldivesContent : singaporeContent}
      />
    </section>
  );
};

export default ServicesCards;
