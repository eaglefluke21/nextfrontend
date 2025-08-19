import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;
  const refreshToken = cookieStore.get("shopio_refresh")?.value;

  if (!token || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 401 });
  }
  try {
   const res = await fetch(`${baseurl}/v1/auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "app-id": appId,
        "X-Refresh-Token": refreshToken,
      },
      cache: "no-store",
    });

    const  resData = await res.json();

    const response = NextResponse.json(resData, { status: res.status });
    console.log('resData in api/refresh',resData);

  if (resData.data?.access_token && resData.data?.refresh_token) {
    const cookieOptions = { httpOnly: true, secure: false, path: "/", maxAge: 86400, sameSite: "Lax" };
    response.cookies.set("shopio", resData.data.access_token, cookieOptions);
    response.cookies.set("shopio_refresh", resData.data.refresh_token, cookieOptions);
    console.log('cookies set');
  }
console.log('returning response');
  return response;
  
  } catch (err) {
    return NextResponse.json({ error: "Backend fetch failed", details: err.message }, { status: 500 });
  }
}
