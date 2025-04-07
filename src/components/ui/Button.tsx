"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  disabled
}) => {
  const baseStyles = 'rounded-full font-medium inline-flex items-center justify-center transition-all duration-300 shadow-md';
  
  const variantStyles = {
    primary: 'bg-primary-dark text-white hover:bg-primary hover:text-primary-dark',
    secondary: 'bg-secondary-dark text-white hover:bg-secondary hover:text-secondary-dark',
    accent: 'bg-accent text-fur-brown hover:bg-yellow-300 shadow-lg border border-yellow-400',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3.5',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-7',
  };
  
  const buttonContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  // If href is provided, render a Link
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={buttonStyles}
        >
          {buttonContent}
        </motion.a>
      </Link>
    );
  }
  
  // Otherwise, render a button
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;