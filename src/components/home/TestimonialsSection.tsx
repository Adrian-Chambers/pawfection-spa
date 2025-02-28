"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Carousel from '../ui/Carousel';
import { testimonials } from '@/data/testimonials';
import { FiStar } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const generateStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <FiStar
      key={i}
      className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

const TestimonialCard = ({ name, avatar, comment, rating, petType, date }: any) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 mx-auto max-w-2xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">Pet parent to {petType}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {generateStars(rating)}
      </div>
      
      <blockquote className="mb-4 italic text-gray-600">
        "{comment}"
      </blockquote>
      
      <div className="text-sm text-gray-500">
        {date}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const isHydrated = useHydrated();
  
  const testimonialItems = testimonials.map((testimonial) => (
    <div key={testimonial.id} className="px-4 py-6">
      <TestimonialCard {...testimonial} />
    </div>
  ));
  
  // Section title with conditional rendering
  const SectionTitle = () => {
    const titleContent = (
      <>
        <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
          Happy Customers & Pets
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Don't just take our word for it. Here's what our customers have to say!
        </p>
      </>
    );
    
    if (!isHydrated) {
      return <div className="text-center mb-12">{titleContent}</div>;
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {titleContent}
      </motion.div>
    );
  };
  
  return (
    <section className="py-16 bg-primary-light">
      <div className="container mx-auto px-4">
        <SectionTitle />
        
        <div className="max-w-4xl mx-auto">
          <Carousel 
            items={testimonialItems} 
            interval={6000}
            fixedHeight={350}
            className="mb-8"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;