'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleInputChange(identifier, value) {
    setFormData((preValue) => ({
      ...preValue,
      [identifier]: value,
    }));
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const resData = await res.json();

      if (res.ok && resData?.data?.access_token) {
        router.push('/product-category');
      } else {
        throw new Error(resData?.error || 'Invalid Email ID or Password');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="p-6">
        <Link href="/user-profile" className="text-blue-500 underline">
          Go to Product Categories
        </Link>
      </div>
      <div>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => handleInputChange('email', e.target.value)}
              value={formData.email}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => handleInputChange('password', e.target.value)}
              value={formData.password}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
