import { Program } from '@/types/program';

export const programs: Program[] = [
  {
    id: 'vip-membership',
    name: 'VIP Membership',
    slug: 'vip-membership',
    description: 'Exclusive care and shop benefits for our regular clients',
    longDescription: 'Our VIP Membership is designed for pet parents who want the absolute best care for their furry friends. By becoming a VIP member, you\'ll enjoy priority services, exclusive discounts, and special perks that make grooming a breeze.',
    price: '$29.99/month',
    image: '/images/services/vip-membership.jpg',
    features: [
      'One basic groom per month',
      '15% off additional services',
      '10% off retail products',
      'Priority booking'
    ],
    benefits: [
      'Save money on regular grooming',
      'Consistent and predictable pet care',
      'Stress-free booking process',
      'Personalized grooming experience'
    ],
    requirements: [
      'Must be a current client',
      'Dogs must be up-to-date on vaccinations',
      'Membership is month-to-month with no long-term commitment'
    ],
    faq: [
      {
        question: 'Can I cancel my membership at any time?',
        answer: 'Yes, you can cancel your VIP membership at any time with no penalties.'
      },
      {
        question: 'What if I don\'t use my monthly groom?',
        answer: 'Monthly grooms do not roll over. They are meant to be used within the membership month.'
      },
      {
        question: 'Are there any additional fees?',
        answer: 'The monthly fee covers one basic groom. Additional services or upgrades will be charged at a discounted rate.'
      }
    ]
  },
  {
    id: 'breed-specific',
    name: 'Breed-Specific Grooming',
    slug: 'breed-specific-grooming',
    description: 'Specialized care for your dog\'s unique needs',
    longDescription: 'Every breed has unique grooming requirements. Our breed-specific grooming service ensures your dog receives expert care tailored precisely to their breed\'s coat type, skin sensitivity, and aesthetic standards.',
    price: 'Varies by breed and size',
    image: '/images/services/breed-specific.jpg',
    features: [
      'Specialized techniques for different coat types',
      'Breed-standard cuts available',
      'Professional groomers certified in breed-specific styling'
    ],
    benefits: [
      'Maintains breed-specific coat health',
      'Professional, precise styling',
      'Prevents matting and skin issues',
      'Enhances your dog\'s natural beauty'
    ],
    requirements: [
      'Consultation required before first appointment',
      'Some breeds may require multiple sessions',
      'Additional prep work may incur extra charges'
    ],
    faq: [
      {
        question: 'Do you groom all dog breeds?',
        answer: 'We specialize in most common breeds. We recommend scheduling a consultation to discuss your specific breed.'
      },
      {
        question: 'How long does a breed-specific groom take?',
        answer: 'Timing varies by breed and coat complexity. Typically 1-3 hours.'
      }
    ]
  },
  {
    id: 'first-groom',
    name: 'Puppy\'s First Groom',
    slug: 'puppys-first-groom',
    description: 'A gentle introduction to grooming for puppies',
    longDescription: 'Your puppy\'s first grooming experience is crucial in establishing a positive lifelong relationship with grooming. Our specially designed first groom package focuses on creating a calm, positive, and fun environment for your young pet.',
    price: 'Starting at $45',
    image: '/images/services/first-groom.jpg',
    features: [
      'Gentle introduction to grooming',
      'Extra patience and handling',
      'Complimentary photo of first groom',
      'Take-home puppy grooming guide'
    ],
    benefits: [
      'Builds positive associations with grooming',
      'Reduces future grooming anxiety',
      'Teaches puppies to be comfortable being handled',
      'Establishes good grooming habits early'
    ],
    requirements: [
      'Puppies must be at least 8 weeks old',
      'Must have initial vaccinations',
      'Recommended for puppies under 6 months'
    ],
    faq: [
      {
        question: 'At what age should my puppy have their first groom?',
        answer: 'We recommend starting between 8-16 weeks, after initial vaccinations.'
      },
      {
        question: 'What does the first groom include?',
        answer: 'A gentle bath, light trim, nail trim, ear cleaning, and positive reinforcement training.'
      }
    ]
  }
];