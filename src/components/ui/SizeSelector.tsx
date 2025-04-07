"use client";
import React from 'react';
import { ServiceSize } from '@/types/service';

interface SizeSelectorProps {
  selectedSize: ServiceSize;
  onSizeChange: (size: ServiceSize) => void;
}

const SizeSelector = React.memo(({ selectedSize, onSizeChange }: SizeSelectorProps) => {
  const sizes = [
    { value: 'small' as ServiceSize, label: 'Small', weight: 'Up to 20 lbs' },
    { value: 'medium' as ServiceSize, label: 'Medium', weight: '21-50 lbs' },
    { value: 'large' as ServiceSize, label: 'Large', weight: '51+ lbs' }
  ];

  return (
    <div className="mt-8 inline-flex bg-gray-100 p-2 rounded-full">
      {sizes.map((size) => (
        <button
          key={size.value}
          onClick={() => onSizeChange(size.value)}
          className={`px-6 py-2 rounded-full transition-all text-sm flex flex-col items-center ${
            selectedSize === size.value
              ? 'bg-primary text-primary-dark font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>{size.label}</span>
          <span className="text-xs mt-0.5">{size.weight}</span>
        </button>
      ))}
    </div>
  );
});

SizeSelector.displayName = 'SizeSelector';

export default SizeSelector; 