"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type CarouselProps = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  fixedHeight?: number; // Optional fixed height
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className = '',
  fixedHeight,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Autoplay effect
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);
  
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* The main carousel container */}
      <div 
        style={{ 
          height: fixedHeight ? `${fixedHeight}px` : 'auto',
          minHeight: '300px', // Ensure a minimum height
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full absolute"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {showArrows && (
        <>
          <button 
            onClick={handlePrevious} 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-fur-brown text-2xl" />
          </button>
          <button 
            onClick={handleNext} 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-fur-brown text-2xl" />
          </button>
        </>
      )}
      
      {showDots && (
        <div className="mt-4 flex justify-center space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full ${
                index === currentIndex ? 'bg-primary-dark' : 'bg-primary'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;