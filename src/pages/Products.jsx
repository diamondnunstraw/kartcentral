import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, fetchProductsByCategory, fetchCategories } from '../lib/fakeStore';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'asc',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
  });

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, []);

  const fetchProductsData = async (pageNumber = 1, isNewFilter = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (filters.category) {
        data = await fetchProductsByCategory(filters.category);
      } else {
        const params = {
          limit: 12,
          sort: filters.sort,
          page: pageNumber
        };
        data = await getProducts(params);
      }

      // Apply client-side filtering for price and rating
      let filteredProducts = data.products;
      
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(
          product => product.price >= parseFloat(filters.minPrice)
        );
      }
      
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(
          product => product.price <= parseFloat(filters.maxPrice)
        );
      }
      
      if (filters.rating) {
        filteredProducts = filteredProducts.filter(
          product => product.rating >= parseFloat(filters.rating)
        );
      }

      // If it's a new filter, replace products. Otherwise, append them.
      setProducts(prev => isNewFilter ? filteredProducts : [...prev, ...filteredProducts]);
      setHasMore(filteredProducts.length === 12); // If we got less than 12 products, we've reached the end
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Reset products and fetch first page when filters change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProductsData(1, true);
  }, [filters]);

  const lastProductRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
        fetchProductsData(page + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {filters.category ? 
          `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products` 
          : 'All Products'}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 bg-gray-800 p-6 rounded-lg h-fit sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Rating</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  ref={index === products.length - 1 ? lastProductRef : null}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center mt-8">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;