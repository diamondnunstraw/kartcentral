import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductDetails } from '../lib/fakeStore';
import { useCart } from '../contexts/CartContext';
import { StarIcon } from '@heroicons/react/20/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductDetails(productId);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image */}
        <div className="flex justify-center bg-gray-800 rounded-lg p-8 mb-8 lg:mb-0">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain h-96 w-full"
          />
        </div>

        {/* Product info */}
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>

          <div className="mt-4">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-purple-500">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-lg text-gray-400 line-through mt-1">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`${
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-600'
                    } h-5 w-5 flex-shrink-0`}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-400">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-300 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Category */}
          <div className="mt-6">
            <div className="text-sm text-gray-400">
              Category:{' '}
              <Link
                to={`/products?category=${product.category}`}
                className="text-purple-500 hover:text-purple-400"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
          </div>

          {/* Shipping */}
          {product.shipping && (
            <div className="mt-4">
              <p className="text-sm text-gray-400">{product.shipping}</p>
            </div>
          )}

          {/* Quantity selector and Add to cart */}
          <div className="mt-8 flex flex-col space-y-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 rounded-md border border-gray-600 bg-gray-700 py-1.5 px-3 text-base leading-8 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 