import { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { getProducts } from '../lib/fakeStore';
import ProductCard from './ProductCard';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ pageSize: 8 });
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay && products.length > 0 && !isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(products.length / 4));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, products.length, isHovered]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4)
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % Math.ceil(products.length / 4)
    );
  };

  const handleDotClick = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden">
            <div className="aspect-w-1 aspect-h-1 w-full bg-gray-700/50"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
              <div className="h-8 bg-gray-700/50 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">No products available at the moment.</p>
      </div>
    );
  }

  const visibleProducts = products.slice(currentIndex * 4, (currentIndex * 4) + 4);

  return (
    <div 
      className="relative" 
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Controls */}
      <button
        onClick={handlePrev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-all z-10 group backdrop-blur-sm"
        aria-label="Previous products"
      >
        <ChevronLeftIcon className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-all z-10 group backdrop-blur-sm"
        aria-label="Next products"
      >
        <ChevronRightIcon className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
      </button>

      {/* Carousel Items */}
      <div className="overflow-hidden">
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform duration-500 ease-out"
        >
          {visibleProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className="bg-gray-800/50 backdrop-blur-sm"
            />
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(Math.ceil(products.length / 4))].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-purple-500 w-8' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel; 