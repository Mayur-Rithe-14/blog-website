import User from "../models/User.js";
import Post from "../models/Post.js";

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const posts = await Post.find({
      author: req.user._id,
    }).sort({createdAt: -1});

    res.json({
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

    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
