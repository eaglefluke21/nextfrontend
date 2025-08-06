"use client";

import { useActionState } from "react";
import CreateCategory from "./action";

export default function Category() {
  const[state,formAction] = useActionState(CreateCategory,{error:null});
  return (
    <div className="p-6 space-y-4">
      <span className="text-red-500">
        {state?.error}
        </span>
      <h1 className="text-xl font-bold">Category</h1>
<form action={formAction}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="publish"
          />
          Publish
        </label>

        <input
          type="file"
          name="image[]"
          accept="image/*"
          multiple
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
        </form>
     </div>
  );

};
