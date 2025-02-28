"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { services } from '@/data/services';
import { Service, ServiceSize } from '@/types/service';

// Import the hydration hook
const useHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
};

const ServicesSection = () => {
  const [selectedSize, setSelectedSize] = useState<ServiceSize>('medium');
  const isHydrated = useHydrated();
  
  // Filter services to show only packages
  const servicePackages = services.filter(service => service.category === 'package');
  
  // Calculate price based on selected size
  const getPrice = (service: Service, size: ServiceSize) => {
    if (typeof service.price === 'number') {
      return service.price;
    }
    return service.price[size];
  };
  
  // Define container animation for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Section title component with conditional rendering
  const SectionTitle = () => {
    const titleContent = (
      <>
        <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
          Our Grooming Services
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          From basic grooming to luxury spa treatments, we have everything your furry friend needs to look and feel amazing.
        </p>
        
        {/* Size Selector */}
        <div className="mt-8 inline-flex bg-gray-100 p-2 rounded-full">
          {(['small', 'medium', 'large'] as ServiceSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-2 rounded-full transition-all text-sm ${
                selectedSize === size
                  ? 'bg-primary text-primary-dark font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </>
    );

    // Before hydration: render without animation
    if (!isHydrated) {
      return <div className="text-center mb-12">{titleContent}</div>;
    }
    
    // After hydration: render with animation
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {titleContent}
      </motion.div>
    );
  };
  
  // Service packages component
  const ServicePackages = () => {
    const packagesContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicePackages.map((service, index) => {
          const cardContent = (
            <Card
              key={service.id}
              title={service.name}
              image={service.image}
              imageAlt={service.name}
              borderColor={index === 2 ? 'border-accent' : 'border-primary-light'}
              iconElement={service.icon ? (
                <div className="absolute top-4 right-4 w-16 h-16 p-1 bg-white rounded-full shadow-md flex items-center justify-center z-10">
                  <Image 
                    src={service.icon} 
                    alt={service.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              ) : undefined}
              content={
                <div>
                  <p className="mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-primary-dark mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xl font-display text-primary-dark">
                    ${getPrice(service, selectedSize)}
                  </p>
                </div>
              }
              footer={
                <Button href="/book-appointment" variant={index === 2 ? 'accent' : 'primary'} className="w-full">
                  Book Now
                </Button>
              }
            />
          );

          // Before hydration, render without animation wrappers
          if (!isHydrated) {
            return <div key={service.id}>{cardContent}</div>;
          }

          // After hydration, add animation
          return (
            <motion.div
              key={service.id}
              variants={itemVariants}
            >
              {cardContent}
            </motion.div>
          );
        })}
      </div>
    );

    // Before hydration: render without container animation
    if (!isHydrated) {
      return packagesContent;
    }
    
    // After hydration: add container animation
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {servicePackages.map((service, index) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
          >
            <Card
              title={service.name}
              image={service.image}
              imageAlt={service.name}
              borderColor={index === 2 ? 'border-accent' : 'border-primary-light'}
              iconElement={service.icon ? (
                <div className="absolute top-4 right-4 w-16 h-16 p-1 bg-white rounded-full shadow-md flex items-center justify-center z-10">
                  <Image 
                    src={service.icon} 
                    alt={service.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              ) : undefined}
              content={
                <div>
                  <p className="mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-primary-dark mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xl font-display text-primary-dark">
                    ${getPrice(service, selectedSize)}
                  </p>
                </div>
              }
              footer={
                <Button href="/book-appointment" variant={index === 2 ? 'accent' : 'primary'} className="w-full">
                  Book Now
                </Button>
              }
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };
  
  // A La Carte section component
  const AlaCarteSection = () => {
    const alaCarteContent = (
      <>
        <h3 className="text-2xl font-display text-center text-primary-dark mb-8">
          À La Carte Services
        </h3>
        
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services
              .filter(service => service.category === 'alaCarte')
              .map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl p-5 shadow-sm border-2 border-primary-light hover:border-primary-dark transition-colors duration-300"
                >
                  <div className="flex items-center mb-3">
                    {service.icon && (
                      <div className="w-12 h-12 mr-3 flex-shrink-0">
                        <Image 
                          src={service.icon}
                          alt={service.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h4 className="font-display text-lg text-fur-brown">{service.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-xl font-display text-primary-dark">
                    ${getPrice(service, selectedSize)}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </>
    );

    // Before hydration: render without animation
    if (!isHydrated) {
      return <div className="mt-16">{alaCarteContent}</div>;
    }
    
    // After hydration: add animation
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16"
      >
        {alaCarteContent}
      </motion.div>
    );
  };
  
  return (
    <section id="services" className="py-16 container mx-auto px-4">
      <SectionTitle />
      <ServicePackages />
      <AlaCarteSection />
    </section>
  );
};

export default ServicesSection;