'use client';

export default function ProductCategoryUI({ data }) {
  return (
    <div className="mt-4">
      {data && (
        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
