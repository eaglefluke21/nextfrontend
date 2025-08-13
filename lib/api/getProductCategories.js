import { cookies } from "next/headers";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function getProductCategories(){
const cookieStore = await cookies();
    const token = cookieStore.get('shopio')?.value;
    const refreshToken = cookieStore.get('shopio_refresh')?.value;

    if (!token) {
      errorMsg = 'Unauthorized: No token found';
    }

    const res = await fetch(`${baseurl}/v1/tenant/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'app-id': appId,
        'X-Refresh-Token': refreshToken,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      // const errorText = await res.text();
      errorMsg = 'Failed to fetch product category';
    }

    json = await res.json();
    return {data:json,error:errorMsg};
  };