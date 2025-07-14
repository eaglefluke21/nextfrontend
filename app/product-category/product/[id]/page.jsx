export default async function ProductPage({ params }) {
  const { id } = params;



  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Detail</h1>
      <p>Showing details for product ID: <strong>{id}</strong></p>
    </div>
  );
}
