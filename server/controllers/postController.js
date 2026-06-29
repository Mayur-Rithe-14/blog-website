import Post from "../models/Post.js";

// GET all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({createdAt: -1});

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email",
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE post
export const createPost = async (req, res) => {
  try {
    const {title, content, category} = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    let coverImage = "";

    // Image uploaded with multer
    if (req.file) {
      coverImage = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const post = await Post.create({
      title,
      content,
      category,
      coverImage,
      author: req.user._id,
    });

    const newPost = await Post.findById(post._id).populate(
      "author",
      "username email",
    );

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE post
export const updatePost = async (req, res) => {
  try {
    const {title, content, category} = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    if (req.file) {
      post.coverImage = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await post.save();

    const updatedPost = await Post.findById(post._id).populate(
      "author",
      "username email",
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Only owner can delete
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
