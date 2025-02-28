interface Testimonial {
    id: string;
    name: string;
    avatar: string;
    petType: string;
    comment: string;
    rating: number;
    date: string;
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Sarah Johnson',
      avatar: '/images/testimonials/person-1.jpg',
      petType: 'Dalmation',
      comment: 'Max looks absolutely gorgeous after every visit to Pawfection! The groomers are so gentle with him, and he always comes home looking and smelling amazing. I wouldn\'t trust anyone else with his grooming needs!',
      rating: 5,
      date: 'February 10, 2025'
    },
    {
      id: 'testimonial-2',
      name: 'Michael Rodriguez',
      avatar: '/images/testimonials/person-2.jpg',
      petType: 'Pitbull Mix',
      comment: 'Cooper used to be terrified of grooming, but the team at Pawfection has completely changed that. They\'re patient, kind, and so skilled. Now he gets excited when I tell him we\'re going to the groomer!',
      rating: 5,
      date: 'January 22, 2025'
    },
    {
      id: 'testimonial-3',
      name: 'Lisa Chang',
      avatar: '/images/testimonials/person-3.jpg',
      petType: 'Yorkie',
      comment: 'I love that I can book online and the reminders are so helpful. Bella always comes home looking and smelling amazing!',
      rating: 5,
      date: 'March 5, 2024'
    },
    {
      id: 'testimonial-4',
      name: 'John Peterson',
      avatar: '/images/testimonials/person-4.jpg',
      petType: 'Golden Retriever',
      comment: 'I love the VIP program! It\'s so convenient to have a regular grooming schedule, and the discounts really add up. My Daisy has never looked better.',
      rating: 4,
      date: 'December 15, 2024'
    }
  ];