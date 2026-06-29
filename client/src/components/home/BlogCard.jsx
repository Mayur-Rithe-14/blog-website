import {Link} from "react-router-dom";
import {FiClock, FiUser, FiArrowRight} from "react-icons/fi";

import "../../styles/blog.css";

const placeholder =
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800";

function BlogCard({post}) {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img
          src={post.coverImage || placeholder}
          alt={post.title}
          onError={(e) => {
            e.target.src = placeholder;
          }}
        />
      </div>

      <div className="blog-body">
        <div className="blog-meta">
          <span>
            <FiUser />
            {post.author?.username || "Unknown"}
          </span>

          <span>
            <FiClock />3 min read
          </span>
        </div>

        <h3>{post.title}</h3>

        <p>
          {post.content.length > 120
            ? post.content.substring(0, 120) + "..."
            : post.content}
        </p>

        <Link to={`/post/${post._id}`} className="read-more">
          Read More
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
