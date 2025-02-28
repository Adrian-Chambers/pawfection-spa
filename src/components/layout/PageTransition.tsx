"use client";
import React from 'react';
import { useHydrated } from '@/hooks/useHydrated';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const isHydrated = useHydrated();
  
  // Before hydration: render children without animation
  if (!isHydrated) {
    return <>{children}</>;
  }
  
  // After hydration: add animation
  return (
    <div 
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.4s ease, transform 0.4s ease'
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;