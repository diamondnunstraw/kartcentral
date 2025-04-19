import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders from localStorage on mount and when user changes
  useEffect(() => {
    if (currentUser) {
      const savedOrders = localStorage.getItem(`orders_${currentUser.uid}`);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } else {
      setOrders([]);
    }
    setLoading(false);
  }, [currentUser]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`orders_${currentUser.uid}`, JSON.stringify(orders));
    }
  }, [orders, currentUser]);

  const createOrder = (cartItems, totalAmount, shippingAddress) => {
    if (!currentUser) return null;

    const newOrder = {
      id: `ORD${Date.now()}`,
      userId: currentUser.uid,
      items: cartItems,
      totalAmount,
      shippingAddress,
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        {
          status: 'processing',
          timestamp: new Date().toISOString(),
          description: 'Order received and is being processed'
        }
      ]
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = () => {
    if (!currentUser) return [];
    return orders;
  };

  const updateOrderStatus = (orderId, newStatus, description) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            statusHistory: [
              ...order.statusHistory,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                description
              }
            ]
          };
        }
        return order;
      })
    );
  };

  const getOrderStatus = (orderId) => {
    const order = getOrder(orderId);
    if (!order) return null;
    
    return {
      currentStatus: order.status,
      history: order.statusHistory,
      estimatedDelivery: order.estimatedDelivery,
      trackingNumber: order.trackingNumber
    };
  };

  const value = {
    orders,
    loading,
    createOrder,
    getOrder,
    getUserOrders,
    updateOrderStatus,
    getOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext; 