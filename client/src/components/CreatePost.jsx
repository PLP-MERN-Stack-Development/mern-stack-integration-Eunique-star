import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postService, categoryService, authService } from "../services/api"; // Import authService

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null); // New State for Image
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // 🟡 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAllCategories();
        // Your logic here was perfect!
        const allCategories = Array.isArray(res) ? res : res.data || [];
        setCategories(allCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🟡 If editing, fetch post data
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const res = await postService.getPost(id);
          const post = res.data || res;
          setTitle(post.title);
          setContent(post.content);
          setCategory(post.category?._id || "");
          // Note: We usually don't pre-fill file inputs for security reasons
        } catch (error) {
          console.error("Error loading post:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  // 🟢 Handle submit with Image & Real User
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentUser = authService.getCurrentUser(); // Get the real logged-in user

    // ⚠️ CRITICAL: Use FormData for Images
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("author", currentUser?.id); // Send the real User ID

    if (featuredImage) {
      formData.append("featuredImage", featuredImage); // Attach the file
    }

    try {
      if (id) {
        await postService.updatePost(id, formData);
        alert("✅ Post updated successfully!");
      } else {
        await postService.createPost(formData);
        alert("✅ Post created successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("❌ Error saving post:", error);
      alert("Failed to save post. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Post" : "Create New Post"}
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Featured Image Input (Task 5 Requirement) */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files[0])} // Capture the file
            className="w-full border px-3 py-2 rounded bg-gray-50"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            rows="6"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select a Category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
