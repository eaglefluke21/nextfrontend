'use client';

export default function Error({ error, reset }) {
  return (
    <div className="p-6 text-red-600">
      <h1 className="text-xl font-bold mb-4">Failed to login</h1>
      <p className="mb-4">{error.message}</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
