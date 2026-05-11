import React from 'react';
import { motion } from 'framer-motion';
import { Plane, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "Recruitment for Maldives",
      description: "We provide skilled manpower across multiple industries including hospitality, construction, and healthcare.",
      icon: <Plane className="w-8 h-8 text-primary" />,
      link: "/maldives",
      bgColor: "bg-blue-50"
    },
    {
      title: "Study in Singapore",
      description: "We support students through every step of the admission process, visa, and ensure smooth onboarding.",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      link: "/singapore",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Core Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized solutions for international career growth and education advancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`p-10 rounded-[2.5rem] ${service.bgColor} group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {service.description}
              </p>
              <Link 
                to={service.link}
                className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all"
              >
                Learn More <ArrowRight size={20} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
