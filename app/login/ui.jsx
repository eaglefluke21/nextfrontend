'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data,setData] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
   
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const resData = await res.json();

    if(res.ok && resData.data.access_token){
      router.push('/product-category');
    }else {
      throw new Error(`Login error: ${JSON.stringify(data)}`);
    }
    setData(data);

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
      {data && <div className="text-red-500 text-sm">{data}</div>}

      <div>
        <label>Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>

</div>

</div>
    
  );
}
