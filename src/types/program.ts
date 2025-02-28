export type Program = {
    id: string;
    name: string;
    slug: string;
    image: string;
    icon?: string;
    description: string;
    longDescription: string;
    price: string;
    features: string[];
    benefits: string[];
    requirements?: string[];
    faq?: Array<{ question: string; answer: string }>;
  };