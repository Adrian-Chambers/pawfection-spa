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