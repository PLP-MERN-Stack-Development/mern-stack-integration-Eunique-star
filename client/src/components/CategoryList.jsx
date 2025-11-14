import React, { useState, useEffect } from "react";
import { categoryService } from "../services/api";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAllCategories();
      const categoryArray = Array.isArray(res) ? res : res.data || [];
      setCategories(categoryArray);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    }
  };

  // Handle new category submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a category name");

    setLoading(true);
    try {
      await categoryService.createCategory({ name, description });
      alert("Category added successfully!");
      setName("");
      setDescription("");
      fetchCategories(); // refresh list
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Categories</h2>

      {/* Form to create new category */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
        />
        <textarea
          placeholder="Category Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
          rows="3"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>

      {/* List of categories */}
      <h3 className="text-xl font-semibold mb-3">All Categories</h3>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{cat.name}</p>
                {cat.description && (
                  <p className="text-sm text-gray-500">{cat.description}</p>
                )}
              </div>
              <span className="text-gray-400 text-sm">{cat.slug}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList;
