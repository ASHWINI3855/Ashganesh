import React from 'react';
import { CheckCircle2, Zap, Globe2, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const points = [
    {
      title: "Verified Candidates",
      desc: "Every professional undergoes a rigorous verification process.",
      icon: <CheckCircle2 className="w-10 h-10 text-green-500" />
    },
    {
      title: "Fast Hiring Process",
      desc: "Our streamlined systems ensure positions are filled within record time.",
      icon: <Zap className="w-10 h-10 text-orange-500" />
    },
    {
      title: "International Opportunities",
      desc: "Connect with premium employers and universities across the globe.",
      icon: <Globe2 className="w-10 h-10 text-blue-500" />
    },
    {
      title: "End-to-End Support",
      desc: "From documentation to deployment, we handle everything for you.",
      icon: <HeartHandshake className="w-10 h-10 text-red-500" />
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to excellence and transparency in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
