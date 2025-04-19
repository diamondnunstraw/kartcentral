import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, select the items you want, add them to your cart, and proceed to checkout. You can pay using various payment methods including credit cards and PayPal."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods. All transactions are encrypted and secure."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's website."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please visit our Returns & Refunds page for more detailed information."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the shipping options and costs during checkout."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination. Express shipping options are available at checkout."
    },
    {
      question: "What if my order arrives damaged?",
      answer: "If your order arrives damaged, please contact our customer service team immediately with photos of the damage. We'll arrange a replacement or refund as soon as possible."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. After that, the order may have already been processed for shipping. Please contact customer service for assistance."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer discounts for bulk orders. Please contact our sales team for more information about bulk pricing and corporate accounts."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through our Contact Us page, by email at support@kartcentral.com, or by phone at +1 (555) 123-4567 during business hours."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400">
          Find answers to common questions about our products and services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-lg font-medium text-left">{faq.question}</span>
              <ChevronDownIcon
                className={`h-6 w-6 text-purple-500 transform transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'py-4' : 'max-h-0'
              }`}
            >
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Still have questions?{' '}
          <a href="/contact" className="text-purple-500 hover:text-purple-400">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQ; 