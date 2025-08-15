import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function middleware(request) {
  const token = request.cookies.get("shopio")?.value;
  const refreshToken = request.cookies.get("shopio_refresh")?.value;

  if (!token || !refreshToken) {
    throw new Error('token not found');
    // return NextResponse.next();
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded?.exp) {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = decoded.exp - now;

      if (timeLeft < 240) {
        console.log("time less than 4 minutes left");

        const res = await fetch(`${baseurl}/v1/auth/refresh-token`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "app-id": appId,
            "X-Refresh-Token": refreshToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!res.ok) {
          const message = await res.text();
          console.log('error occured');
          throw new Error(`error ${message}`);
        }

        const resData = await res.json();
        const response = NextResponse.next();
        const cookieStore = await cookies();
        console.log('middleware response',resData);
        if (resData.data.access_token && resData.data.refresh_token) {
          cookieStore.set("shopio", resData.data.access_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            sameSite: "Lax",
          });
          cookieStore.set("shopio_refresh", resData.data.refresh_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            sameSite: "Lax",
          });
          console.log("new cookies set");
          return response;
        }
      } else {
        console.log("time more than 4 minutes left");
      }
    }
  } catch (err) {
    console.error("Token decode error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
