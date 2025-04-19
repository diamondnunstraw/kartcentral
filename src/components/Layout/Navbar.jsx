import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-500">Kart</span>
              <span className="text-2xl font-bold text-white">Central</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </form>

            <Link to="/products" className="hover:text-purple-400 transition-colors">
              Products
            </Link>

            <a 
              href="https://career.kartcentral.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-purple-400 transition-colors"
            >
              <BriefcaseIcon className="h-5 w-5 mr-1" />
              Careers
            </a>
            
            <Link to="/cart" className="relative hover:text-purple-400 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center hover:text-purple-400 transition-colors">
                  <UserIcon className="h-6 w-6 mr-1" />
                  <span>Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-700">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-purple-400 transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-purple-400 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </form>

            <Link
              to="/products"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            <a
              href="https://career.kartcentral.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              Careers
            </a>

            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 mr-2" />
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="ml-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-3 py-2 rounded-md hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 