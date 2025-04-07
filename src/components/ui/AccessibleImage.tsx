import React from 'react';
import Image from 'next/image';

interface AccessibleImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  loading?: 'lazy' | 'eager';
}

const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  fill = false,
  objectFit = 'cover',
  quality = 75,
  loading = 'lazy',
}) => {
  // Generate a unique ID for the image description
  const descriptionId = `image-description-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative" role="img" aria-labelledby={descriptionId}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`${className} ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
        sizes={sizes}
        fill={fill}
        quality={quality}
        loading={loading}
      />
      <span id={descriptionId} className="sr-only">
        {alt}
      </span>
    </div>
  );
};

export default AccessibleImage; 