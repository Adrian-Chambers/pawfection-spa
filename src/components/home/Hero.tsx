"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const Hero = () => {
  const isHydrated = useHydrated();
  
  // Content that will be displayed in both versions
  const heroContent = (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white drop-shadow-lg mb-4">
        Premium Grooming For Your Furry Friend
      </h1>
      
      <p className="text-white text-xl drop-shadow-md mb-8">
        Professional care with a gentle touch. Because your pet deserves the very best!
      </p>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          href="/book-appointment" 
          size="lg"
          icon={<FiCalendar />}
        >
          Book Appointment
        </Button>
        
        <Button 
          href="/#services" 
          variant="secondary" 
          size="lg"
          icon={<FiArrowRight />}
        >
          Explore Services
        </Button>
      </div>
    </>
  );
  
  // Static version (pre-hydration)
  if (!isHydrated) {
    return (
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/banner.jpg" 
            alt="Happy dog after grooming" 
            fill
            priority
            className="object-cover brightness-[0.85]"
          />
        </div>
        
        {/* Content overlay */}
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl">
            {heroContent}
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent" />
      </section>
    );
  }
  
  // Animated version (post-hydration)
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/banner.jpg" 
          alt="Happy dog after grooming" 
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-white drop-shadow-lg mb-4"
          >
            Premium Grooming For Your Furry Friend
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-xl drop-shadow-md mb-8"
          >
            Professional care with a gentle touch. Because your pet deserves the very best!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              href="/book-appointment" 
              size="lg"
              icon={<FiCalendar />}
            >
              Book Appointment
            </Button>
            
            <Button 
              href="/#services" 
              variant="secondary" 
              size="lg"
              icon={<FiArrowRight />}
            >
              Explore Services
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent"
      />
      
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute -bottom-5 -right-5 text-white -rotate-12 hidden lg:block"
      >
        <Image 
          src="/images/icons/dog.png" 
          alt="Paw print" 
          width={120} 
          height={120}
          className="opacity-50"
        />
      </motion.div>
    </section>
  );
};

export default Hero;