export default function usersLayout({children}){
  return(
    <div className="border-2 border-gray-200 rounded-lg m-6 p-4">
      <h2 className="text-2xl font-semibold mb-4">🧾 Users</h2>
    {children}
   </div>
    
  );
}