import { TruckIcon, GlobeAsiaAustraliaIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const ShippingInfo = () => {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      icon: TruckIcon,
      deliveryTime: '3-5 business days',
      cost: 'Free for orders over $50',
      description: 'Available for all domestic orders within the continental United States.'
    },
    {
      name: 'Express Shipping',
      icon: ClockIcon,
      deliveryTime: '1-2 business days',
      cost: '$15.99',
      description: 'Guaranteed delivery within 2 business days for orders placed before 2 PM EST.'
    },
    {
      name: 'International Shipping',
      icon: GlobeAsiaAustraliaIcon,
      deliveryTime: '7-14 business days',
      cost: 'Varies by location',
      description: 'Available to most countries worldwide. Customs fees may apply.'
    }
  ];

  const policies = [
    {
      title: 'Order Processing',
      content: 'Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships.'
    },
    {
      title: 'Shipping Restrictions',
      content: 'Some items may be restricted for international shipping due to local regulations. We reserve the right to cancel orders that violate these restrictions.'
    },
    {
      title: 'Tracking Orders',
      content: 'All orders include tracking information that will be sent to your email. You can also track your order through your account dashboard.'
    },
    {
      title: 'Delivery Times',
      content: 'Delivery times are estimates and may vary based on location and circumstances. Weather conditions and holidays may affect delivery schedules.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600">
            Learn about our shipping methods, delivery times, and policies.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Methods</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {shippingMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center"
                >
                  <method.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{method.name}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">{method.deliveryTime}</p>
                    <p className="font-medium text-blue-600">{method.cost}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Policies</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {policies.map((policy, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-600">{policy.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-start">
            <CurrencyDollarIcon className="w-6 h-6 text-blue-600 mt-1" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Free Shipping Eligibility</h3>
              <p className="mt-2 text-gray-600">
                Orders over $50 qualify for free standard shipping within the continental United States.
                This offer excludes oversized items, express shipping, and international orders.
                Free shipping will be automatically applied at checkout when eligible.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have questions about shipping? Contact our support team at{' '}
            <a href="mailto:support@kartcentral.com" className="text-blue-600 hover:text-blue-800">
              support@kartcentral.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo; 