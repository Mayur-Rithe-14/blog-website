import "../styles/Skeleton.css";

function EditPostSkeleton() {
  return (
    <section className="create-post">
      <div className="container">
        <div className="skeleton-card">
          <div
            className="skeleton"
            style={{
              width: "180px",
              height: "34px",
              marginBottom: "30px",
            }}
          />

          <div
            className="skeleton"
            style={{
              width: "100%",
              height: "52px",
              marginBottom: "18px",
            }}
          />

          <div
            className="skeleton"
            style={{
              width: "220px",
              height: "48px",
              marginBottom: "18px",
            }}
          />

          <div
            className="skeleton skeleton-image"
            style={{
              height: "280px",
              marginBottom: "24px",
            }}
          />

          <div
            className="skeleton"
            style={{
              width: "100%",
              height: "260px",
              borderRadius: "14px",
              marginBottom: "24px",
            }}
          />

          <div
            className="skeleton"
            style={{
              width: "170px",
              height: "46px",
              borderRadius: "10px",
              marginLeft: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default EditPostSkeleton;
