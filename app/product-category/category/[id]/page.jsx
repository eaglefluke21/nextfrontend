import CategoryUI from "./ui";
import { cookies } from "next/headers";

const baseurl = process.env.NEXT_LOCAL_SITE_URL;
export default async function CategoryPage({params}) {

  const {id} = params;
  console.log("param id", id);
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;
    const res = await fetch(
      `${baseurl}/api/product-category/category?id=${id}`,
      {
        headers: {
          "x-access-token": token,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch  category: ${errorText}`);
    }
    const json = await res.json();

    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4"> Category </h1>
        <CategoryUI data={json} />
      </div>
    );

}
