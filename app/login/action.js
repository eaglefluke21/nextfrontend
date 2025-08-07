"use server";

import { cookies } from "next/headers";
const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function loginUser(prevState,formData) {
  try{
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${baseurl}/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "app-id": appId
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok && res.status == 500) {
    const errorText = await res.text();
    throw new Error(`HTTP Error ${res.status}: ${errorText}`);
  }else if(!res.ok){
    return {error: "Email or password is incorrect . Please Try again"};
  }

  const resData = await res.json();
//   const response = NextResponse.json(resData);

  const cookieStore = await cookies();
  if (resData.data.access_token && resData.data.refresh_token) {
    cookieStore.set("shopio", resData.data.access_token, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "Lax",
    });

    cookieStore.set("shopio_refresh", resData.data.refresh_token, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "Lax",
    });
  }
  return {sucess: true};
} catch(err){
  return {error: `Some issue occured , please try again ${err}`};
  // throw new Error(`server Error , ${err}`);
}
}
