import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCarousel from '../components/ProductCarousel';
import { getProducts } from '../lib/fakeStore';
import { ShoppingBagIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const ctaRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(['.hero-overlay', '.hero-image', '.hero-title .word', '.hero-subtitle', '.hero-cta', '.scroll-indicator'], {
      opacity: 0
    });
    gsap.set('.hero-image', { scale: 1.2 });
    gsap.set('.hero-title .word', { y: 100 });
    gsap.set('.hero-subtitle', { y: 50 });
    gsap.set('.hero-cta', { y: 30 });
    gsap.set('.scroll-indicator', { y: -20 });

    // Hero section animation
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    heroTl
      .to('.hero-overlay', { 
        opacity: 1, 
        duration: 1.5 
      })
      .to('.hero-image', { 
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out' 
      }, '<')
      .to('.hero-title .word', { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        stagger: 0.1
      }, '-=1.5')
      .to('.hero-subtitle', { 
        y: 0, 
        opacity: 1, 
        duration: 1
      }, '-=0.8')
      .to('.hero-cta', { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.2
      }, '-=0.6')
      .to('.scroll-indicator', {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, '-=0.4');

    // Set initial states for scroll sections
    gsap.set(['.featured-content', '.benefits-content', '.cta-content'], {
      opacity: 0,
      y: 30
    });

    // Animate sections on scroll
    const sections = [
      { trigger: featuredRef.current, class: '.featured-content' },
      { trigger: benefitsRef.current, class: '.benefits-content' },
      { trigger: ctaRef.current, class: '.cta-content' }
    ];

    sections.forEach(section => {
      gsap.to(section.class, {
        scrollTrigger: {
          trigger: section.trigger,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="hero-overlay absolute inset-0 bg-gradient-to-br from-purple-900/90 via-gray-900/80 to-black/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Hero background" 
            className="hero-image w-full h-full object-cover scale-105 transform"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {/* Split text into words for stagger animation */}
            <span className="block overflow-hidden">
              <span className="word inline-block">Discover</span>{' '}
              <span className="word inline-block text-purple-400">Premium</span>
            </span>
            <span className="block overflow-hidden mt-2">
              <span className="word inline-block">Products</span>{' '}
              <span className="word inline-block">at</span>
            </span>
            <span className="block overflow-hidden mt-2">
              <span className="word inline-block text-purple-400">Amazing</span>{' '}
              <span className="word inline-block">Prices</span>
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
            Your one-stop destination for quality products, competitive prices, and exceptional service. Join thousands of satisfied customers today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/products" 
              className="hero-cta group relative inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 duration-200 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Shop Now
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/products?category=featured" 
              className="hero-cta group relative inline-flex items-center justify-center bg-transparent border-2 border-purple-500 hover:border-purple-400 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 duration-200"
            >
              <span className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative">Featured Products</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-purple-400 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full p-1">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-scroll"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 px-4 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto benefits-content">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-purple-400">KartCentral</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShoppingBagIcon className="h-8 w-8" />,
                title: 'Quality Products',
                description: 'Curated selection of premium products from trusted brands'
              },
              {
                icon: <TruckIcon className="h-8 w-8" />,
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping to your doorstep'
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8" />,
                title: 'Secure Shopping',
                description: '100% secure payment and data protection'
              },
              {
                icon: <CreditCardIcon className="h-8 w-8" />,
                title: 'Best Prices',
                description: 'Competitive prices and regular discounts'
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-700 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-200"
              >
                <div className="inline-block p-3 bg-purple-600 rounded-lg text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        ref={featuredRef}
        className="py-20 px-4 relative"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto featured-content relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Featured Products
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-4 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products, carefully chosen for their quality and value.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Product Carousel Container */}
          <div className="relative rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8 shadow-xl">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-purple-500/30 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-500/30 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-500/30 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-2xl"></div>

            {/* Carousel */}
            <ProductCarousel />
          </div>

          {/* View All Products Button */}
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center group relative overflow-hidden rounded-full bg-purple-600 hover:bg-purple-700 px-8 py-4 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center font-semibold">
                View All Products
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Shop by <span className="text-purple-400">Category</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Browse our wide selection of products across various categories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Electronics', 
                image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                link: '/products?category=electronics',
                description: 'Latest gadgets and tech accessories'
              },
              { 
                title: 'Home & Kitchen', 
                image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                link: '/products?category=home',
                description: 'Everything for your home'
              },
              { 
                title: 'Fashion', 
                image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
                link: '/products?category=fashion',
                description: 'Trendy clothing and accessories'
              }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-lg h-80 transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <span className="inline-flex items-center text-purple-400 group-hover:text-purple-300">
                    Shop Now
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-purple-600 opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-purple-400">Discover</span> Amazing Products?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers who have found their perfect products at competitive prices.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full transition-colors transform hover:scale-105 duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              Start Shopping
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 