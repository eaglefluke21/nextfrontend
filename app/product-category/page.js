"use client";
import ProdcutCategoryApi from "./api";
export default function productCategory(){

    return(
       <button onClick={() => { ProdcutCategoryApi()}} className="  border-white bg-amber-500">
        check category
       </button>
    );
}