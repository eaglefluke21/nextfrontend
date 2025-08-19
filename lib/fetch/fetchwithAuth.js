import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const appId = process.env.APP_ID;

export async function fetchWithAuth(url, options = {}) {
  let cookieStore = await cookies();
  let token = cookieStore.get("shopio")?.value;
  let refreshToken = cookieStore.get("shopio_refresh")?.value;

  if (!token || !refreshToken) {
    throw new Error("Missing tokens");
  }

  // Decode & check expiry
  const decoded = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = decoded?.exp - now;

  const shouldClientRefresh = timeLeft < 240;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "app-id": appId,
    },
  });

  return { res , shouldClientRefresh };
  
}
