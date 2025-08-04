"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function loginUser(formData) {
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP Error ${res.status}: ${errorText}`);
  }

  const resData = await res.json();
//   const response = NextResponse.json(resData);

  const cookieStore = await cookies();
  if (resData.data.access_token && resData.data.refresh_token) {
    console.log("log data", resData.data.refresh_token);
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

  redirect('/prodcut-category');
}
