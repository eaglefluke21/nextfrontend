import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  const formData = await req.formData();

  const proxyFormData = new FormData();
  for (const [key, value] of formData.entries()) {
    proxyFormData.append(key, value);
  }

  proxyFormData.append("parent_id", "");

  const res = await fetch(`${baseurl}/v1/tenant/category`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "app-id": appId,
    },
    body: proxyFormData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ message: errorText }, { status: res.status });
  }

  const resData = await res.json();
  return NextResponse.json(resData);
}



export async function GET(request) {
  try {
    const token = request.headers.get('x-access-token');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized no token found' }, { status: 401 });
  }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log('category id',id);
    const res = await fetch(`${baseurl}/v1/tenant/category/${id}`, {
      headers: {
        Authorization:`Bearer ${token}`,
        "app-id": appId,
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP Error ${res.status}: ${errorText}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    // console.error("error",appId);
    //  throw new Error(`Laravel returned error:\n${appId}`);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
