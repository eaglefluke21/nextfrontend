'use client';
import { useEffect } from "react";

export default function ProductCategoryUI({ data }) {
  useEffect(() => {
    console.log("data outside", data);

    if (data?.message === 'Token refreshed' && data?.data?.access_token && data?.data?.refresh_token) {
      console.log("data", data);
      fetch('/api/set-cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token
        }),
      });
    }
  }, [data]);

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}
