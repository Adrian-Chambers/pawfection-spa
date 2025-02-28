import React from 'react';
import { Metadata } from 'next';
import StaffGrid from '@/components/staff/StaffGrid';
import { staffMembers } from '@/data/staff';
import PawPrintDivider from '@/components/ui/PawPrintDivider';
import TeamValuesSection from '@/components/staff/TeamValuesSection';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Team - Pawfection Grooming & Spa',
  description: 'Meet our team of professional dog groomers and spa specialists at Pawfection Grooming & Spa.',
};

export default function StaffPage() {
  return (
    <div className="mt-16">
      {/* Hero banner with background image */}
      <div className="relative bg-primary-light py-16">

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-display text-center text-primary-dark mb-4">
            Meet Our Pawsome Team
          </h1>
          <p className="text-center max-w-3xl mx-auto mb-0 text-lg">
            Our passionate groomers combine expertise with love for every furry friend
            that visits Pawfection Grooming & Spa.
          </p>
        </div>
      </div>
     
      {/* Staff grid with filtering */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-display text-center text-primary-dark mb-8">
          The Faces Behind Pawfection
        </h2>
        <StaffGrid staffMembers={staffMembers} />
      </div>
      
      {/* Team certifications section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-center text-primary-dark mb-8">
            Our Certifications & Training
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-display text-fur-brown mb-3">Professional Certifications</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">•</span>
                  Certified Professional Pet Groomers
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">•</span>
                  Pet CPR & First Aid Certified
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">•</span>
                  Animal Behavior Specialists
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-display text-fur-brown mb-3">Ongoing Education</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">•</span>
                  Annual grooming conventions & workshops
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">•</span>
                  Breed-specific training courses
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">•</span>
                  Latest pet care & safety techniques
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <PawPrintDivider />

      {/* Team Values Section */}
      <TeamValuesSection />
     
      <PawPrintDivider />
      
      {/* Join our team section */}
      <div className="container mx-auto px-4 py-12 text-center max-w-3xl">
        <h2 className="text-3xl font-display text-primary-dark mb-4">
          Join Our Team
        </h2>
        <p className="mb-6">
          Passionate about pets? We're always looking for talented groomers to join the Pawfection family.
          Send your resume to <a href="mailto:careers@pawfection.com" className="text-secondary-dark hover:underline">careers@pawfection.com</a>
        </p>
      </div>
    </div>
  );
}