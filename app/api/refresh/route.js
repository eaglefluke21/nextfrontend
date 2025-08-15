import { cookies } from "next/headers";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;
  const refreshToken = cookieStore.get("shopio_refresh")?.value;

  if (!token || !refreshToken) {
    return new Response(
      ` api/refresh Missing tokens ${token} ${refreshToken}`,
      { status: 401 }
    );
  }

  const res = await fetch(`${baseurl}/v1/auth/refresh-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "app-id": appId,
      "X-Refresh-Token": refreshToken,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    return new Response(` api/refresh Failed ${message}`, { status: 401 });
  }

  const resData = await res.json();

  if (resData.data?.access_token && resData.data?.refresh_token) {
    cookieStore.set("shopio", resData.data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "Lax"
    });

    cookieStore.set("shopio_refresh", resData.data.refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Lax"
    });
  }

  return Response.json(resData);
}
