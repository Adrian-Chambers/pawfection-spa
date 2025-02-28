"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

type TimePickerProps = {
  availableTimes: string[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
  error?: string;
};

const TimePicker: React.FC<TimePickerProps> = ({
  availableTimes,
  selectedTime,
  onSelectTime,
  error
}) => {
  // Group times by morning and afternoon
  const morningTimes = availableTimes.filter(time => time.includes('AM'));
  const afternoonTimes = availableTimes.filter(time => time.includes('PM'));
  
  // Show message if no times available
  if (availableTimes.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <FiClock className="mx-auto text-gray-400 mb-2" size={24} />
        <p className="text-gray-600">No appointment times available on this date.</p>
        <p className="text-sm text-gray-500 mt-1">Please select a different date.</p>
      </div>
    );
  }
  
  return (
    <div>
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Morning</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {morningTimes.length > 0 ? (
            morningTimes.map((time) => (
              <TimeButton
                key={time}
                time={time}
                isSelected={selectedTime === time}
                onClick={() => onSelectTime(time)}
              />
            ))
          ) : (
            <p className="col-span-full text-sm text-gray-500 py-2">No morning appointments available</p>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Afternoon</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {afternoonTimes.length > 0 ? (
            afternoonTimes.map((time) => (
              <TimeButton
                key={time}
                time={time}
                isSelected={selectedTime === time}
                onClick={() => onSelectTime(time)}
              />
            ))
          ) : (
            <p className="col-span-full text-sm text-gray-500 py-2">No afternoon appointments available</p>
          )}
        </div>
      </div>
      
      {selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-secondary-light/30 p-3 rounded-lg border border-secondary-light"
        >
          <p className="text-sm text-gray-700">
            <span className="font-medium">Selected time:</span> {selectedTime}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Please arrive 10 minutes before your appointment.
          </p>
        </motion.div>
      )}
    </div>
  );
};

interface TimeButtonProps {
  time: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeButton: React.FC<TimeButtonProps> = ({ time, isSelected, onClick }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`py-2 px-2 rounded-lg flex items-center justify-center text-sm transition-all ${
        isSelected
          ? 'bg-secondary text-secondary-dark font-medium ring-2 ring-secondary-dark'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      }`}
    >
      <FiClock className={`mr-1 ${isSelected ? 'text-secondary-dark' : 'text-gray-400'}`} />
      {time}
    </motion.button>
  );
};

export default TimePicker;