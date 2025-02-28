"use client";
import { useState, useEffect } from 'react';

export function useHydrated() {
  // Start with false on server, but if we're already on client, start with true
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // This only runs on client, so we can safely set to true
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
}