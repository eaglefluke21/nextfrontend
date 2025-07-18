export async function revalidateAuth() {

    const baseurl = process.env.NEXT_LOCAL_SITE_URL;

  

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopio")?.value;
    const baseHeaders = {
    Authorization: `Bearer ${token}`,
    "app-id": appId,
    "x-refresh-token": refreshToken,
  };

    let res = await fetch(url, {
      method: 'GET',
      headers: baseHeaders,
      credentials: 'include', 
    });

  
    if (res.status === 401) {
      const refreshRes = await fetch(`${baseurl}/v1/refresh`, {
        method: 'POST',
        headers: {
          "app-id": appId,
        },
        credentials: 'include', 
      });

      if (!refreshRes.ok) throw new Error("Refresh failed");

      const data = await refreshRes.json();
      const newAccessToken = data.access_token;

      // Retry original request with new access token
      const retryHeaders = {
        Authorization: `Bearer ${newAccessToken}`,
        "app-id": appId,
      };

      res = await fetch(url, {
        method: 'GET',
        headers: retryHeaders,
        credentials: 'include',
      });
    }

    return res;

  } catch (err) {
    console.error("fetchWithAuth failed:", err);
    throw err;
  }
}
