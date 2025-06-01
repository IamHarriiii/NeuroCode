// 📁 frontend/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { signup, login } from '../services/auth';

export default function AuthPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    username: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) =>
    setFormData({ ...formData, remember: e.target.checked });

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      username: '',
      remember: false
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = isSignup ? await signup(formData) : await login(formData);
      if (response.access) {
        if (formData.remember) {
          localStorage.setItem('access_token', response.access);
        } else {
          sessionStorage.setItem('access_token', response.access);
        }
        onLogin();
        if (window.location.pathname === '/auth') {
          window.location.href = '/';
        }
      }
    } catch (err) {
      setError(err.response?.data?.detail || JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NeuroCode</h2>
        <h3 className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-200">
          {isSignup ? 'Create an Account' : 'Sign In'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isSignup
            ? 'Already have an account? Login below.'
            : "Don't have an account? Sign up now."}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded border-l-4 border-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <>
            <input
              name="first_name"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              name="last_name"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <input
              name="username"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Username (optional)"
              value={formData.username}
              onChange={handleChange}
            />
          </>
        )}
        <input
          name="email"
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <input
            name="confirm_password"
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        )}
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
          <input
            type="checkbox"
            checked={formData.remember}
            onChange={handleCheckboxChange}
            className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-600"
          />
          Remember Me
        </label>
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all shadow-md disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              Processing...
            </span>
          ) : isSignup ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          {isSignup ? 'Back to Login' : 'Need an account? Sign Up'}
        </button>
      </div>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">or continue with</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <div className="flex justify-center gap-3">
        <a
          href="http://localhost:8000/accounts/github/login/"
          className={`flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors ${socialLoading === 'github' ? 'opacity-70' : ''
            }`}
          onClick={() => setSocialLoading('github')}
        >
          {socialLoading === 'github' ? (
            <LoadingSpinner />
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </>
          )}
        </a>
        <a
          href="http://localhost:8000/accounts/google/login/"
          className={`flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors ${socialLoading === 'google' ? 'opacity-70' : ''
            }`}
          onClick={() => setSocialLoading('google')}
        >
          {socialLoading === 'google' ? (
            <LoadingSpinner />
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.167-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.216-0.159-1.791h-9.841z" />
              </svg>
              Google
            </>
          )}
        </a>
      </div>
    </div>
  );
}