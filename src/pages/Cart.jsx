import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    setIsUpdating(true);
    updateQuantity(productId, newQuantity);
    setIsUpdating(false);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    // This would be replaced with actual shipping calculation logic
    return 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            to="/products" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-700">
              {cart.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 h-24">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            <Link to={`/product/${item.id}`} className="hover:text-purple-400">
                              {item.title}
                            </Link>
                          </h3>
                          {item.variation && (
                            <p className="text-sm text-gray-400 mt-1">
                              Variation: {item.variation.name}
                            </p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <label htmlFor={`quantity-${item.id}`} className="sr-only">
                            Quantity
                          </label>
                          <select
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={isUpdating}
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-medium text-purple-400">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearCart}
              className="text-gray-400 hover:text-red-400 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="font-medium">${calculateShipping().toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-purple-400">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center">
              <Link 
                to="/products" 
                className="text-sm text-gray-400 hover:text-purple-400"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 