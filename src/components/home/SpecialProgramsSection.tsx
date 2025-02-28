"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { programs } from '@/data/programs';
import Button from '../ui/Button';
import { FiCheck } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const SpecialProgramsSection = () => {
  const isHydrated = useHydrated();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
            Special Programs
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Tailored experiences designed for your pet's specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={program.id} className="program-card-wrapper">
              {/* Use a wrapper div to apply the entry animation */}
              <div 
                style={isHydrated ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  transitionDelay: `${index * 200}ms`
                } : {
                  opacity: 1
                }}
              >
                {/* Use motion.div without inline styles for the hover animation */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }} // Match Card component speed
                  className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-primary-light h-full"
                >
                  <div className="relative h-48">
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover"
                    />
                    {program.icon && (
                      <div className="absolute -bottom-6 right-6 w-16 h-16 bg-white rounded-full shadow-lg border-2 border-primary-light flex items-center justify-center p-1 z-10">
                        <Image
                          src={program.icon}
                          alt={program.name}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6 pt-8">
                    <h3 className="text-xl font-display text-fur-brown mb-2">
                      {program.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {program.description}
                    </p>
                    {program.price && (
                      <p className="text-primary-dark font-display text-lg mb-4">
                        {program.price}
                      </p>
                    )}
                    <ul className="space-y-2 mb-6">
                      {program.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FiCheck className="text-secondary-dark mt-1 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex space-x-4">
                      <Link 
                        href={`/programs#${program.slug}`}
                        className="w-full"
                      >
                        <Button
                          variant={index === 0 ? 'accent' : 'secondary'}
                          className="w-full"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialProgramsSection;