import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { currentUser } = useAuth();

  // Load wishlist from localStorage on initial load
  useEffect(() => {
    if (currentUser) {
      const savedWishlist = localStorage.getItem(`wishlist_${currentUser.id}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } else {
      setWishlist([]);
    }
  }, [currentUser]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, currentUser]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.id === product.id)) {
        return [...prevWishlist, {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          addedAt: new Date().toISOString()
        }];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 