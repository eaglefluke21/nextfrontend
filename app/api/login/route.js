import { NextResponse } from 'next/server';

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function POST(req) {
  try{
  const body = await req.json();

  const res = await fetch(`${baseurl}/v1/user/login`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'app-id':appId },
     credentials: 'include',
    body: JSON.stringify(body),
  }); 
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP Error ${res.status}: ${errorText}`);
    }

  const resData = await res.json();

  const response = NextResponse.json(resData);

  if (resData.data.access_token && resData.data.refresh_token) {
    console.log("log data",resData.data.refresh_token);
    response.cookies.set('shopio', resData.data.access_token, {
      httpOnly: true,
      secure: false, 
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'Lax'
    });

    response.cookies.set('shopio_refresh', resData.data.refresh_token, {
      httpOnly: true,
      secure: false, 
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'Lax'
    });
  }

  return response;
}catch(err) 
{
  return NextResponse.json({ message: `Login Failed: ${err}` }, { status: 500 });
}
}
