import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, Wallet, Award, CheckCircle } from 'lucide-react';

const Singapore = () => {
  const courses = [
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
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-indigo-600 py-24 px-6 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8">Study & Earn in <span className="text-yellow-400">Singapore</span></h1>
            <p className="text-xl text-indigo-100 mb-10 max-w-xl">
              We support students through every step of the admission process, visa, and ensure smooth onboarding in Asia's education hub.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold shadow-xl">Apply Now</button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold">View Courses</button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
                <div className="inline-block bg-yellow-400 text-indigo-900 font-bold px-4 py-1 rounded-full text-sm mb-6">IMPORTANT HIGHLIGHT</div>
                <h2 className="text-3xl font-bold mb-6">Course Benefits</h2>
                <div className="grid grid-cols-1 gap-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Clock /></div>
                      <div>
                        <div className="text-sm opacity-80 uppercase tracking-widest">Duration</div>
                        <div className="text-xl font-bold">6 Months Study + 6 Months Internship</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Wallet /></div>
                      <div>
                        <div className="text-sm opacity-80 uppercase tracking-widest">Monthly Internship Salary</div>
                        <div className="text-xl font-bold">₹70,000 – ₹90,000 / month</div>
                      </div>
                   </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                   <div className="bg-white text-indigo-900 p-6 rounded-2xl text-center font-extrabold text-lg shadow-lg">
                      "NO SERVICE CHARGE. PAY DIRECTLY TO THE COLLEGE"
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
           <div className="md:w-1/3 sticky top-28">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Courses Offered</h2>
              <p className="text-gray-600 mb-8">Choose from a variety of globally recognized diploma and post-graduate programs tailored for the hospitality and business sectors.</p>
              <div className="w-full h-1 bg-indigo-100 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-indigo-600" />
              </div>
           </div>
           
           <div className="md:w-2/3 grid grid-cols-1 gap-4">
              {courses.map((course, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-600 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Award size={20} />
                    </div>
                    <span className="font-bold text-gray-800 text-lg">{course}</span>
                  </div>
                  <CheckCircle className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl font-bold mb-16 text-center">Your Journey to Singapore</h2>
           <div className="space-y-12 relative">
             <div className="absolute left-6 top-4 bottom-4 w-1 bg-indigo-100" />
             
             {[
               { title: "Admission Assessment", desc: "Share your documents for initial evaluation by the college experts." },
               { title: "Offer Letter", desc: "Receive your official offer letter within 7-10 working days." },
               { title: "Visa Processing", desc: "We handle your Training Work Permit (TWP) or Student Pass application." },
               { title: "Departure Briefing", desc: "Pre-departure orientation on life and work in Singapore." },
               { title: "Onboarding", desc: "Smooth arrival and orientation at the college." }
             ].map((step, i) => (
               <div key={i} className="flex gap-12 relative">
                  <div className="w-12 h-12 bg-white border-4 border-indigo-600 rounded-full flex items-center justify-center font-bold text-indigo-600 z-10 flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.desc}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Singapore;
