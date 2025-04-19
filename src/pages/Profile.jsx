import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Profile = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || '',
    phoneNumber: currentUser?.phoneNumber || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    zipCode: currentUser?.zipCode || '',
    country: currentUser?.country || 'United States',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(profileData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
    }
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-purple-900 px-6 py-8">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-purple-700 flex items-center justify-center text-2xl font-bold text-white">
              {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">
                {currentUser.displayName || 'User Profile'}
              </h1>
              <p className="text-purple-200">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-900 text-white p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900 text-white p-4 rounded-md mb-6">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="md:col-span-2">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                        Display Name
                      </label>
                      <input
                        id="displayName"
                        name="displayName"
                        type="text"
                        value={profileData.displayName}
                        onChange={handleChange}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={profileData.phoneNumber}
                        onChange={handleChange}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={profileData.address}
                        onChange={handleChange}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={profileData.city}
                          onChange={handleChange}
                          className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">
                          State
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={profileData.state}
                          onChange={handleChange}
                          className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                          ZIP Code
                        </label>
                        <input
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          value={profileData.zipCode}
                          onChange={handleChange}
                          className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={profileData.country}
                          onChange={handleChange}
                          className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                          <option value="China">China</option>
                          <option value="India">India</option>
                          <option value="Brazil">Brazil</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Display Name</h3>
                      <p className="mt-1">{profileData.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Phone Number</h3>
                      <p className="mt-1">{profileData.phoneNumber || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Address</h3>
                      <p className="mt-1">
                        {profileData.address ? (
                          <>
                            {profileData.address}<br />
                            {profileData.city && `${profileData.city}, `}
                            {profileData.state && `${profileData.state} `}
                            {profileData.zipCode && profileData.zipCode}<br />
                            {profileData.country}
                          </>
                        ) : (
                          'Not set'
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Summary */}
            <div>
              <div className="bg-gray-700 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="font-medium">
                      {currentUser.metadata?.creationTime 
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Cart Items</p>
                    <p className="font-medium">{cart.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Orders</p>
                    <p className="font-medium">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/orders')}
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded transition-colors text-left"
                  >
                    View Orders
                  </button>
                  <button
                    onClick={() => navigate('/wishlist')}
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded transition-colors text-left"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded transition-colors text-left"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 