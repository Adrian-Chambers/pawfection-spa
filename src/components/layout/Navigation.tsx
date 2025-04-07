"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

interface NavigationProps {
  isTransparent?: boolean;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/staff', label: 'Our Team' },
  { href: '/book-appointment', label: 'Book Appointment' },
  { href: '/products', label: 'Products' },
];

const Navigation: React.FC<NavigationProps> = ({ isTransparent = false }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHydrated = useHydrated();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [isMenuOpen]);
  
  // Get text styles based on transparency
  const getTextStyles = (isActive: boolean) => {
    if (isTransparent) {
      return isActive 
        ? 'text-white font-medium drop-shadow-md' 
        : 'text-white/90 hover:text-white drop-shadow-sm';
    }
    return isActive 
      ? 'text-primary-dark font-medium' 
      : 'text-fur-brown hover:text-primary-dark';
  };
  
  // Get underline styles based on transparency
  const getUnderlineStyles = () => {
    return isTransparent ? 'bg-white' : 'bg-primary-dark';
  };
  
  // Desktop navigation links
  const renderDesktopLinks = () => {
    // Static version (pre-hydration)
    if (!isHydrated) {
      return (
        <div className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const textStyles = getTextStyles(isActive);
            return (
              <Link href={item.href} key={item.href} passHref>
                <div
                  className={`relative px-1 py-2 ${textStyles} transition-colors duration-300 cursor-pointer focus:outline-none`}
                  role="link"
                  tabIndex={0}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <div className={`absolute -bottom-1 left-0 right-0 h-0.5 ${getUnderlineStyles()}`} aria-hidden="true" />
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
      <div className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const textStyles = getTextStyles(isActive);
          return (
            <Link href={item.href} key={item.href} passHref>
              <motion.div
                className={`relative px-1 py-2 ${textStyles} transition-colors duration-300 cursor-pointer focus:outline-none`}
                whileHover={{ scale: 1.05 }}
                role="link"
                tabIndex={0}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${getUnderlineStyles()}`}
                    layoutId="navbar-underline"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    );
  };
  
  // Mobile menu button color
  const getMenuButtonStyles = () => {
    return isTransparent 
      ? 'text-white hover:text-white/80 focus:text-white/80 drop-shadow-sm' 
      : 'text-fur-brown hover:text-primary-dark focus:text-primary-dark';
  };
  
  // Mobile menu
  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;
    
    const menuContent = (
      <div className="flex flex-col p-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.href} passHref>
              <div
                ref={index === 0 ? firstMenuItemRef : null}
                className={`py-3 px-4 ${
                  isActive ? 'text-primary-dark font-medium bg-primary-light rounded-lg' : 'text-fur-brown'
                } focus:outline-none focus:text-primary-dark`}
                onClick={() => setIsMenuOpen(false)}
                role="link"
                tabIndex={0}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    );
    
    // Static version (pre-hydration)
    if (!isHydrated) {
      return (
        <div 
          className="absolute top-full right-0 left-0 bg-white shadow-lg rounded-b-lg z-50 md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {menuContent}
        </div>
      );
    }
    
    // Animated version (post-hydration)
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full right-0 left-0 bg-white shadow-lg rounded-b-lg z-50 md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {menuContent}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  return (
    <nav className="relative" aria-label="Main navigation">
      {renderDesktopLinks()}
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          className={`${getMenuButtonStyles()} focus:outline-none p-2`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
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