"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { events } from '@/data/events';
import Button from '../ui/Button';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { useHydrated } from '@/hooks/useHydrated';

const EventsSection = () => {
  // Get upcoming events
  const upcomingEvents = events.slice(0, 3);
  const isHydrated = useHydrated();
  
  return (
    <section id="events" className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display text-primary-dark mb-4">
          Upcoming Events
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Join us for fun, pet-friendly events and activities!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
        {upcomingEvents.map((event, index) => (
          <div key={event.id} className="event-card-wrapper h-full">
            {/* Use a wrapper div to apply the entry animation */}
            <div
              style={isHydrated ? {
                opacity: 1,
                transform: 'translateY(0)',
                transition: `opacity 0.5s ease, transform 0.5s ease`,
                transitionDelay: `${index * 200}ms`
              } : {
                opacity: 1
              }}
              className="h-full"
            >
              {/* Use motion.div without inline styles for the hover animation */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-secondary-light hover:border-secondary h-full flex flex-col"
              >
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-accent px-3 py-1 rounded-bl-lg">
                    <span className="text-fur-brown font-medium">{event.category}</span>
                  </div>
                  {event.icon && (
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 z-10">
                      <Image
                        src={event.icon}
                        alt={event.category}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display text-fur-brown mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center text-gray-500">
                      <FiCalendar className="mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FiClock className="mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FiMapPin className="mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">At our store</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="secondary"
                    className="w-full mt-auto"
                    href={`#event-${event.id}`}
                  >
                    RSVP
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;