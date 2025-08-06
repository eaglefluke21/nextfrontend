import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ProductCategoryUI from "./ui";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function ProductCategoryPage() {
  let errorMsg ="";
  let json = {};
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopio")?.value;
    const refreshToken = cookieStore.get("shopio_refresh")?.value;

    if (!token) {
      // return NextResponse.json(
      //   { error: "Unauthorized: No token found" },
      //   { status: 401 }
      // );
        errorMsg = "Unauthorized: No token found";
    }

    const res = await fetch(`${baseurl}/v1/tenant/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "app-id": appId,
        "X-Refresh-Token": refreshToken,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      // const errorText = await res.text();
      errorMsg = "Failed to fetch product category";
    }

     json = await res.json();

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
  } catch (err) {
    errorMsg = "serve error : product category ";
    // errorMsg = err.message;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Category</h1>
      <ProductCategoryUI data={json} error={errorMsg} />
    </div>
  );
}
