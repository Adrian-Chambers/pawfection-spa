import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-fur-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-2 bg-white rounded-full overflow-hidden">
                <Image 
                  src="/images/logo.png" 
                  alt="Pawfection Grooming & Spa" 
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-lg">Pawfection</h3>
                <p className="text-xs">Grooming & Spa</p>
              </div>
            </div>
            <p className="mb-4">
              Providing premium grooming services for your furry friends since 2015.
              We make sure your pet looks and feels their best.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                <FiFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="font-display text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/#services" className="hover:text-primary transition-colors duration-300">Grooming Packages</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors duration-300">À La Carte Services</Link></li>
              <li><Link href="/#special-programs" className="hover:text-primary transition-colors duration-300">Special Programs</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors duration-300">Retail Products</Link></li>
              <li><Link href="/#events" className="hover:text-primary transition-colors duration-300">Special Events</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-display text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 flex-shrink-0" />
                <span>123 Barker Street, Dogtown, CA 90210</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 flex-shrink-0" />
                <span>woof@pawfection.com</span>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div className="md:col-span-1">
            <h3 className="font-display text-lg mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiClock className="mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p>8:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-center">
                <FiClock className="mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Saturday</p>
                  <p>9:00 AM - 5:00 PM</p>
                </div>
              </li>
              <li className="flex items-center">
                <FiClock className="mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Pawfection Grooming & Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;