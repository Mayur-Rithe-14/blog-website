import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

// Upload image
router.post("/", protect, upload.single("coverImage"), createPost);
router.put("/:id", protect, upload.single("coverImage"), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
