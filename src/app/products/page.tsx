// products page
import React from 'react';
import { Metadata } from 'next';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import PawPrintDivider from '@/components/ui/PawPrintDivider';
import { FiAward } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Products - Pawfection Grooming & Spa',
  description: 'Explore our premium grooming products, accessories, and treats available at Pawfection Grooming & Spa.',
};

export default function ProductsPage() {
  return (
    <div className="mt-16">
      <div className="bg-primary-light py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display text-center text-primary-dark mb-4">
            Our Pawfect Products
          </h1>
          <p className="text-center max-w-3xl mx-auto mb-0 text-lg">
            Explore our range of high-quality grooming supplies, signature shampoos, 
            accessories, and treats available in our store.
          </p>
        </div>
      </div>
      
      <PawPrintDivider />
      
      <div className="container mx-auto px-4 py-12">
        <div className="bg-accent/10 mb-12 rounded-lg p-6 flex items-start">
          <div className="mr-4 text-fur-golden">
            <FiAward size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display text-fur-brown mb-2">Signature Products</h2>
            <p className="text-gray-700">
              Our signature line of grooming products is developed by our team to provide the best care for your pet.
              These professional-grade products are the same ones we use in our salon, now available for home use!
            </p>
          </div>
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  );
}