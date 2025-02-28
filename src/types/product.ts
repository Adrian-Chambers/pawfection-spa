export type ProductCategory = 'shampoo' | 'conditioner' | 'tools' | 'accessories' | 'treats';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  isSignature?: boolean;
  inStock: boolean;
  icon?: string;
}