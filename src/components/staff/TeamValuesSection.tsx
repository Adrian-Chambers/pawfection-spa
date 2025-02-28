"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiHeart, FiAward, FiSmile, FiBookOpen } from 'react-icons/fi';

const values = [
  {
    icon: <FiHeart className="text-secondary-dark" size={24} />,
    title: "Compassionate Care",
    description: "We treat every pet with patience, gentleness, and understanding."
  },
  {
    icon: <FiAward className="text-secondary-dark" size={24} />,
    title: "Professional Excellence",
    description: "Our team maintains the highest standards in grooming techniques and safety."
  },
  {
    icon: <FiSmile className="text-secondary-dark" size={24} />,
    title: "Positive Experience",
    description: "We create a calm, stress-free environment for both pets and their owners."
  },
  {
    icon: <FiBookOpen className="text-secondary-dark" size={24} />,
    title: "Continuous Learning",
    description: "We stay updated with the latest grooming techniques and pet care knowledge."
  }
];

const TeamValuesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
            Our Team Values
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            What makes our groomers the best in the business? These core values guide everything we do.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-display text-fur-brown mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamValuesSection;