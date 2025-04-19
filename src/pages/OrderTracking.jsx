import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import { useNavigate } from 'react-router-dom';
import { 
  TruckIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const { getOrder } = useOrder();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.trackingNumber === trackingNumber);
    setSearchedOrder(order || null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'text-blue-600';
      case 'shipped':
        return 'text-yellow-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <ClockIcon className="w-6 h-6" />;
      case 'shipped':
        return <TruckIcon className="w-6 h-6" />;
      case 'delivered':
        return <CheckCircleIcon className="w-6 h-6" />;
      case 'cancelled':
        return <ExclamationCircleIcon className="w-6 h-6" />;
      default:
        return <ClockIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking number to get real-time updates on your order.</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number (e.g., TRK123ABC)"
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Track
            </button>
          </div>
        </form>

        {searchedOrder ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order #{searchedOrder.id}</h2>
                  <p className="text-gray-600">Tracking Number: {searchedOrder.trackingNumber}</p>
                </div>
                <div className={`flex items-center ${getStatusColor(searchedOrder.status)}`}>
                  {getStatusIcon(searchedOrder.status)}
                  <span className="ml-2 font-medium capitalize">{searchedOrder.status}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="ml-3">
                    <p className="text-gray-900">{searchedOrder.shippingAddress.name}</p>
                    <p className="text-gray-600">{searchedOrder.shippingAddress.street}</p>
                    <p className="text-gray-600">
                      {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Timeline</h3>
              <div className="space-y-6">
                {searchedOrder.statusHistory.map((status, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`flex-shrink-0 ${getStatusColor(status.status)}`}>
                      {getStatusIcon(status.status)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 capitalize">{status.status}</p>
                      <p className="text-sm text-gray-600">{status.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(status.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={() => navigate('/orders')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Order Details →
              </button>
            </div>
          </div>
        ) : trackingNumber && (
          <div className="text-center py-8">
            <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
            <p className="text-gray-600">
              We couldn't find an order with the tracking number provided. Please check the number and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking; 