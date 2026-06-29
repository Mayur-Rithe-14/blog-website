import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import api from "../api/axios";
import "../styles/explore.css";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading Explore...</p>;

  return (
    <section className="explore">
      <div className="container">
        <h1>Explore Posts</h1>

        <div className="explore-grid">
          {posts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="explore-card"
            >
              <img src={post.coverImage} alt="" />
              <div>
                <h3>{post.title}</h3>
                <p>{post.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Explore;
