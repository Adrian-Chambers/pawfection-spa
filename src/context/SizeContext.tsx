"use client";
import React, { createContext, useContext, useState } from 'react';
import { ServiceSize } from '@/types/service';

interface SizeContextType {
  selectedSize: ServiceSize;
  setSelectedSize: (size: ServiceSize) => void;
}

const SizeContext = createContext<SizeContextType | undefined>(undefined);

export const SizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSize, setSelectedSize] = useState<ServiceSize>('medium');

  return (
    <SizeContext.Provider value={{ selectedSize, setSelectedSize }}>
      {children}
    </SizeContext.Provider>
  );
};

export const useSize = () => {
  const context = useContext(SizeContext);
  if (context === undefined) {
    throw new Error('useSize must be used within a SizeProvider');
  }
  return context;
}; 