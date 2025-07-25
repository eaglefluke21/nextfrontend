import { NextResponse } from "next/server";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function GET(request) {
  try {
    const token = request.headers.get('x-access-token');
    const refreshToken = request.headers.get('X-Refresh-Token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const res = await fetch(`${baseurl}/v1/tenant/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "app-id": appId,
        "X-Refresh-Token": refreshToken,
      },
      credentials: 'include',
    });

    const json = await res.json();

    const response = NextResponse.json(json);

    // If token was refreshed, send tokens to client so it can set them
    if (res.status === 200 && json.message === "Token refreshed") {
      response.headers.set("x-refreshed", "true");
      json.refreshed = true;
      json.newTokens = {
        access_token: json.data.access_token,
        refresh_token: json.data.refresh_token,
      };
    }

    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
