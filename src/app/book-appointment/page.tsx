// book appointment page
import React from 'react';
import { Metadata } from 'next';
import BookingForm from '@/components/booking/BookingForm';
import { FiCalendar, FiClock, FiClipboard, FiSmile } from 'react-icons/fi';
import PawPrintDivider from '@/components/ui/PawPrintDivider';

export const metadata: Metadata = {
  title: 'Book Appointment - Pawfection Grooming & Spa',
  description: 'Schedule a grooming appointment for your furry friend at Pawfection Grooming & Spa.',
};

export default function BookAppointmentPage() {
  return (
    <div className="mt-16">
      <div className="bg-secondary-light py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display text-center text-secondary-dark mb-4">
            Book Your Pet's Spa Day
          </h1>
          <p className="text-center max-w-3xl mx-auto mb-0 text-lg">
            Treat your furry friend to the pampering they deserve at Pawfection.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border-2 border-secondary-light">
          <BookingForm />
        </div>

        <PawPrintDivider color="text-secondary" />
        
        <div className="mt-12 bg-gray-50 max-w-3xl mx-auto p-6 rounded-lg">
          <h3 className="text-lg font-display text-fur-brown mb-4">Booking Policies</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <FiClock className="mt-1 mr-2 flex-shrink-0 text-secondary-dark" />
              <span>Please arrive <strong>10 minutes before</strong> your appointment time to check in.</span>
            </li>
            <li className="flex items-start">
              <FiClock className="mt-1 mr-2 flex-shrink-0 text-secondary-dark" />
              <span>We require <strong>24 hours notice</strong> for cancellations or rescheduling.</span>
            </li>
            <li className="flex items-start">
              <FiClock className="mt-1 mr-2 flex-shrink-0 text-secondary-dark" />
              <span>Proof of vaccinations is required for all pets.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}