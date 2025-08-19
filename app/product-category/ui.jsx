'use client';

export default function ProductCategoryUI({ data, error }) {
  return (
    <div>
      {error && <span className="text-red-500">{error}</span>}

      {data?.data?.length > 0 && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
