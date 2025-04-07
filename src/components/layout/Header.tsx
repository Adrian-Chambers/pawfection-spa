"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Button from '../ui/Button';
import { FiPhone } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isHydrated = useHydrated();
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  
  useEffect(() => {
    return scrollY.onChange(() => {
      const scrolled = scrollY.get() > 20;
      setIsScrolled(scrolled);
    });
  }, [scrollY]);
  
  // Determine if we should show the transparent header
  const shouldShowTransparent = isHomepage && !isScrolled;
  
  // Static non-animated header content
  const headerContent = (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" passHref className="focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 rounded-lg">
        <div className="flex items-center cursor-pointer">
          <div className="relative h-12 w-12 mr-2">
            <Image 
              src="/images/logo.png" 
              alt="Pawfection Grooming & Spa Logo" 
              fill
              className="object-contain"
              priority
              sizes="(max-width: 48px) 48px, 48px"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className={`font-display text-xl ${shouldShowTransparent ? 'text-white drop-shadow-sm' : 'text-primary-dark'}`}>Pawfection</h1>
            <p className={`text-xs ${shouldShowTransparent ? 'text-white/90 drop-shadow-sm' : 'text-fur-brown'} -mt-1`}>Grooming & Spa</p>
          </div>
        </div>
      </Link>
      
      <div className="flex items-center space-x-6">
        <Navigation isTransparent={shouldShowTransparent} />
        <Button 
          href="tel:+15551234567" 
          variant="accent" 
          size="sm" 
          className="hidden md:flex shadow-lg"
          icon={<FiPhone />}
          aria-label="Call us at (555) 123-4567"
        >
          <span className="sr-only">Call us at </span>
          (555) 123-4567
        </Button>
      </div>
    </div>
  );
  
  // Before hydration: use a static header
  if (!isHydrated) {
    return (
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white py-2 shadow-md"
        role="banner"
      >
        {headerContent}
      </header>
    );
  }
  
  // After hydration: use animated header
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowTransparent
          ? 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px] py-4'
          : 'bg-white shadow-md py-2'
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      role="banner"
      aria-label="Main navigation"
    >
      {headerContent}
    </motion.header>
  );
};

export default Header;