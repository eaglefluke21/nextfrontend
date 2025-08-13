export default function ProductCategoryLayout({ children , tenant ,users}) {
  return (
    <div className="border-2 border-gray-200 rounded-lg m-6 p-4">
      <h2 className="text-2xl font-semibold mb-4">🧾 Product Category Section</h2>
     <div> {children} </div> 
     <aside> {tenant} </aside> 
     <aside> {users} </aside>
    </div>
  );
}
