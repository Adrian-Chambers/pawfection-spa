"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product, ProductCategory } from '@/types/product';

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  
  const categories: Array<ProductCategory | 'all'> = ['all', 'shampoo', 'conditioner', 'tools', 'accessories', 'treats'];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-dark font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
      
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Note: Our products are available for purchase in-store. Online ordering coming soon!
        </p>
      </div>
    </div>
  );
};

export default ProductGrid;