"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheck, FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiSmile } from 'react-icons/fi';
import Button from '../ui/Button';

type BookingConfirmationProps = {
  petName: string;
  ownerName: string;
  serviceName: string;
  date: Date | null;
  time: string;
  email: string;
  phone: string;
  totalPrice: number;
  onBookAnother: () => void;
};

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  petName,
  ownerName,
  serviceName,
  date,
  time,
  email,
  phone,
  totalPrice,
  onBookAnother
}) => {
  // Generate a random confirmation number
  const confirmationNumber = React.useMemo(() => {
    return `PF${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-6"
    >
      <div className="mb-6 inline-flex items-center justify-center bg-green-100 rounded-full p-4">
        <FiCheck className="text-green-500" size={40} />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-display text-fur-brown mb-4">
        Booking Confirmed!
      </h2>
      
      <p className="text-gray-600 max-w-lg mx-auto mb-8">
        Thank you for booking with Pawfection Grooming & Spa. We've sent a confirmation 
        email to <span className="font-medium">{email}</span> with all the details.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
        <h3 className="font-medium text-gray-700 mb-4 text-lg">Appointment Details</h3>
        
        <div className="space-y-3 text-left">
          <div className="flex items-center">
            <FiCalendar className="text-primary-dark mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'Not selected'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <FiClock className="text-primary-dark mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{time}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <FiSmile className="text-primary-dark mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium">{serviceName}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <FiUser className="text-primary-dark mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Pet</p>
              <p className="font-medium">{petName}</p>
            </div>
          </div>
          
          <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between">
            <p className="font-medium">Total:</p>
            <p className="font-medium text-primary-dark">${totalPrice}</p>
          </div>
          
          <div className="pt-3 mt-3 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">Confirmation #: {confirmationNumber}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button 
          onClick={onBookAnother}
          variant="primary"
          icon={<FiCalendar />}
          className="w-full md:w-auto"
        >
          Book Another Appointment
        </Button>
        
        <Link href="/" passHref>
          <Button 
            variant="secondary"
            className="w-full md:w-auto"
          >
            Return to Homepage
          </Button>
        </Link>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Need to make changes? Call us at (555) 123-4567</p>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;