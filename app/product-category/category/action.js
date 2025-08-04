"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function CreateCategory(formData) {

     const cookieStore = await cookies();
     const token = cookieStore.get("shopio")?.value;
    
      if (!token) {
        return NextResponse.json({ message: "Token not found" }, { status: 401 });
      }
    
      formData.append("parent_id", "");
    
      const res = await fetch(`${baseurl}/v1/tenant/category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "app-id": appId,
        },
        body: formData,
      });

      console.log("formdata",formData);


    const resData = await res.json();

    console.log('response',resData);

    if (res.ok && resData) {
      redirect('/product-category')
    } else {
      console.log(resData.message, "Something went wrong");
    }
  };

