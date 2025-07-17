"use client";

import { useState } from "react";

export default function Category() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    featured: false,
    publish: true,
    image: [],
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

     if (type === "file") {
    const fileArray = Array.from(files);
    setForm((prev) => ({ ...prev, image: fileArray }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value,
    }));
  };
};

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("featured", form.featured ? "1" : "0");
    formData.append("publish", form.publish ? "1" : "0");
    form.image.forEach((file) => {
        formData.append("image[]",file);
    });

    const res = await fetch("/api/product-category/category", {
      method: "POST",
      body: formData,
    });

    const resData = await res.json();

    if (res.ok && resData) {
      setData(resData);
    } else {
      setData({ error: resData.message || "Something went wrong" });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Category</h1>

      {data && (
        <pre className="text-sm bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="publish"
            checked={form.publish}
            onChange={handleChange}
          />
          Publish
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          multiple
          onChange={handleChange}
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
