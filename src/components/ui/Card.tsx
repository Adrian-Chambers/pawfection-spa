"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type CardProps = {
  title: string;
  content: React.ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
  onClick?: () => void;
  footer?: React.ReactNode;
  borderColor?: string;
  iconElement?: React.ReactNode; // Add this new prop for icons
};

const Card: React.FC<CardProps> = ({
  title,
  content,
  image,
  imageAlt = '',
  className = '',
  onClick,
  footer,
  borderColor = 'border-primary-light',
  iconElement, // New prop for icon
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${borderColor} border-2 ${className}`}
      onClick={onClick}
    >
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
          />
          {/* Render the icon element if provided */}
          {iconElement}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-display text-fur-brown mb-3">{title}</h3>
        <div className="text-gray-600">{content}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </motion.div>
  );
};

export default Card;