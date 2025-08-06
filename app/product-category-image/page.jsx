import ProductCategoryUI from "./ui";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function ProductCategoryPage() {
    let errorMsg = "";
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;

  if (!token) {
    // return NextResponse.json(
    //   { error: "Unauthorized no token found" },
    //   { status: 401 }
    // );
    errorMsg = "Unauthorized no token found. please log in";
  }

  const res = await fetch(`${baseurl}/v1/tenant/category-image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "app-id": appId,
      cache: "no-store",
    },
  });

  if (!res.ok) {
    // const errorText = await res.text();
    errorMsg = "Failed to fetch Category Image";
  }

  const json = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Category </h1>
      <ProductCategoryUI data={json} error={errorMsg} />
    </div>
  );
}
