"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { FiAward, FiShoppingBag, FiCheckCircle, FiXCircle } from 'react-icons/fi';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, category, image, isSignature, inStock } = product;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-primary-light h-full flex flex-col"
    >
      <div className="relative h-56">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        {isSignature && (
          <div className="absolute top-0 right-0 bg-accent p-2 rounded-bl-lg">
            <FiAward className="text-fur-brown" size={20} />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary-light text-secondary-dark capitalize">
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-display text-fur-brown mb-1">{name}</h3>
        <p className="text-gray-600 mb-4 text-sm flex-grow">{description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-display text-primary-dark">${price.toFixed(2)}</span>
          <div className={`flex items-center text-sm ${inStock ? 'text-green-600' : 'text-red-500'}`}>
            {inStock ? (
              <>
                <FiCheckCircle className="mr-1" />
                <span>In Stock</span>
              </>
            ) : (
              <>
                <FiXCircle className="mr-1" />
                <span>Out of Stock</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;