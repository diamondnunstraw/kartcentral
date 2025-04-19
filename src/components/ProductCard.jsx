import { Link } from 'react-router-dom';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const wishlist = useWishlist();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent navigation
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (wishlist && wishlist.isInWishlist && wishlist.isInWishlist(product.id)) {
      wishlist.removeFromWishlist(product.id);
    } else if (wishlist && wishlist.addToWishlist) {
      wishlist.addToWishlist(product);
    }
  };

  const isWishlisted = wishlist?.isInWishlist?.(product.id) || false;

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`
        block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
        transition-all duration-300 transform hover:scale-[1.02] group
        ${className}
      `}
    >
      <div className="relative pb-[100%]">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            -{product.discount}% OFF
          </div>
        )}
        {wishlist && (
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIconOutline className="h-5 w-5 text-white" />
            )}
          </button>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-400 ml-2">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-purple-400">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-400">{product.shipping}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group"
        >
          <ShoppingCartIcon className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard; 