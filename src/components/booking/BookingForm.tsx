"use client";
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiArrowLeft, FiArrowRight, FiCheck, FiCalendar, FiClock, FiInfo, FiAlertCircle, FiDollarSign } from 'react-icons/fi';
import Button from '../ui/Button';
import ServiceSelector from './ServiceSelector';
import TimePicker from './TimePicker';
import BookingConfirmation from './BookingConfirmation';
import useBooking from '@/hooks/useBooking';
import { services } from '@/data/services';
import { formatPrice } from '@/utils/price';

// Filter to get only the a la carte services
const additionalServices = services.filter(service => service.category === 'alaCarte');

// Size data with weight ranges
const sizeData = [
  { value: 'small', label: 'Small', weight: 'Up to 20 lbs' },
  { value: 'medium', label: 'Medium', weight: '21-50 lbs' },
  { value: 'large', label: 'Large', weight: '51+ lbs' }
];

// Function to get weight range by size
const getWeightRangeBySize = (size: string): string => {
  const sizeInfo = sizeData.find(s => s.value === size);
  return sizeInfo ? sizeInfo.weight : '';
};

// Common input field component
const FormField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  onBlur,
  error, 
  touched,
  type = "text", 
  placeholder = "",
  required = false,
  className = ""
}: { 
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full border rounded-lg p-2.5 focus:ring-2 focus:outline-none transition-colors ${
            touched && error
              ? 'border-red-300 focus:ring-red-200'
              : touched && !error
                ? 'border-green-300 focus:ring-green-200'
                : 'border-gray-300 focus:ring-primary focus:border-primary'
          }`}
          placeholder={placeholder}
          required={required}
        />
        {touched && error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FiAlertCircle className="text-red-500" />
          </div>
        )}
        {touched && !error && value && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FiCheck className="text-green-500" />
          </div>
        )}
      </div>
      {touched && error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

const BookingForm = () => {
  const {
    formData,
    updateField,
    handleBlur,
    handleCheckboxChange,
    step,
    nextStep,
    prevStep,
    isSubmitting,
    submitForm,
    isSuccess,
    setIsSuccess,
    resetForm,
    error,
    errors,
    touched,
    isStepValid,
    totalPrice,
    availableTimes
  } = useBooking();
  
  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };
  
  // Get the selected service name
  const selectedServiceName = React.useMemo(() => {
    const service = services.find(s => s.id === formData.service);
    return service?.name || '';
  }, [formData.service]);
  
  // Filter available dates - no past dates, Sundays, or fully booked days
  const filterDate = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // No Sundays (0) or days in the past
    return day !== 0 && date >= today;
  };
  
  // Custom Date Header for the date picker
  const renderDateHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: any) => (
    <div className="flex justify-between items-center px-2 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type="button"
        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <FiArrowLeft size={20} />
      </button>
      <h3 className="text-base font-medium text-fur-brown">
        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h3>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type="button"
        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <FiArrowRight size={20} />
      </button>
    </div>
  );
  
  // Helper to highlight dates on the calendar
  const renderDayContents = (day: number, date: Date) => {
    // Get day of week to style weekends differently
    const dayOfWeek = date.getDay();
    // Check if date is today
    const isToday = new Date().toDateString() === date.toDateString();
    
    return (
      <div 
        className={`h-7 w-7 flex items-center justify-center rounded-full
          ${isToday ? 'bg-secondary-light text-secondary-dark font-medium' : ''}
          ${dayOfWeek === 6 ? 'text-primary-dark' : ''}
          ${dayOfWeek === 0 ? 'text-red-400' : ''}
        `}
      >
        {day}
      </div>
    );
  };
  
  // Function to handle "Book Another Appointment"
  const handleBookAnother = () => {
    setIsSuccess(false);
    resetForm();
  };
  
  // If booking is successful, show confirmation screen
  if (isSuccess) {
    return (
      <BookingConfirmation
        petName={formData.petName}
        ownerName={formData.ownerName}
        serviceName={selectedServiceName}
        date={formData.date}
        time={formData.time}
        email={formData.email}
        phone={formData.phone}
        totalPrice={totalPrice}
        onBookAnother={handleBookAnother}
      />
    );
  }
  
  return (
    <div>
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-sm"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-red-800 font-medium">There was an error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  step > i 
                    ? 'bg-primary-dark text-white'
                    : step === i
                      ? 'bg-primary text-white ring-4 ring-primary-light'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > i ? <FiCheck /> : i}
              </motion.div>
              <span className="text-xs mt-1 text-gray-500">
                {i === 1 ? 'Your Info' : i === 2 ? 'Services' : i === 3 ? 'Schedule' : 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 rounded-full bg-gray-200">
          <motion.div
            initial={{ width: `${((step - 1) / 4) * 100}%` }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="bg-primary-dark h-2 rounded-full"
          ></motion.div>
        </div>
      </div>
      
      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h3 className="text-xl font-display text-fur-brown mb-6">Your Information</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  id="ownerName"
                  label="Your Name"
                  value={formData.ownerName}
                  onChange={(e) => updateField('ownerName', e.target.value)}
                  onBlur={() => handleBlur('ownerName')}
                  error={errors.ownerName}
                  touched={touched.ownerName}
                  placeholder="Enter your name"
                  required
                />
                
                <FormField
                  id="petName"
                  label="Pet's Name"
                  value={formData.petName}
                  onChange={(e) => updateField('petName', e.target.value)}
                  onBlur={() => handleBlur('petName')}
                  error={errors.petName}
                  touched={touched.petName}
                  placeholder="Enter your pet's name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="petType" className="block text-gray-700 mb-1">Pet Type</label>
                  <select
                    id="petType"
                    value={formData.petType}
                    onChange={(e) => updateField('petType', e.target.value)}
                    className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat (Limited Services)</option>
                  </select>
                </div>
                
                {formData.petType === 'dog' && (
                  <div>
                    <label htmlFor="breed" className="block text-gray-700 mb-1">Breed (Optional)</label>
                    <input
                      id="breed"
                      type="text"
                      value={formData.breed || ''}
                      onChange={(e) => updateField('breed', e.target.value)}
                      className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                      placeholder="E.g., Golden Retriever"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="petSize" className="block text-gray-700 mb-1">Pet Size</label>
                <div className="flex space-x-2">
                  {sizeData.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => updateField('size', size.value)}
                      className={`flex-1 py-2 px-1 rounded-lg transition-all ${
                        formData.size === size.value
                          ? 'bg-secondary text-secondary-dark font-medium ring-2 ring-secondary'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{size.label}</span>
                        <span className="text-xs mt-0.5">{size.weight}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  id="email"
                  label="Email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  type="email"
                  placeholder="your@email.com"
                  required
                />
                
                <FormField
                  id="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  error={errors.phone}
                  touched={touched.phone}
                  type="tel"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h3 className="text-xl font-display text-fur-brown mb-6">Select Services</h3>
            
            <ServiceSelector
              services={services}
              selectedService={formData.service}
              onSelect={(id) => updateField('service', id)}
              serviceSize={formData.size}
              error={errors.service}
            />
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-fur-brown mb-4">Additional Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {additionalServices.map((service) => (
                  <div 
                    key={service.id} 
                    className={`flex items-start p-3 rounded-lg cursor-pointer transition-all 
                      ${formData.additionalServices.includes(service.id) 
                        ? 'bg-secondary-light/30 border border-secondary-light' 
                        : 'hover:bg-gray-50 border border-gray-100'}`}
                    onClick={() => handleCheckboxChange(service.id)}
                  >
                    <input
                      id={`service-${service.id}`}
                      type="checkbox"
                      checked={formData.additionalServices.includes(service.id)}
                      onChange={() => handleCheckboxChange(service.id)}
                      className="h-5 w-5 mt-0.5 text-primary-dark border-gray-300 rounded focus:ring-primary-dark"
                    />
                    <label htmlFor={`service-${service.id}`} className="ml-3 cursor-pointer flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 block">{service.name}</span>
                        <span className="text-primary-dark font-medium">
                          ${formatPrice(service.price, formData.size)}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm block">{service.description}</span>
                    </label>
                    {service.icon && (
                      <div className="ml-2 h-9 w-9 flex-shrink-0">
                        <Image 
                          src={service.icon}
                          alt={service.name}
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price summary */}
            {formData.service && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h4 className="font-medium text-gray-700 flex items-center mb-3">
                  <FiDollarSign className="mr-1" />
                  Price Summary
                </h4>
                <div className="space-y-2">
                  {formData.service && (
                    <div className="flex justify-between text-sm">
                      <span>{services.find(s => s.id === formData.service)?.name}</span>
                      <span className="font-medium">
                        ${formatPrice(
                          services.find(s => s.id === formData.service)?.price || 0, 
                          formData.size
                        )}
                      </span>
                    </div>
                  )}
                  
                  {formData.additionalServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex justify-between text-sm">
                        <span>{service.name}</span>
                        <span className="font-medium">
                          ${formatPrice(service.price, formData.size)}
                        </span>
                      </div>
                    ) : null;
                  })}
                  
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-primary-dark">${totalPrice}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            key="step3"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h3 className="text-xl font-display text-fur-brown mb-6">Schedule Appointment</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-3">Select Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date: Date | null) => updateField('date', date)}
                    filterDate={filterDate}
                    minDate={new Date()}
                    className={`border rounded-lg p-2.5 pl-10 w-full focus:ring-2 focus:outline-none transition-colors ${
                      touched.date && errors.date
                        ? 'border-red-300 focus:ring-red-200'
                        : touched.date && !errors.date
                          ? 'border-green-300 focus:ring-green-200'
                          : 'border-gray-300 focus:ring-primary focus:border-primary'
                    }`}
                    placeholderText="Select a date"
                    dateFormat="MMMM d, yyyy"
                    required
                    inline
                    renderCustomHeader={renderDateHeader}
                    renderDayContents={renderDayContents}
                  />
                </div>
                {touched.date && errors.date && (
                  <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-3">Select Time</label>
                <TimePicker
                  availableTimes={availableTimes}
                  selectedTime={formData.time}
                  onSelectTime={(time) => updateField('time', time)}
                  error={touched.time ? errors.time : undefined}
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-gray-700 mb-1">Special Instructions (Optional)</label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={4}
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                  placeholder="Any special needs or requests..."
                ></textarea>
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 4 && (
          <motion.div
            key="step4"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h3 className="text-xl font-display text-fur-brown mb-6">Review Your Booking</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-medium text-gray-700 mb-4">Appointment Details</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pet Name:</span>
                  <span className="font-medium">{formData.petName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Owner:</span>
                  <span className="font-medium">{formData.ownerName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Pet Size:</span>
                  <span className="font-medium capitalize">
                    {formData.size} ({getWeightRangeBySize(formData.size)})
                  </span>
                </div>
                
                {formData.breed && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Breed:</span>
                    <span className="font-medium">{formData.breed}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                
                <div className="border-t border-gray-200 my-3"></div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Primary Service:</span>
                  <span className="font-medium">
                    {services.find(s => s.id === formData.service)?.name || 'None selected'}
                  </span>
                </div>
                
                {formData.additionalServices.length > 0 && (
                  <div>
                    <span className="text-gray-500">Additional Services:</span>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {formData.additionalServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        return service ? (
                          <li key={serviceId} className="text-sm">
                            {service.name} - ${formatPrice(service.price, formData.size)}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
                
                <div className="border-t border-gray-200 my-3"></div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">
                    {formData.date ? formData.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{formData.time}</span>
                </div>
                
                {formData.notes && (
                  <div>
                    <span className="text-gray-500">Special Instructions:</span>
                    <p className="text-sm mt-1 italic">{formData.notes}</p>
                  </div>
                )}
                
                <div className="border-t border-gray-200 my-3"></div>
                
                <div className="flex justify-between font-medium text-lg">
                  <span className="text-gray-700">Total:</span>
                  <span className="text-primary-dark">${totalPrice}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary-light/20 p-4 rounded-lg border-l-4 border-secondary mb-6">
              <div className="flex">
                <FiInfo className="text-secondary-dark flex-shrink-0 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-700">
                    By confirming this appointment, you agree to our cancellation policy. Please provide at least 24 hours notice if you need to cancel or reschedule. Proof of vaccinations will be required at check-in.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <Button
            onClick={prevStep}
            variant="secondary"
            icon={<FiArrowLeft />}
          >
            Back
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
        
        {step < 4 ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            icon={<FiArrowRight />}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={submitForm}
            disabled={isSubmitting}
            className="min-w-[140px]"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;