import User from "../models/User.js";
import Post from "../models/Post.js";

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const posts = await Post.find({
      author: req.user._id,
    }).sort({createdAt: -1});

    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load profile",
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.bio !== undefined) {
      user.bio = req.body.bio;
    }

    if (req.file) {
      // Store relative path
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
