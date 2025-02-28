"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StaffMember } from '@/types/staff';
import { FiAward, FiCalendar, FiHeart } from 'react-icons/fi';

type StaffCardProps = {
  staffMember: StaffMember;
};

const StaffCard: React.FC<StaffCardProps> = ({ staffMember }) => {
  const { name, position, yearsExperience, specialty, quote, image, icon } = staffMember;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-primary-light h-full"
    >
      <div className="relative h-96">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top"
        />
        
        {/* Position badge */}
        <div className="absolute top-4 left-4 bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium">
          {position}
        </div>
        
        {/* Icon circle if available */}
        {icon && (
          <div className="absolute -bottom-6 right-6 w-16 h-16 bg-white rounded-full shadow-lg border-2 border-primary-light flex items-center justify-center z-10">
            <Image
              src={icon}
              alt="Specialty"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        )}
      </div>
      
      <div className="p-6 pt-8">
        <h3 className="text-2xl font-display text-fur-brown mb-1">{name}</h3>
        
        {/* Experience and Specialty with icons */}
        <div className="mt-4 mb-5 space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center mr-3">
              <FiCalendar className="text-primary-dark" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Experience</span>
              <p className="font-medium">{yearsExperience} years</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-secondary-light rounded-full flex items-center justify-center mr-3">
              <FiAward className="text-secondary-dark" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Specialty</span>
              <p className="font-medium">{specialty}</p>
            </div>
          </div>
        </div>
        
        {/* Quote with animation */}
        <motion.div 
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          className="italic text-gray-600 border-t border-gray-100 pt-4 relative"
        >
          <div className="absolute -top-3 left-0 w-6 h-6 text-primary-light opacity-30">
            <FiHeart size={24} />
          </div>
          <blockquote className="pl-2">"{quote}"</blockquote>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StaffCard;