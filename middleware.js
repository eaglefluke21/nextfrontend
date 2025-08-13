import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function middleware(request) {
  const token = request.cookies.get("shopio")?.value;
  const refreshToken = request.cookies.get("shopio_refresh")?.value;

  if (!token || !refreshToken) {
    return NextResponse.next(); 
  }

  try {
    const decoded = jwtDecode(accessToken);
    console.log("console log",decoded);
    if (decoded?.exp) {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = decoded.exp - now;

      if (timeLeft < 240) {
        const res = await fetch(`${baseurl}/v1/auth`, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            'app-id': appId,
            'X-Refresh-Token': refreshToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (res.ok) {
          const data = await res.json();
          const response = NextResponse.next();
          response.cookies.set("shopio", data.access_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            sameSite: "Lax",
          });
          response.cookies.set("shopio_refresh", data.refresh_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            sameSite: "Lax",
          });
          return response;
        }
      }
    }
  } catch (err) {
    console.error("Token decode error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
