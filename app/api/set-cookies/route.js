import { NextResponse } from "next/server";

export async function POST(request) {
  const { access_token, refresh_token } = await request.json();

  const response = NextResponse.json({ status: 'ok' });

  response.cookies.set('shopio', access_token, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'Lax',
  });

  response.cookies.set('shopio_refresh', refresh_token, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'Lax',
  });

  return response;
}
