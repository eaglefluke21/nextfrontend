import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const nexturl = process.env.NEXT_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function fetchWithAuth(url, options = {}) {
  const cookieStore = await cookies();
  let token = cookieStore.get("shopio")?.value;
  let refreshToken = cookieStore.get("shopio_refresh")?.value;

  if (!token || !refreshToken) {
    throw new Error("Missing tokens");
  }

  const decoded = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = decoded?.exp - now;

  if (timeLeft < 240) {
    const refreshRes = await fetch(`${nexturl}/api/refresh`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!refreshRes.ok) {
      const message = await refreshRes.text();
      throw new Error(`Token refresh failed ${message}`);
    }

    token = cookieStore.get("shopio")?.value;
  }

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "app-id": appId,
    },
  });
}
