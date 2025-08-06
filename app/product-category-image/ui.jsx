'use client';

export default function ProductCategoryUI({ data ,error }) {
  return (
    <div className="mt-4">

      <span className="text-red-500">
        {error}
      </span>
    
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
  
    </div>
  );
}
