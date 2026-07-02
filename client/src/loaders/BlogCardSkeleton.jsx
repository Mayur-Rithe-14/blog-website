import "../styles/Skeleton.css";

function BlogCardSkeleton() {
  return (
    <div className="blog-card skeleton-card">
      <div className="skeleton skeleton-blog-image"></div>

      <div className="blog-content">
        <div className="skeleton skeleton-blog-category"></div>

        <div className="skeleton skeleton-blog-title"></div>

        <div className="skeleton skeleton-blog-line"></div>

        <div className="skeleton skeleton-blog-line short"></div>

        <div className="skeleton skeleton-blog-author"></div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
