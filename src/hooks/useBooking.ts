"use client";
import { useState, useEffect } from 'react';
import { Service, ServiceSize } from '@/types/service';

export type FormErrors = {
  ownerName?: string;
  petName?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
};

type FormData = {
  ownerName: string;
  petName: string;
  petType: string;
  email: string;
  phone: string;
  size: ServiceSize;
  service: string;
  additionalServices: string[];
  date: Date | null; 
  time: string;
  notes: string;
  breed?: string;
};

const initialFormData: FormData = {
  ownerName: '',
  petName: '',
  petType: 'dog',
  email: '',
  phone: '',
  size: 'medium',
  service: '',
  additionalServices: [],
  date: null,
  time: '',
  notes: '',
  breed: '',
};

export const useBooking = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  
  // Set of available times - in a real app, this would come from your backend
  const defaultTimeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];
  
  // Get available times for the selected date
  useEffect(() => {
    if (formData.date) {
      // Simulate checking availability from backend
      // In a real app, you'd fetch this from your API
      const dayOfWeek = formData.date.getDay();
      
      // Simulate some time slots being booked on different days
      const simulateBookedSlots = () => {
        // Monday has early morning slots booked
        if (dayOfWeek === 1) return defaultTimeSlots.filter(t => !t.includes('9:'));
        // Wednesday has afternoon slots booked
        if (dayOfWeek === 3) return defaultTimeSlots.filter(t => !t.includes('PM'));
        // Friday has mid-day slots booked
        if (dayOfWeek === 5) return defaultTimeSlots.filter(t => !t.includes('11:') && !t.includes('1:'));
        // Otherwise all slots available
        return [...defaultTimeSlots];
      };
      
      setAvailableTimes(simulateBookedSlots());
      
      // Reset time if the previously selected time is not available
      if (formData.time && !simulateBookedSlots().includes(formData.time)) {
        updateField('time', '');
      }
    }
  }, [formData.date]);

  // Update total price when relevant fields change
  useEffect(() => {
    // This calculation would be more sophisticated in a real app
    // Ideally, you'd use a separate function to calculate this
    let price = 0;
    
    // Calculate price based on services, size, etc.
    // This is a placeholder for demonstration purposes
    if (formData.service === 'basic-groom') {
      price += formData.size === 'small' ? 45 : (formData.size === 'medium' ? 60 : 75);
    } else if (formData.service === 'deluxe-groom') {
      price += formData.size === 'small' ? 65 : (formData.size === 'medium' ? 80 : 95);
    } else if (formData.service === 'spa-day') {
      price += formData.size === 'small' ? 85 : (formData.size === 'medium' ? 100 : 115);
    }
    
    // Add additional services
    formData.additionalServices.forEach(service => {
      if (service === 'nail-trim') price += 15;
      if (service === 'deshedding') price += 25;
      if (service === 'teeth-brushing') price += 10;
      if (service === 'flea-treatment') price += 20;
    });
    
    setTotalPrice(price);
  }, [formData.service, formData.size, formData.additionalServices]);
  
  // Validate form fields
  const validate = (data: FormData, currentStep: number): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (currentStep === 1) {
      if (!data.ownerName) newErrors.ownerName = "Please enter your name";
      else if (data.ownerName.length < 2) newErrors.ownerName = "Name must be at least 2 characters";
      
      if (!data.petName) newErrors.petName = "Please enter your pet's name";
      
      if (!data.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Please enter a valid email";
      
      if (!data.phone) newErrors.phone = "Phone number is required";
      else if (!/^[\d\s\-\(\)]+$/.test(data.phone)) newErrors.phone = "Please enter a valid phone number";
    }
    
    if (currentStep === 2) {
      if (!data.service) newErrors.service = "Please select a service";
    }
    
    if (currentStep === 3) {
      if (!data.date) newErrors.date = "Please select a date";
      if (!data.time) newErrors.time = "Please select a time";
    }
    
    return newErrors;
  };
  
  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate the field if it's been touched
    const fieldErrors = validate({ ...formData, [field]: value }, step);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
  };
  
  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate the field on blur
    const fieldErrors = validate(formData, step);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
  };
  
  const handleCheckboxChange = (service: string) => {
    setFormData(prev => {
      const current = [...prev.additionalServices];
      
      if (current.includes(service)) {
        return { 
          ...prev, 
          additionalServices: current.filter(item => item !== service) 
        };
      } else {
        return { 
          ...prev, 
          additionalServices: [...current, service] 
        };
      }
    });
  };
  
  const nextStep = () => {
    // Validate all fields for current step
    const stepErrors = validate(formData, step);
    setErrors(stepErrors);
    
    // Mark all fields for this step as touched
    const stepFields = getFieldsForStep(step);
    const newTouched: Record<string, boolean> = { ...touched };
    stepFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);
    
    // Only proceed if there are no errors
    if (Object.keys(stepErrors).length === 0) {
      setStep(prev => prev + 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Helper to get fields for the current step (for validation)
  const getFieldsForStep = (stepNum: number): string[] => {
    switch (stepNum) {
      case 1:
        return ['ownerName', 'petName', 'email', 'phone'];
      case 2:
        return ['service'];
      case 3:
        return ['date', 'time'];
      default:
        return [];
    }
  };
  
  // Check if the current step is valid
  const isStepValid = (): boolean => {
    const stepErrors = validate(formData, step);
    return Object.keys(stepErrors).length === 0;
  };
  
  // Reset the form to initial state
  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setStep(1);
    setError('');
  };
  
  const submitForm = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Here you would connect to your backend API
      // This is just a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate submission success
      setIsSuccess(true);
      // Note: We're NOT resetting the form here anymore since we show a confirmation screen
    } catch (err) {
      setError('An error occurred while submitting your booking. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
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
  };
};

export default useBooking;