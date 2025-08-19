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
      formData.set("featured", formData.get("featured") === "on" ? 1 : 0);
      formData.set("featured", formData.get("publish") === "on" ? 1 : 0);



      console.log('formdata product category',formData);
    
      const res = await fetch(`${baseurl}/v1/tenant/category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "app-id": appId,
        },
        body: formData,
      });

    
    if(!res.ok){
     const message = await res.text();
     return {error : `issue occured please try again. ${message}`};
    }
    
    if (res.ok) {
      const resData = await res.json();
      console.log('response',resData);
    }
     
  };

