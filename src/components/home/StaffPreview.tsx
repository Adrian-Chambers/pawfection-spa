"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { staffMembers } from '@/data/staff';
import { useHydrated } from '@/hooks/useHydrated';

const StaffPreview = () => {
  // Get the first 3 staff members for the preview
  const previewStaff = staffMembers.slice(0, 3);
  const isHydrated = useHydrated();
  
  // Section title with conditional rendering
  const SectionTitle = () => {
    const titleContent = (
      <>
        <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
          Meet Our Groomers
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our team of certified professional groomers is passionate about pets and committed to providing the best care.
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
  
  // Staff cards with conditional rendering
  const StaffCards = () => {
    const renderStaffMember = (member: any, index: number) => {
      const staffContent = (
        <>
          <div className="mb-4 relative mx-auto h-56 w-56 rounded-full overflow-hidden border-4 border-primary-light">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-display text-fur-brown mb-1">
            {member.name}
          </h3>
          <p className="text-secondary-dark font-medium mb-2">
            {member.position}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Experience:</span> {member.yearsExperience} years
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Specialty:</span> {member.specialty}
          </p>
        </>
      );
      
      if (!isHydrated) {
        return (
          <div key={member.id} className="text-center">
            {staffContent}
          </div>
        );
      }
      
      return (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          {staffContent}
        </motion.div>
      );
    };
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {previewStaff.map((member, index) => renderStaffMember(member, index))}
      </div>
    );
  };
  
  return (
    <section className="py-16 container mx-auto px-4">
      <SectionTitle />
      <StaffCards />
      
      <div className="text-center">
        <Button href="/staff" variant="secondary">
          Meet the Entire Team
        </Button>
      </div>
    </section>
  );
};

export default StaffPreview;