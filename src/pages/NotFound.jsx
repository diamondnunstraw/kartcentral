import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-500">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/products"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 