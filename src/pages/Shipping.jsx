import { TruckIcon, GlobeAltIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Shipping = () => {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      time: '3-5 business days',
      cost: 'Free for orders over $50',
      details: 'Standard shipping within the continental United States.'
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$9.99',
      details: 'Faster delivery for urgent orders.'
    },
    {
      name: 'Next Day Delivery',
      time: '1 business day',
      cost: '$19.99',
      details: 'Guaranteed next-day delivery for orders placed before 2 PM EST.'
    },
    {
      name: 'International Shipping',
      time: '7-14 business days',
      cost: 'Varies by location',
      details: 'Available to most countries worldwide.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We offer various shipping options to meet your needs. Learn about our shipping methods, costs, and policies.
        </p>
      </div>

      {/* Shipping Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <TruckIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-400">On orders over $50 within the US</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <GlobeAltIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Global Delivery</h3>
          <p className="text-gray-400">Ships to 100+ countries</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <ClockIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
          <p className="text-gray-400">Orders ship within 24 hours</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <ShieldCheckIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Order Protection</h3>
          <p className="text-gray-400">Full insurance on all orders</p>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="bg-gray-800 rounded-lg overflow-hidden mb-12">
        <div className="px-6 py-4 bg-gray-700">
          <h2 className="text-2xl font-semibold">Shipping Methods</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {shippingMethods.map((method, index) => (
            <div key={index} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-lg font-semibold">{method.name}</h3>
                <span className="text-purple-500 font-medium">{method.cost}</span>
              </div>
              <p className="text-gray-400 mb-2">Delivery Time: {method.time}</p>
              <p className="text-sm text-gray-500">{method.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
          <p className="text-gray-400">
            Once your order ships, you'll receive a confirmation email with your tracking number.
            You can use this number to track your package's status and estimated delivery date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
          <p className="text-gray-400">
            International orders may be subject to import duties and taxes, which are the
            responsibility of the recipient. Delivery times may vary depending on customs
            processing in your country.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
          <p className="text-gray-400">
            Some items may have shipping restrictions to certain countries or regions.
            These restrictions will be clearly indicated on the product page.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Have questions about shipping?{' '}
          <a href="/contact" className="text-purple-500 hover:text-purple-400">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default Shipping; 