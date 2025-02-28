"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/staff', label: 'Our Team' },
  { href: '/book-appointment', label: 'Book Appointment' },
  { href: '/products', label: 'Products' },
];

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHydrated = useHydrated();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Desktop navigation links
  const renderDesktopLinks = () => {
    // Static version (pre-hydration)
    if (!isHydrated) {
      return (
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.href} passHref>
                <div
                  className={`relative px-1 py-2 ${
                    isActive ? 'text-primary-dark font-medium' : 'text-fur-brown'
                  } hover:text-primary-dark transition-colors duration-300 cursor-pointer`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-dark" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
    
    // Animated version (post-hydration)
    return (
      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.href} passHref>
              <motion.div
                className={`relative px-1 py-2 ${
                  isActive ? 'text-primary-dark font-medium' : 'text-fur-brown'
                } hover:text-primary-dark transition-colors duration-300 cursor-pointer`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-dark"
                    layoutId="navbar-underline"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    );
  };
  
  // Mobile menu
  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;
    
    // Static version (pre-hydration)
    if (!isHydrated) {
      return (
        <div className="absolute top-full right-0 left-0 bg-white shadow-lg rounded-b-lg z-50 md:hidden">
          <div className="flex flex-col p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link href={item.href} key={item.href} passHref>
                  <div
                    className={`py-3 px-4 ${
                      isActive ? 'text-primary-dark font-medium bg-primary-light rounded-lg' : 'text-fur-brown'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
    
    // Animated version (post-hydration)
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-full right-0 left-0 bg-white shadow-lg rounded-b-lg z-50 md:hidden"
      >
        <div className="flex flex-col p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.href} passHref>
                <div
                  className={`py-3 px-4 ${
                    isActive ? 'text-primary-dark font-medium bg-primary-light rounded-lg' : 'text-fur-brown'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    );
  };
  
  return (
    <nav className="relative">
      {renderDesktopLinks()}
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-fur-brown hover:text-primary-dark focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {renderMobileMenu()}
    </nav>
  );
};

export default Navigation;