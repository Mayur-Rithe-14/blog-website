import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";
import "../styles/createPost.css";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    content: "",
  });

  const [imageFile, setImageFile] = useState(null); // ✅ NEW
  const [preview, setPreview] = useState(null); // ✅ NEW
  const [loading, setLoading] = useState(false);

  // ================= TEXT CHANGE =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      // preview image
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);

      // ⭐ IMPORTANT: image file
      data.append("coverImage", imageFile);

      await api.post("/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <div className="post-card">
          <h1>Create New Blog</h1>

          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            {/* CATEGORY */}
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Technology</option>
              <option>Programming</option>
              <option>React</option>
              <option>Node.js</option>
              <option>MongoDB</option>
              <option>JavaScript</option>
              <option>Express</option>
            </select>

            {/* IMAGE UPLOAD (NEW) */}
            <label>Cover Image</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {/* PREVIEW */}
            {preview && (
              <img src={preview} alt="Preview" className="cover-preview" />
            )}

            {/* CONTENT */}
            <label>Content</label>
            <textarea
              name="content"
              rows="12"
              placeholder="Write your article..."
              value={formData.content}
              onChange={handleChange}
              required
            />

            {/* SUBMIT */}
            <button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreatePost;
