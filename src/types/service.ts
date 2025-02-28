// service.ts
export type ServiceSize = 'small' | 'medium' | 'large';

export type ServicePrice = {
  small: number;
  medium: number;
  large: number;
} | number;

export interface Service {
  id: string;
  name: string;
  description: string;
  price: ServicePrice;
  includes: string[];
  image: string;
  category: 'package' | 'alaCarte';
  type?: string;
  icon?: string;
}

export interface SpecialProgram {
  id: string;
  name: string;
  description: string;
  price?: number | string;
  features: string[];
  image: string;
  type?: string;
  icon?: string;
}

// event.ts
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  category: 'photo' | 'adoption' | 'holiday' | 'other';
  type?: string;
  icon?: string;
}