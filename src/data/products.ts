import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'signature-shampoo',
    name: 'Pawfection Signature Shampoo',
    description: 'Our own gentle, moisturizing formula for all coat types. Leaves fur soft and shiny.',
    price: 18.99,
    category: 'shampoo',
    image: '/images/products/signature-shampoo.jpg',
    isSignature: true,
    inStock: true
  },
  {
    id: 'oatmeal-shampoo',
    name: 'Soothing Oatmeal Shampoo',
    description: 'Perfect for dogs with sensitive skin or allergies. Reduces itching and irritation.',
    price: 21.99,
    category: 'shampoo',
    image: '/images/products/oatmeal-shampoo.jpg',
    isSignature: true,
    inStock: true
  },
  {
    id: 'deshedding-shampoo',
    name: 'De-Shedding Formula Shampoo',
    description: 'Reduces shedding by up to 80%. Recommended for double-coated breeds.',
    price: 24.99,
    category: 'shampoo',
    image: '/images/products/deshedding-shampoo.jpg',
    isSignature: true,
    inStock: true
  },
  {
    id: 'conditioner',
    name: 'Silky Smooth Conditioner',
    description: 'Deep conditioning treatment that detangles and nourishes the coat.',
    price: 19.99,
    category: 'conditioner',
    image: '/images/products/conditioner.jpg',
    isSignature: true,
    inStock: true
  },
  {
    id: 'slicker-brush',
    name: 'Premium Slicker Brush',
    description: 'Professional-grade brush for detangling and removing loose fur.',
    price: 29.99,
    category: 'tools',
    image: '/images/products/slicker-brush.jpg',
    inStock: true
  },
  {
    id: 'nail-clippers',
    name: 'Safety Nail Clippers',
    description: 'Easy-to-use nail clippers with safety guard to prevent overcutting.',
    price: 15.99,
    category: 'tools',
    image: '/images/products/nail-clippers.jpg',
    inStock: true
  },
  {
    id: 'bandana',
    name: 'Pawfection Bandana',
    description: 'Stylish bandanas in various patterns to keep your pup looking fashionable.',
    price: 9.99,
    category: 'accessories',
    image: '/images/products/bandana.jpg',
    inStock: true
  },
  {
    id: 'bow-ties',
    name: 'Clip-On Bow Ties',
    description: 'Adorable clip-on bow ties for special occasions. Available in multiple colors.',
    price: 8.99,
    category: 'accessories',
    image: '/images/products/bow-tie.jpg',
    inStock: true
  },
  {
    id: 'organic-treats',
    name: 'Organic Peanut Butter Treats',
    description: 'House-made treats with natural ingredients. No preservatives or additives.',
    price: 12.99,
    category: 'treats',
    image: '/images/products/treats.jpg',
    isSignature: true,
    inStock: true
  }
];