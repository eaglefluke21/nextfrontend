'use client';

import Link from "next/link";
import loginUser from "./action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const [state,formAction] = useActionState(loginUser,{sucess:null,error:null});
  const router = useRouter();
  useEffect(()=>{
    if(state.sucess){
      router.push('/user-profile');
    }
  },[state.sucess]);

  return (
    <>
      <div className="p-6">
        <Link href="/user-profile" className="text-blue-500 underline">
          Go to User Profile
        </Link>
      </div>

      <div className="p-6">
        <Link href="/product-category" className="text-blue-500 underline">
          Go to Product Categories
        </Link>
      </div>

<div className="text-green-500">
      {state?.sucess}
    </div>
    <div className="text-red-500">
      {state?.error}
    </div>


      <div>
        <form action={formAction}>
        <div className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Login
          </button>
        </div>
        </form>
      </div>
    </>
  );
}
