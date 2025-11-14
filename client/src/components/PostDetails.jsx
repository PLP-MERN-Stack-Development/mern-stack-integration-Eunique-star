import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postService } from "../services/api";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Define the base URL for your images
  // This points to your backend server
  const API_URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(id);
        setPost(res.data || res); // Handle different response formats
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await postService.deletePost(id);
      alert("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!post) return <p className="text-center mt-6">Post not found</p>;

  // 2. Helper to fix Windows paths (backslashes)
  // Windows saves paths like "uploads\image.jpg", but browsers need "uploads/image.jpg"
  const imageUrl = post.featuredImage
    ? `${API_URL}${post.featuredImage.replace(/\\/g, "/")}`
    : null;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      {/* 3. Display the Image if it exists */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Optional: Display Category and Date */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
          {post.category?.name || "Uncategorized"}
        </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-600 mb-6 whitespace-pre-line">{post.content}</p>

      <div className="flex justify-between mt-6">
        <Link
          to={`/edit/${post._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
