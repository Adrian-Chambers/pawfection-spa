"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { FiCheck, FiX } from 'react-icons/fi';

// Types for VIP Membership details
type BenefitItem = {
  name: string;
  included: boolean;
};

type PricingTier = {
  name: string;
  price: number;
  billingFrequency: 'monthly' | 'annually';
  benefits: BenefitItem[];
};

const VIPMembershipPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'monthly' | 'annually'>('monthly');
  
  const pricingTiers: Record<'monthly' | 'annually', PricingTier> = {
    monthly: {
      name: 'Monthly VIP',
      price: 49.99,
      billingFrequency: 'monthly',
      benefits: [
        { name: 'Unlimited Basic Grooming', included: true },
        { name: 'Free Nail Trim', included: true },
        { name: 'Discounted Add-on Services', included: true },
        { name: 'Priority Booking', included: true },
        { name: 'Exclusive Discounts on Products', included: true },
        { name: 'Birthday Celebration Package', included: true },
        { name: 'Free Teeth Brushing', included: false },
        { name: 'Annual Dental Checkup', included: false },
      ]
    },
    annually: {
      name: 'Annual VIP',
      price: 499.99,
      billingFrequency: 'annually',
      benefits: [
        { name: 'Unlimited Basic Grooming', included: true },
        { name: 'Free Nail Trim', included: true },
        { name: 'Discounted Add-on Services', included: true },
        { name: 'Priority Booking', included: true },
        { name: 'Exclusive Discounts on Products', included: true },
        { name: 'Birthday Celebration Package', included: true },
        { name: 'Free Teeth Brushing', included: true },
        { name: 'Annual Dental Checkup', included: true },
      ]
    }
  };

  const currentTier = pricingTiers[selectedTier];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display text-primary-dark mb-4">
          Pawfection VIP Membership
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Exclusive benefits for pet parents who want the absolute best for their furry friends.
        </p>
      </motion.div>

      {/* Tier Selector */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 p-2 rounded-full">
          <button
            onClick={() => setSelectedTier('monthly')}
            className={`px-6 py-2 rounded-full transition-all text-sm ${
              selectedTier === 'monthly'
                ? 'bg-primary text-primary-dark font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedTier('annually')}
            className={`px-6 py-2 rounded-full transition-all text-sm ${
              selectedTier === 'annually'
                ? 'bg-primary text-primary-dark font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      {/* Membership Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-display text-fur-brown mb-6">
            What's Included in Your Membership
          </h2>
          <div className="space-y-4">
            {currentTier.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  benefit.included 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-gray-100 text-gray-500 line-through'
                }`}
              >
                {benefit.included ? (
                  <FiCheck className="text-green-600" />
                ) : (
                  <FiX className="text-gray-400" />
                )}
                <span>{benefit.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card
            title={`${currentTier.name} Membership`}
            content={
              <div className="text-center">
                <p className="text-5xl font-display text-primary-dark mb-4">
                  ${currentTier.price.toFixed(2)}
                  <span className="text-lg text-gray-500 ml-2">
                    / {currentTier.billingFrequency}
                  </span>
                </p>
                <p className="text-gray-600 mb-6">
                  {selectedTier === 'monthly' 
                    ? 'Flexible monthly subscription' 
                    : 'Save 15% compared to monthly pricing'}
                </p>
                <Button 
                  href="/book-vip-membership" 
                  variant="primary" 
                  className="w-full"
                >
                  Join VIP Program
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Cancel anytime. No hidden fees.
                </p>
              </div>
            }
          />
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-display text-center text-fur-brown mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              question: "Can I switch between monthly and annual plans?",
              answer: "Yes! You can switch your membership tier at any time. The change will take effect at your next billing cycle."
            },
            {
              question: "Are there any additional sign-up fees?",
              answer: "No, there are no additional fees. The price you see is the price you pay, with no hidden charges."
            },
            {
              question: "What if I want to cancel my membership?",
              answer: "You can cancel your membership at any time. If you're on a monthly plan, your membership will remain active until the end of the current billing cycle."
            }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-display text-fur-brown mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default VIPMembershipPage;