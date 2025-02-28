"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import Navigation from './Navigation';
import Button from '../ui/Button';
import { FiPhone } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isHydrated = useHydrated();
  
  useEffect(() => {
    return scrollY.onChange(() => {
      const scrolled = scrollY.get() > 20;
      setIsScrolled(scrolled);
    });
  }, [scrollY]);
  
  // Static non-animated header content
  const headerContent = (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <div className="relative h-12 w-12 mr-2">
            <Image 
              src="/images/logo.png" 
              alt="Pawfection Grooming & Spa" 
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl text-primary-dark">Pawfection</h1>
            <p className="text-xs text-fur-brown -mt-1">Grooming & Spa</p>
          </div>
        </div>
      </Link>
      
      <div className="flex items-center space-x-6">
        <Navigation />
        <Button 
          href="tel:+15551234567" 
          variant="accent" 
          size="sm" 
          className="hidden md:flex"
          icon={<FiPhone />}
        >
          (555) 123-4567
        </Button>
      </div>
    </div>
  );
  
  // Before hydration: use a static header
  if (!isHydrated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white py-2 shadow-md">
        {headerContent}
      </header>
    );
  }
  
  // After hydration: use animated header
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {headerContent}
    </motion.header>
  );
};

export default Header;