"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types/service';
import { formatPrice } from '@/utils/price';
import { FiCheck, FiInfo } from 'react-icons/fi';

type ServiceSelectorProps = {
  services: Service[];
  selectedService: string;
  onSelect: (serviceId: string) => void;
  serviceSize: 'small' | 'medium' | 'large';
  error?: string;
};

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedService,
  onSelect,
  serviceSize,
  error
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const packageServices = services.filter(service => service.category === 'package');
  
  const toggleServiceDetails = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };
  
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm mb-4">
          {error}
        </div>
      )}
      
      {packageServices.map((service) => (
        <motion.div
          key={service.id}
          onClick={() => onSelect(service.id)}
          whileHover={{ scale: 1.01 }}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all overflow-hidden ${
            selectedService === service.id
              ? 'border-primary-dark bg-primary-light/30 shadow-md'
              : 'border-gray-200 hover:border-primary hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {selectedService === service.id && (
                <span className="bg-primary-dark text-white p-1 rounded-full mr-2 flex-shrink-0">
                  <FiCheck size={12} />
                </span>
              )}
              <h4 className="font-medium text-lg">{service.name}</h4>
            </div>
            <div className="text-right">
              <span className="font-display text-primary-dark text-lg">
                ${formatPrice(service.price, serviceSize)}
              </span>
              {service.icon && (
                <div className="h-12 w-12 ml-2 inline-block">
                  <Image 
                    src={service.icon}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Includes:</span> {service.includes.slice(0, 2).join(', ')}
              {service.includes.length > 2 && "..."}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent selecting the service when clicking this button
                toggleServiceDetails(service.id);
              }}
              className="text-xs text-secondary-dark hover:underline focus:outline-none"
            >
              {expandedService === service.id ? 'Show less' : 'Show more'}
            </button>
          </div>
          
          <AnimatePresence>
            {expandedService === service.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-3 border-t border-gray-200"
              >
                <h5 className="font-medium text-sm mb-2">Service Includes:</h5>
                <ul className="space-y-1">
                  {service.includes.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <FiCheck className="text-primary-dark mt-1 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="flex items-start">
                    <FiInfo className="text-secondary-dark mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Estimated duration:</p> 
                      <p className="text-gray-600">
                        {serviceSize === 'small' ? '1 - 1.5 hours' : 
                         serviceSize === 'medium' ? '1.5 - 2 hours' : 
                         '2 - 2.5 hours'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceSelector;