"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StaffCard from './StaffCard';
import { StaffMember } from '@/types/staff';

type StaffGridProps = {
  staffMembers: StaffMember[];
};

// Get unique positions from staff members
const getUniquePositions = (members: StaffMember[]): string[] => {
  const positions = members.map(member => member.position);
  return ['All', ...Array.from(new Set(positions))];
};

const StaffGrid: React.FC<StaffGridProps> = ({ staffMembers }) => {
  const [selectedPosition, setSelectedPosition] = useState('All');
  const positions = useMemo(() => getUniquePositions(staffMembers), [staffMembers]);
  
  const filteredStaff = useMemo(() => {
    if (selectedPosition === 'All') {
      return staffMembers;
    }
    return staffMembers.filter(member => member.position === selectedPosition);
  }, [staffMembers, selectedPosition]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
 
  return (
    <div>
      {/* Role filter buttons */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {positions.map((position) => (
          <button
            key={position}
            onClick={() => setSelectedPosition(position)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedPosition === position
                ? 'bg-primary-dark text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {position}
          </button>
        ))}
      </div>
      
      {/* Staff grid with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPosition}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {filteredStaff.map((member) => (
            <motion.div key={member.id} variants={itemVariants} className="h-full">
              <StaffCard staffMember={member} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Show message if no staff members match the filter */}
      {filteredStaff.length === 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 my-12"
        >
          No team members found with this role.
        </motion.p>
      )}
    </div>
  );
};

export default StaffGrid;