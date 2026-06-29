import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../api/axios";
import "../styles/editPost.css";

function EditPost() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    content: "",
    coverImage: "", // existing image URL/path
  });

  const [imageFile, setImageFile] = useState(null); // NEW
  const [preview, setPreview] = useState(null); // NEW
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ================= FETCH POST =================
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);

        setFormData({
          title: res.data.title,
          category: res.data.category,
          content: res.data.content,
          coverImage: res.data.coverImage,
        });
      } catch (err) {
        alert("Failed to load post");
      } finally {
        setFetching(false);
      }
    };

    fetchPost();
  }, [id]);

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

      // if new image selected → send file
      if (imageFile) {
        data.append("coverImage", imageFile);
      }

      await api.put(`/posts/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/post/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading post...</p>;

  return (
    <section className="create-post">
      <div className="container">
        <div className="post-card">
          <h1>Edit Blog</h1>

          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <label>Title</label>
            <input
              type="text"
              name="title"
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

            {/* IMAGE UPLOAD */}
            <label>Cover Image</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {/* PREVIEW LOGIC */}
            {preview ? (
              <img src={preview} className="cover-preview" />
            ) : formData.coverImage ? (
              <img
                src={`http://localhost:5000${formData.coverImage}`}
                className="cover-preview"
              />
            ) : null}

            {/* CONTENT */}
            <label>Content</label>
            <textarea
              name="content"
              rows="12"
              value={formData.content}
              onChange={handleChange}
              required
            />

            {/* BUTTON */}
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditPost;
