import "../styles/Skeleton.css";

function PostDetailsSkeleton() {
  return (
    <section className="post-details">
      <div className="container post-container">
        <div className="post-skeleton">
          <div className="skeleton skeleton-image"></div>

          <div className="skeleton skeleton-title"></div>

          <div className="skeleton skeleton-meta"></div>

          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line short"></div>
        </div>

        <div className="comments-skeleton">
          <div className="skeleton skeleton-comment"></div>
          <div className="skeleton skeleton-comment"></div>
          <div className="skeleton skeleton-comment"></div>
        </div>
      </div>
    </section>
  );
}

export default PostDetailsSkeleton;
