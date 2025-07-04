import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance.js'; // Import your axiosInstance

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');  // Clear any existing errors

    try {
      // Send POST request with email and password to the backend using axiosInstance
      const response = await axiosInstance.post(
        '/api/auth/login',  // This is the API endpoint
        { email, password },
        {
          withCredentials: true, // Important to allow cookies to be sent/received
        }
      );

      // Backend should set the cookie automatically
      if (response.status === 200) {
        // Successfully logged in, redirect to the dashboard
        window.location.href = '/dashboard';  // Replace with your actual redirect path
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      // Display proper error messages based on backend response
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-green-500">Admin Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please login to access the dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Input */}
            <div className="mb-2">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border-green-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="border-green-300 appearance-none rounded-md block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
        </form>

        {/* Go Back Home Link */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-green-600 hover:text-green-700">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
