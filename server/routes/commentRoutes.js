import express from "express";
import protect from "../middleware/authMiddleware.js"; // ✅ FIXED (default import)

import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/:postId", protect, addComment);
router.delete("/:id", protect, deleteComment);

export default router;
