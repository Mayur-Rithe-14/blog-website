import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";

// ================= GET COMMENTS =================
export const getComments = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
      return res.status(400).json({message: "Invalid post ID"});
    }

    const comments = await Comment.find({
      post: req.params.postId,
    })
      .select("text user post parentComment createdAt")
      .populate("user", "username")
      .sort({createdAt: 1}); // IMPORTANT: ASC for nesting

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({message: "Failed to fetch comments"});
  }
};

// ================= ADD COMMENT =================
export const addComment = async (req, res) => {
  try {
    const {text, parentComment} = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      text: text.trim(),
      post: req.params.postId,
      user: req.user._id,
      parentComment: parentComment || null,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "username",
    );

    // ================= REAL-TIME =================
    const io = req.app.get("io");

    if (io) {
      io.to(`post_${req.params.postId}`).emit("new-comment", populatedComment);
    }

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({message: "Failed to add comment"});
  }
};

// ================= DELETE COMMENT =================
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({message: "Comment not found"});
    }

    // only owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Not authorized"});
    }

    await Comment.findByIdAndDelete(req.params.id);

    // optional: real-time delete emit
    const io = req.app.get("io");
    io.to(`post_${comment.post}`).emit("delete-comment", req.params.id);

    res.status(200).json({message: "Comment deleted"});
  } catch (error) {
    res.status(500).json({message: "Failed to delete comment"});
  }
};
