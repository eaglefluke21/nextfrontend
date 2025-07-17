export default function Loading() {
  return (
    <div className="p-6 animate-pulse text-gray-500">
      <h1 className="text-xl font-bold mb-4">Loading Product Categories...</h1>
      <p>Please wait while we fetch data from the server.</p>
    </div>
  );
}
