import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-8">
            Start adding items to your wishlist by browsing our products.
          </p>
          <Link
            to="/products"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <span className="text-gray-400">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link to={`/product/${product.id}`} className="block relative">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
            </Link>

            <div className="p-6">
              <Link
                to={`/product/${product.id}`}
                className="text-lg font-semibold mb-2 hover:text-purple-400 transition-colors line-clamp-2"
              >
                {product.title}
              </Link>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-purple-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">
                  Added {new Date(product.addedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-700"
                  aria-label="Remove from wishlist"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 