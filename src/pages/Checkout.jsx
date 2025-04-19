import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, guestCheckout } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateShippingInfo = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const validatePaymentInfo = () => {
    const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
    const missingFields = requiredFields.filter(field => !paymentInfo[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Basic card number validation (16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }

    // Basic expiry date validation (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(paymentInfo.expiryDate)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }

    // Basic CVV validation (3-4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(paymentInfo.cvv)) {
      setError('Please enter a valid CVV');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    setError('');
    
    if (step === 1 && !validateShippingInfo()) {
      return;
    }
    
    if (step === 2 && !validatePaymentInfo()) {
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError('');

      // If user is not logged in, create a guest account
      if (!currentUser) {
        await guestCheckout();
      }

      // In a real application, this would be an API call to create the order
      // For now, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear the cart and redirect to success page
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestCheckout = () => {
    guestCheckout();
    setStep(1);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    // This would be replaced with actual shipping calculation logic
    return 10;
  };

  const calculateTax = () => {
    // This would be replaced with actual tax calculation logic
    return calculateSubtotal() * 0.1;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Steps */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Progress Steps */}
            <div className="border-b border-gray-700">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${step >= 1 ? 'text-purple-400' : 'text-gray-500'}`}>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      step >= 1 ? 'bg-purple-600' : 'bg-gray-700'
                    }`}>1</span>
                    <span className="ml-2 font-medium">Shipping</span>
                  </div>
                  <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`} />
                  <div className={`flex items-center ${step >= 2 ? 'text-purple-400' : 'text-gray-500'}`}>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      step >= 2 ? 'bg-purple-600' : 'bg-gray-700'
                    }`}>2</span>
                    <span className="ml-2 font-medium">Payment</span>
                  </div>
                  <div className={`h-0.5 w-12 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`} />
                  <div className={`flex items-center ${step >= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      step >= 3 ? 'bg-purple-600' : 'bg-gray-700'
                    }`}>3</span>
                    <span className="ml-2 font-medium">Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              {error && (
                <div className="bg-red-900 text-white p-4 rounded-md mb-6">
                  {error}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveCard"
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                      />
                      <label htmlFor="saveCard" className="ml-2 text-sm">
                        Save card for future purchases
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Review Order</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Shipping Information</h3>
                      <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p>{shippingInfo.country}</p>
                      <p>{shippingInfo.email}</p>
                      <p>{shippingInfo.phone}</p>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Payment Information</h3>
                      <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                      <p>{paymentInfo.cardName}</p>
                      <p>Expires {paymentInfo.expiryDate}</p>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="ml-4 flex-1">
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 bg-gray-900 border-t border-gray-700">
              <div className="flex justify-between">
                {step > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center text-gray-400 hover:text-white"
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Next
                    <ChevronRightIcon className="h-5 w-5 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span>${calculateShipping().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-purple-400">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {!currentUser && step === 1 && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-4">
                  Already have an account? Sign in for a faster checkout experience.
                </p>
                <button
                  onClick={() => navigate('/login', { state: { from: '/checkout' } })}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md mb-2"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGuestCheckout}
                  className="w-full text-gray-400 hover:text-white text-sm"
                >
                  Continue as Guest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 