import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all products with optional limit and sort
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of products to fetch
 * @param {string} params.sort - Sort order ('asc' or 'desc')
 * @returns {Promise} - Promise with product data
 */
export const fetchProducts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.sort) queryParams.append('sort', params.sort);

    const response = await apiClient.get(`/products?${queryParams.toString()}`);
    return {
      products: response.data.map(product => ({
        id: product.id.toString(),
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl: product.image,
        rating: product.rating.rate,
        reviewCount: product.rating.count,
        // Add additional fields to match your UI requirements
        originalPrice: product.price * 1.2, // Simulated original price
        discount: 20, // Simulated discount
        shipping: 'Free Shipping',
        seller: {
          name: 'kc Seller',
          rating: 4.5
        }
      })),
      totalCount: response.data.length,
      page: 1,
      pageSize: params.limit || response.data.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise} - Promise with product details
 */
export const fetchProductDetails = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    const product = response.data;
    
    return {
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.image,
      rating: product.rating.rate,
      reviewCount: product.rating.count,
      originalPrice: product.price * 1.2,
      discount: 20,
      shipping: 'Free Shipping',
      seller: {
        name: 'kc Seller',
        rating: 4.5
      }
    };
  } catch (error) {
    console.error(`Error fetching product details for ID ${productId}:`, error);
    throw error;
  }
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise} - Promise with products in the category
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return {
      products: response.data.map(product => ({
        id: product.id.toString(),
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl: product.image,
        rating: product.rating.rate,
        reviewCount: product.rating.count,
        originalPrice: product.price * 1.2,
        discount: 20,
        shipping: 'Free Shipping',
        seller: {
          name: 'kc Seller',
          rating: 4.5
        }
      })),
      totalCount: response.data.length
    };
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

/**
 * Fetch all available categories
 * @returns {Promise} - Promise with array of categories
 */
export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// For development, we'll use the actual API instead of mock data
export const getProducts = fetchProducts; 