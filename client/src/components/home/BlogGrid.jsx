import {useEffect, useState} from "react";
import api from "../../api/axios";
import BlogCard from "./BlogCard";

import "../../styles/blog.css";

function BlogGrid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");

      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="blogs">
        <div className="container">
          <h2 className="loading">Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="blogs">
      <div className="container">
        <h2 className="section-title">Latest Blogs</h2>

        <div className="blog-grid">
          {posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="no-posts">
              No blog posts yet. Be the first to write one! 🚀
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogGrid;
