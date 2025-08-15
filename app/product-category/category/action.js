"use server";

import { cookies } from "next/headers";

const baseurl = process.env.PHP_LOCAL_SITE_URL;
const appId = process.env.APP_ID;

export default async function CreateCategory(prevState,formData) {

     const cookieStore = await cookies();
     const token = cookieStore.get("shopio")?.value;
    
      if (!token) {
        return {error : "unauthorized token: please log in"};
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

    const resData = await res.json();
    if (res.ok && resData) {
         console.log('response',resData);
    } else {
        return {error : `issue occured: please try again `};
    }
  };

