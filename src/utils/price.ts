import { ServicePrice } from '@/types/service';

export const formatPrice = (price: ServicePrice, size: 'small' | 'medium' | 'large' = 'medium'): number => {
  if (typeof price === 'number') {
    return price;
  }
  return price[size];
};

export const formatPriceRange = (price: ServicePrice): string => {
  if (typeof price === 'number') {
    return `$${price}`;
  }
  const prices = [price.small, price.medium, price.large];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$${min}` : `$${min}-${max}`;
};