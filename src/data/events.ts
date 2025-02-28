import { Event } from '@/types/event';

export const events: Event[] = [
  {
    id: 'photo-session-spring',
    title: 'Spring Photo Session',
    description: 'Professional photography after grooming with beautiful spring-themed backdrops.',
    date: 'April 15, 2023',
    time: '10:00 AM - 4:00 PM',
    image: '/images/events/photo-session.jpg',
    category: 'photo'
  },
  {
    id: 'adoption-day-march',
    title: 'Adoption Day',
    description: 'Find your forever friend! We\'re partnering with local rescues to help dogs find homes.',
    date: 'March 12, 2023',
    time: '11:00 AM - 3:00 PM',
    image: '/images/events/adoption-day.jpg',
    category: 'adoption'
  },
  {
    id: 'halloween-contest',
    title: 'Halloween Costume Contest',
    description: 'Dress up your pup and join us for treats, fun, and prizes for the best costumes!',
    date: 'October 28, 2023',
    time: '1:00 PM - 4:00 PM',
    image: '/images/events/halloween.jpg',
    category: 'holiday'
  }
];