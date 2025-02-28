"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { programs } from '@/data/programs';
import Button from '@/components/ui/Button';
import { FiCheck, FiHelpCircle } from 'react-icons/fi';

const ProgramsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display text-primary-dark mb-4"
        >
          Our Special Programs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-gray-600 text-lg"
        >
          Tailored experiences designed to provide exceptional care for your furry friend.
        </motion.p>
      </div>

      {programs.map((program, index) => (
        <motion.section
          key={program.id}
          id={program.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="mb-16 pb-16 border-b border-gray-200 last:border-b-0"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className={`relative h-96 rounded-2xl overflow-hidden shadow-lg ${index % 2 === 1 ? 'md:order-last' : ''}`}>
              <Image
                src={program.image}
                alt={program.name}
                fill
                className="object-cover"
                priority
              />
              {program.icon && (
                <div className="absolute bottom-6 right-6 w-20 h-20 bg-white rounded-full shadow-lg p-2 flex items-center justify-center">
                  <Image
                    src={program.icon}
                    alt={`${program.name} icon`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            
            {/* Details Section */}
            <div>
              <h2 className="text-3xl font-display text-primary-dark mb-4">
                {program.name}
              </h2>
              
              <p className="text-gray-600 text-lg mb-6">
                {program.longDescription}
              </p>
              
              <div className="bg-primary-light rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-display text-fur-brown">
                    Pricing
                  </h3>
                  <span className="text-xl font-medium text-primary-dark">
                    {program.price}
                  </span>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-display text-fur-brown mb-4">
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <FiCheck className="text-secondary-dark mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-xl font-display text-fur-brown mb-4">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {program.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center">
                      <FiCheck className="text-secondary-dark mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex space-x-4">
                <Button 
                  href="/book-appointment" 
                  size="lg" 
                  className="w-full"
                >
                  Book Now
                </Button>
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
          
          {/* Requirements Section */}
          {program.requirements && (
            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-display text-fur-brown mb-6">
                Program Requirements
              </h3>
              <ul className="space-y-3">
                {program.requirements.map((req, reqIndex) => (
                  <li key={reqIndex} className="flex items-start">
                    <FiHelpCircle className="text-primary-dark mt-1 mr-3 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* FAQ Section */}
          {program.faq && program.faq.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-display text-fur-brown mb-6 text-center">
                Frequently Asked Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {program.faq.map((item, faqIndex) => (
                  <div 
                    key={faqIndex} 
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
                    <h4 className="font-display text-fur-brown mb-3">
                      {item.question}
                    </h4>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>
      ))}
    </div>
  );
};

export default ProgramsPage;