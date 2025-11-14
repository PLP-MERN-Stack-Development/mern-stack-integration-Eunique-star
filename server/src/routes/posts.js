// routes/posts.js
const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost 
} = require('../controllers/postController');

// Import Middleware
const { protect } = require('../middleware/auth'); // Security guard
const upload = require('../middleware/fileUpload'); // Image uploader

// Map the routes
router.route('/')
  .get(getPosts) // Public: Everyone can see posts
  .post(protect, upload.single('featuredImage'), createPost); // Private: Only logged in users can create

router.route('/:id')
  .get(getPost) // Public: Everyone can read a specific post
  .put(protect, upload.single('featuredImage'), updatePost) // Private: Only logged in users can update
  .delete(protect, deletePost); // Private: Only logged in users can delete

module.exports = router;