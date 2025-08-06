'use client';

export default function CategoryUI({ data ,error }) {
  return (
    <div className="mt-4">
      {error && 
      <span className="text-red-500">
        {error}
        </span>
        }
      {data && (
        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
