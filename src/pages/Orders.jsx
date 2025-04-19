import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 10;
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }
    
    fetchOrders();
  }, [currentUser, navigate, filterStatus, sortBy, sortOrder, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      // In a real application, this would be an API call to fetch orders
      // For now, we'll use mock data
      const mockOrders = [
        {
          id: 'ORD-12345',
          date: '2023-06-15T14:30:00Z',
          status: 'delivered',
          total: 129.99,
          items: [
            {
              id: '1',
              name: 'Premium Wireless Headphones',
              price: 89.99,
              quantity: 1,
              image: 'https://via.placeholder.com/100x100?text=Headphones'
            },
            {
              id: '2',
              name: 'Wireless Charging Pad',
              price: 39.99,
              quantity: 1,
              image: 'https://via.placeholder.com/100x100?text=Charger'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'United States'
          },
          paymentMethod: 'Credit Card (****1234)',
          trackingNumber: 'TRK987654321'
        },
        {
          id: 'ORD-12346',
          date: '2023-05-22T09:15:00Z',
          status: 'processing',
          total: 79.99,
          items: [
            {
              id: '3',
              name: 'Smart Fitness Watch',
              price: 79.99,
              quantity: 1,
              image: 'https://via.placeholder.com/100x100?text=Watch'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'United States'
          },
          paymentMethod: 'PayPal',
          trackingNumber: null
        },
        {
          id: 'ORD-12347',
          date: '2023-04-10T16:45:00Z',
          status: 'cancelled',
          total: 199.99,
          items: [
            {
              id: '4',
              name: 'Ultra HD 4K Monitor',
              price: 199.99,
              quantity: 1,
              image: 'https://via.placeholder.com/100x100?text=Monitor'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'United States'
          },
          paymentMethod: 'Credit Card (****1234)',
          trackingNumber: null
        }
      ];
      
      // Filter orders by status
      let filteredOrders = [...mockOrders];
      if (filterStatus !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
      }
      
      // Sort orders
      filteredOrders.sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'asc' 
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'total') {
          return sortOrder === 'asc' 
            ? a.total - b.total
            : b.total - a.total;
        } else if (sortBy === 'status') {
          return sortOrder === 'asc'
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        }
        return 0;
      });
      
      // Pagination
      const totalOrders = filteredOrders.length;
      setTotalPages(Math.ceil(totalOrders / ordersPerPage));
      
      const startIndex = (currentPage - 1) * ordersPerPage;
      const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);
      
      setOrders(paginatedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-900 text-white p-4 rounded-md">
          <p>{error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-4 bg-white text-red-900 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <button 
            onClick={handleBackToList}
            className="flex items-center text-purple-400 hover:text-purple-300"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to Orders
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Order {selectedOrder.id}</h1>
                <p className="text-gray-400">Placed on {formatDate(selectedOrder.date)}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
                <p>{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                <p>{selectedOrder.shippingAddress.country}</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Payment Information</h2>
                <p>{selectedOrder.paymentMethod}</p>
                {selectedOrder.trackingNumber && (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-400">Tracking Number</h3>
                    <p>{selectedOrder.trackingNumber}</p>
                  </div>
                )}
              </div>
            </div>
            
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={item.image} alt={item.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-right font-medium">Total:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">${selectedOrder.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No Orders Found</h2>
          <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
                <label htmlFor="status-filter" className="mr-2 text-sm font-medium">Filter by status:</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSortChange('date')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm ${
                    sortBy === 'date' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Date
                  {sortBy === 'date' && (
                    sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                  )}
                </button>
                <button
                  onClick={() => handleSortChange('total')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm ${
                    sortBy === 'total' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Total
                  {sortBy === 'total' && (
                    sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                  )}
                </button>
                <button
                  onClick={() => handleSortChange('status')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm ${
                    sortBy === 'status' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Status
                  {sortBy === 'status' && (
                    sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4 ml-1" /> : <ArrowDownIcon className="h-4 w-4 ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(order.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="flex items-center text-purple-400 hover:text-purple-300"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {totalPages > 1 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      Showing <span className="font-medium">{((currentPage - 1) * ordersPerPage) + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * ordersPerPage, orders.length)}
                      </span>{' '}
                      of <span className="font-medium">{orders.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium ${
                            currentPage === i + 1
                              ? 'z-10 bg-purple-600 text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders; 