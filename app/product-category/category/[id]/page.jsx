import { NextResponse } from "next/server";
import CategoryUI from "./ui";
import { cookies } from "next/headers";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;
export default async function CategoryPage({params}) {

   let errorMsg = "";
   let json;
  try {
  const {id} = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("shopio")?.value;
  
  if (!token) {
   errorMsg = "unauthorized token";
  }

      const res = await fetch(`${baseurl}/v1/tenant/category/${id}`, {
      headers: {
        Authorization:`Bearer ${token}`,
        "app-id": appId,
      },
      cache: "no-store"
    });


    if (!res.ok) {
      // const errorText = await res.text();
      errorMsg = "Faile to fetch category";
    }
    const json = await res.json();
    } catch (err) {
      // errorMsg = err.message;
      errorMsg = "failed to fetch category";
  }
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4"> Category </h1>
        <CategoryUI data={json} error={errorMsg} />
      </div>
    );

}
