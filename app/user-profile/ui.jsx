"use client";

import { useState } from "react";

export default function UserProfile() {
const [data, setData] = useState("");
  const [errMsg,seterrMsg] = useState("");
  
  async function handleProfile(e) {
    try{
  e.preventDefault();

    const res = await fetch("/api/user-profile");
    const resData = await res.json();

    if (res.ok && resData.data) {
      setData(resData.data);
      seterrMsg(""); 
    } else {
      seterrMsg("Failed to fetch User Profile");
    }
  
} catch(err){
  seterrMsg(`Failed to fetch User Profile ${err}`);
  // seterrMsg(err.message);
}
  }
  return (
    <div>
      
        {errMsg && 
      <span className="text-red-500">
         {errMsg}
        </span>  
        }
      
      <div className="p-6">
        <button
          onClick={handleProfile}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Profile
        </button>

        <div className="mt-4">
          {data && (
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
