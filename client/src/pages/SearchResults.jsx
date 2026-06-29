import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import api from "../api/axios";
import BlogCard from "../components/home/BlogCard";

import "../styles/blog.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");

        const filtered = res.data.filter((post) => {
          const q = query.toLowerCase();

          return (
            post.title.toLowerCase().includes(q) ||
            post.content.toLowerCase().includes(q) ||
            post.category.toLowerCase().includes(q) ||
            post.author?.username?.toLowerCase().includes(q)
          );
        });

        setPosts(filtered);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  if (loading) {
    return (
      <section className="blogs">
        <div className="container">
          <h2>Searching...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="blogs">
      <div className="container">
        <h2 className="section-title">Search Results ({posts.length})</h2>

        {query && (
          <p style={{marginBottom: "30px", color: "#666"}}>
            Showing results for <strong>"{query}"</strong>
          </p>
        )}

        <div className="blog-grid">
          {posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <h3>No matching blogs found.</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
