import { cookies } from "next/headers";
import {fetchWithAuth} from "../fetch/fetchwithAuth";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function getProductCategories(){
   let errorMsg = '';
  let json = {};
  
const cookieStore = await cookies();
    const token = cookieStore.get('shopio')?.value;
    const refreshToken = cookieStore.get('shopio_refresh')?.value;

    if (!token) {
      errorMsg = 'Unauthorized: No token found';
    }

    const res = await fetchWithAuth(`${baseurl}/v1/tenant/categories`, {
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