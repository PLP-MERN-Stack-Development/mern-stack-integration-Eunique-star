import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postService, categoryService } from "../services/api";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAllCategories();
        const categoryArray = Array.isArray(res) ? res : res.data || [];
        setCategories(categoryArray);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch posts (filtered by category)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await postService.getAllPosts(1, 10, selectedCategory);
        setPosts(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]); // re-fetch when category changes

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">All Blog Posts</h1>

      {/* Category filter dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded w-1/2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border-b pb-2">
              <Link
                to={`/posts/${post._id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 text-sm mt-1">
                {post.excerpt || post.content.slice(0, 100) + "..."}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Post
        </Link>
      </div>
    </div>
  );
}

export default PostList;
