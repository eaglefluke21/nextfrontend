import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function GET(req) {
  try{
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;
  if(!token){
    throw new Error(`token not found ${token}`)
  }
  const res = await fetch(`${baseurl}/v1/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "app-id": appId,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP Error ${res.status}: ${errorText}`);
  }
  const resData = await res.json();
  const response = NextResponse.json(resData);

  return response;

}catch(err){
  throw new Error(`error occured while fetching user profile: ${err}`);
}
}
