import Link from "next/link";
export default function Home() {
  return (
    <div className="flex justify-center">

   <p>Home</p>
   <div className="p-6">
    
      <Link href="/login" className="text-green-500 underline">
       Login page
      </Link>
    </div>
     <div className="p-6">
      
      <Link href="/product-category" className="text-blue-500 underline">
        Go to Product Categories
      </Link>
    </div>

   </div>
  );
}
