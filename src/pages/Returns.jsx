import { ArrowPathIcon, CurrencyDollarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Returns = () => {
  const returnSteps = [
    {
      title: 'Initiate Return',
      description: 'Log into your account and go to your order history. Select the item you wish to return and follow the return instructions.'
    },
    {
      title: 'Package Item',
      description: 'Pack the item securely in its original packaging with all tags and accessories. Include the return form in the package.'
    },
    {
      title: 'Ship Return',
      description: 'Use the provided return shipping label or ship the item to our returns center. Keep the tracking number for reference.'
    },
    {
      title: 'Refund Processing',
      description: 'Once we receive and inspect the return, we\'ll process your refund within 3-5 business days.'
    }
  ];

  const eligibilityItems = [
    'Item must be unused and in original condition',
    'Original tags and packaging must be intact',
    'Return requested within 30 days of delivery',
    'Item is not final sale or marked as non-returnable',
    'Proof of purchase is provided'
  ];

  const nonReturnableItems = [
    'Personal care items',
    'Undergarments and swimwear',
    'Items marked as final sale',
    'Custom or personalized items',
    'Digital products and gift cards'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We want you to be completely satisfied with your purchase. Learn about our return policy and refund process.
        </p>
      </div>

      {/* Policy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <ArrowPathIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">30-Day Returns</h3>
          <p className="text-gray-400">Easy returns within 30 days of delivery</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <CurrencyDollarIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Full Refunds</h3>
          <p className="text-gray-400">Get your money back, hassle-free</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <ClockIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Quick Processing</h3>
          <p className="text-gray-400">Refunds processed within 3-5 days</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <ShieldCheckIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Buyer Protection</h3>
          <p className="text-gray-400">Safe and secure refund guarantee</p>
        </div>
      </div>

      {/* Return Process */}
      <div className="bg-gray-800 rounded-lg overflow-hidden mb-12">
        <div className="px-6 py-4 bg-gray-700">
          <h2 className="text-2xl font-semibold">Return Process</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-8">
            {returnSteps.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Return Eligibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h2 className="text-xl font-semibold">Return Eligibility</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {eligibilityItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h2 className="text-xl font-semibold">Non-Returnable Items</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Refund Information */}
      <div className="bg-gray-800 rounded-lg overflow-hidden mb-12">
        <div className="px-6 py-4 bg-gray-700">
          <h2 className="text-2xl font-semibold">Refund Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-400">
            Once we receive your return, we'll inspect the item and process your refund. The refund will be issued to your original payment method.
          </p>
          <p className="text-gray-400">
            Refund processing time: 3-5 business days after inspection<br />
            Bank processing time: Additional 5-10 business days depending on your bank
          </p>
          <p className="text-gray-400">
            Shipping costs are non-refundable unless the return is due to our error or the product is defective.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <p className="text-gray-400">
          Need help with a return?{' '}
          <a href="/contact" className="text-purple-500 hover:text-purple-400">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default Returns; 