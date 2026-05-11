import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Building2, Utensils, ShoppingBag, Stethoscope, Factory, HardHat } from 'lucide-react';

const Maldives = () => {
  const industries = [
    { name: "Resorts & Hotels", icon: <Utensils /> },
    { name: "Civil Construction", icon: <HardHat /> },
    { name: "Supermarkets & Retail", icon: <ShoppingBag /> },
    { name: "Health Care", icon: <Stethoscope /> },
    { name: "Manufacturing", icon: <Factory /> },
    { name: "Office & Admin", icon: <Building2 /> },
  ];

  const steps = [
    { title: "Requirement Understanding", desc: "We analyze client needs and job specifications deeply." },
    { title: "Candidate Sourcing", desc: "Leveraging our vast database to find the perfect match." },
    { title: "Screening", desc: "Rigorous interviews and skill assessments." },
    { title: "Client Interview", desc: "Direct interaction between client and candidate." },
    { title: "Deployment", desc: "Visa processing and travel coordination." },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-primary py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-6"
          >
            Recruitment for Maldives
          </motion.h1>
          <p className="text-xl text-primary-light/90 max-w-2xl mx-auto">
            We provide skilled manpower across multiple industries, ensuring growth and stability.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Industries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group transition-all hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {React.cloneElement(industry.icon, { size: 32 })}
              </div>
              <span className="font-bold text-gray-900">{industry.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Our Recruitment Process</h2>
            <p className="text-gray-600 mt-4">A streamlined 5-step approach to finding the best talent.</p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-primary/10 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-xl">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Call to Action */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
             <h2 className="text-4xl font-bold mb-8">Why Hire Through Us?</h2>
             <ul className="space-y-6">
                {[
                  { title: "Fast Hiring", desc: "Deployment within 30-45 days." },
                  { title: "Verified Workforce", desc: "Full background and skill checks." },
                  { title: "Documentation Support", desc: "We handle all visa and legal paperwork." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ChevronRight />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
             </ul>
          </div>
          <div className="flex-1 bg-primary/5 p-12 rounded-[2rem] text-center">
             <h3 className="text-2xl font-bold mb-4">Interested in Hiring?</h3>
             <p className="text-gray-600 mb-8">Get a customized recruitment proposal for your business today.</p>
             <button className="bg-primary text-white px-10 py-5 rounded-full font-bold shadow-xl flex items-center gap-2 mx-auto">
               Get Proposal <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Maldives;
