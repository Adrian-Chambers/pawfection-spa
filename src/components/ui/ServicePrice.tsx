"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Service, ServiceSize } from '@/types/service';

interface ServicePriceProps {
  service: Service;
  selectedSize: ServiceSize;
}

const priceVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const getPrice = (service: Service, size: ServiceSize) => {
  if (typeof service.price === 'number') {
    return service.price;
  }
  return service.price[size];
};

const ServicePrice: React.FC<ServicePriceProps> = ({ service, selectedSize }) => {
  return (
    <motion.p 
      key={`${service.id}-${selectedSize}`}
      className="text-xl font-display text-primary-dark"
      variants={priceVariants}
      initial="hidden"
      animate="visible"
    >
      ${getPrice(service, selectedSize)}
    </motion.p>
  );
};

export default ServicePrice; 