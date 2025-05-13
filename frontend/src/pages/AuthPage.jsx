// 📁 frontend/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { signup, login } from '../services/auth';

export default function AuthPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', password: '', confirm_password: '', username: '', remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ first_name: '', last_name: '', email: '', password: '', confirm_password: '', username: '', remember: false });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = isSignup ? await signup(formData) : await login(formData);
      if (formData.remember) {
        localStorage.setItem('access_token', response.access);
      } else {
        sessionStorage.setItem('access_token', response.access);
      }
      onLogin();
    } catch (err) {
      setError(err.response?.data?.detail || JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <>
            <input className="input" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} required />
            <input className="input" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} required />
            <input className="input" placeholder="Username (optional)" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          </>
        )}
        <input className="input" type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        <input className="input" type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
        {isSignup && (
          <input className="input" type="password" placeholder="Confirm Password" value={formData.confirm_password} onChange={e => setFormData({ ...formData, confirm_password: e.target.value })} required />
        )}
        <label className="flex items-center">
          <input type="checkbox" checked={formData.remember} onChange={e => setFormData({ ...formData, remember: e.target.checked })} className="mr-2" />
          Remember Me
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <button className="btn w-full" type="submit" disabled={loading}>{loading ? 'Submitting...' : isSignup ? 'Create Account' : 'Login'}</button>
      </form>
      <div className="text-sm mt-3 text-center">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={toggleForm} className="text-blue-600 ml-1 underline">{isSignup ? 'Login' : 'Sign Up'}</button>
      </div>
      <div className="mt-6">
        <p className="text-center mb-2">or sign in with</p>
        <div className="flex justify-center gap-4">
          <a href="/accounts/github/login/" className="btn-sm bg-gray-800 text-white">GitHub</a>
          <a href="/accounts/google/login/" className="btn-sm bg-red-500 text-white">Google</a>
        </div>
      </div>
    </div>
  );
}