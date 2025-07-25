import ProductCategoryUI from "./ui";
import { cookies } from "next/headers";

const baseurl = process.env.NEXT_LOCAL_SITE_URL;

export default async function ProductCategoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;
  const refreshToken = cookieStore.get("shopio_refresh")?.value;

  const res = await fetch(`${baseurl}/api/product-category?id=01jzatvpb45680nj4wgsn0tn0v`, {
    headers: {
      "x-access-token": token,
      "X-Refresh-Token": refreshToken,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch product category: ${errorText}`);
  }

  const json = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Category</h1>
      <ProductCategoryUI data={json} />
    </div>
  );
}
