import { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'basic-groom',
    name: 'Basic Groom Package',
    description: 'Essential grooming care for your dog',
    price: {
      small: 45,
      medium: 60,
      large: 75,
    },
    includes: [
      'Bath with premium shampoo',
      'Blow dry and brush out',
      'Nail trim and filing',
      'Ear cleaning',
      'Sanitary trim'
    ],
    image: '/images/services/basic-groom.jpg',
    category: 'package',
    icon: '/images/icons/bath.png'
  },
  {
    id: 'deluxe-groom',
    name: 'Deluxe Groom Package',
    description: 'Comprehensive grooming experience',
    price: {
      small: 65,
      medium: 80,
      large: 95,
    },
    includes: [
      'Everything in Basic Package',
      'Full haircut/styling',
      'Teeth brushing',
      'Paw pad trim',
      'Cologne spritz'
    ],
    image: '/images/services/deluxe-groom.jpg',
    category: 'package',
    icon: '/images/icons/table.png'
  },
  {
    id: 'spa-day',
    name: 'Pawfection Spa Day Package',
    description: 'The ultimate pampering experience',
    price: {
      small: 85,
      medium: 100,
      large: 115,
    },
    includes: [
      'Everything in Deluxe Package',
      'Blueberry facial',
      'Moisturizing paw treatment',
      'De-shedding treatment',
      'Massage therapy'
    ],
    image: '/images/services/spa-day.jpg',
    category: 'package',
    icon: '/images/icons/facial-mask.png'
  },
  {
    id: 'nail-trim',
    name: 'Nail Trim',
    description: 'Quick and painless nail trimming',
    price: 15,
    includes: ['Professional nail trimming', 'Nail filing'],
    image: '/images/services/nail-trim.jpg',
    category: 'alaCarte',
    icon: '/images/icons/nail.png'
  },
  {
    id: 'deshedding',
    name: 'De-shedding Treatment',
    description: 'Reduce shedding and keep your home cleaner',
    price: 25,
    includes: ['Specialized shampoo', 'Thorough brush-out', 'Targeted deshedding tools'],
    image: '/images/services/deshedding.jpg',
    category: 'alaCarte',
    icon: '/images/icons/brush.png'
  },
  {
    id: 'teeth-brushing',
    name: 'Teeth Brushing',
    description: 'Maintain your pet\'s dental health',
    price: 10,
    includes: ['Pet-safe toothpaste', 'Gentle brushing', 'Breath freshening'],
    image: '/images/services/teeth-brushing.jpg',
    category: 'alaCarte',
    icon: '/images/icons/brush-teeth.png'
  },
  {
    id: 'flea-treatment',
    name: 'Flea Treatment',
    description: 'Effective flea removal and prevention',
    price: 20,
    includes: ['Flea inspection', 'Medicated bath', 'Application of treatment'],
    image: '/images/services/flea-treatment.jpg',
    category: 'alaCarte',
    icon: '/images/icons/flea.png'
  },
];