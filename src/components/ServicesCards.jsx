import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
                className="absolute top-6 right-6 text-white/40 hover:text-white text-4xl font-light transition-colors z-10 leading-none"
              >
                &times;
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
      <h2 className="text-3xl md:text-5xl font-bold mb-10 border-b border-white/10 pb-4">Key Domains & Job Roles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Resorts/Hotels & Guest House",
            roles: ["Front office executives", "Receptionists", "HR coordinators", "Managers"]
          },
          {
            title: "Retail & Supermarkets",
            roles: ["Cashiers", "Accountants", "Inventory supervisors"]
          },
          {
            title: "Construction & Engineering",
            roles: ["Civil engineers", "Project coordinators", "Site supervisors"]
          },
          {
            title: "Logistics, Airport & IT",
            roles: ["Logistics managers", "IT specialists", "Airport operations staff"]
          }
        ].map((domain, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-[#6C63FF] uppercase tracking-wide">{domain.title}</h3>
            <ul className="space-y-4">
              {domain.roles.map((role, idx) => (
                <li key={idx} className="text-gray-400 text-lg border-b border-white/5 pb-2">
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
        <h2 className="text-3xl md:text-5xl font-bold mb-10 border-b border-white/10 pb-4">Courses Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-6">
              <span className="text-gray-300 font-bold text-lg">{course}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#6C63FF]/10 border border-[#6C63FF]/30 rounded-3xl p-10">
        <h3 className="text-3xl font-black text-[#6C63FF] mb-8 uppercase tracking-widest">
          Study and Earn in Singapore
        </h3>
        <ul className="space-y-6">
          {[
            "Course Duration: 6 months",
            "Industrial Attachment: 6 months of Paid Internship",
            "Estimated Stipend: 70,000 INR to 90,000 INR/month"
          ].map((item, i) => (
            <li key={i} className="text-xl font-bold border-l-4 border-[#6C63FF] pl-6 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
        <p className="text-red-400 font-black text-2xl uppercase tracking-widest">
          No Service Charge. Pay directly to the college.
        </p>
      </div>
    </div>
  );

  return (
    <section id="services" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Maldives Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a0018] border border-purple-900/25 rounded-[40px] p-10 md:p-14 flex flex-col group cursor-pointer hover:shadow-2xl hover:shadow-purple-900/30 hover:border-purple-700/40 transition-all duration-300"
        >
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tight">Recruitment Services in Maldives</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-12 flex-grow">
            Leading white-collar recruitment for Maldives in resorts, supermarkets, construction, logistics, airports, and IT. Sourcing top talent like accountants, HR managers, IT pros, receptionists, front office executives, civil engineers and cashiers.
          </p>
          <button 
            onClick={() => setActiveModal('maldives')}
            className="w-full bg-white/5 hover:bg-[#6C63FF] text-white py-5 px-8 rounded-2xl font-black tracking-widest uppercase transition-all duration-300 group-hover:bg-[#6C63FF] border border-white/5 group-hover:border-transparent"
          >
            View Details
          </button>
        </motion.div>

        {/* Singapore Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0a0018] border border-purple-900/25 rounded-[40px] p-10 md:p-14 flex flex-col group cursor-pointer hover:shadow-2xl hover:shadow-purple-900/30 hover:border-purple-700/40 transition-all duration-300"
        >
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tight">Study in Singapore</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-12 flex-grow">
            We support students through every step of the admission process, visa and ensuring a smooth and successful onboarding experience in Singapore.
          </p>
          <button 
            onClick={() => setActiveModal('singapore')}
            className="w-full bg-white/5 hover:bg-[#6C63FF] text-white py-5 px-8 rounded-2xl font-black tracking-widest uppercase transition-all duration-300 group-hover:bg-[#6C63FF] border border-white/5 group-hover:border-transparent"
          >
            View Details
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
