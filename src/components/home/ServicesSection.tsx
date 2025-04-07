"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ServicePrice from '../ui/ServicePrice';
import SizeSelector from '../ui/SizeSelector';
import { services } from '@/data/services';
import { Service, ServiceSize } from '@/types/service';
import { useHydrated } from '@/hooks/useHydrated';
import { useSize } from '@/context/SizeContext';

// Memoized service card component
const ServiceCard = React.memo(({ service, index }: { service: Service; index: number }) => {
  const { selectedSize } = useSize();
  const isHydrated = useHydrated();

  const cardContent = (
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
          <ServicePrice service={service} selectedSize={selectedSize} />
        </div>
      }
      footer={
        <Button href="/book-appointment" variant={index === 2 ? 'accent' : 'primary'} className="w-full">
          Book Now
        </Button>
      }
    />
  );

  if (!isHydrated) {
    return <div key={service.id}>{cardContent}</div>;
  }

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {cardContent}
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Memoized a la carte service card component
const AlaCarteCard = React.memo(({ service }: { service: Service }) => {
  const { selectedSize } = useSize();
  const isHydrated = useHydrated();

  const cardContent = (
    <div className="h-full flex flex-col bg-white rounded-xl p-5 shadow-sm border-2 border-primary-light hover:border-primary-dark transition-colors duration-300">
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
      <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">{service.description}</p>
      <div className="mt-auto">
        <ServicePrice service={service} selectedSize={selectedSize} />
      </div>
    </div>
  );

  if (!isHydrated) {
    return <div key={service.id}>{cardContent}</div>;
  }

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
});

AlaCarteCard.displayName = 'AlaCarteCard';

const ServicesSection = () => {
  const { selectedSize, setSelectedSize } = useSize();
  const isHydrated = useHydrated();
  
  // Filter services
  const servicePackages = services.filter(service => service.category === 'package');
  const alaCarteServices = services.filter(service => service.category === 'alaCarte');
  
  // Static title content
  const titleContent = (
    <>
      <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
        Our Grooming Services
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600">
        From basic grooming to luxury spa treatments, we have everything your furry friend needs to look and feel amazing.
      </p>
      <SizeSelector selectedSize={selectedSize} onSizeChange={setSelectedSize} />
    </>
  );

  return (
    <section id="services" className="py-16 container mx-auto px-4">
      {/* Static title section - no animation */}
      <div className="text-center mb-12">
        {titleContent}
      </div>

      {/* Service packages with individual card animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicePackages.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* A la carte services section */}
      <div className="mt-16">
        <h3 className="text-2xl font-display text-center text-primary-dark mb-8">
          À La Carte Services
        </h3>
        
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {alaCarteServices.map((service) => (
              <AlaCarteCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;