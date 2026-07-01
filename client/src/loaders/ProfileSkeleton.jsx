import "./Skeleton.css";

function ProfileSkeleton() {
  return (
    <section className="profile-page">
      {/* Header */}
      <div className="profile-header skeleton-card">
        <div className="profile-avatar">
          <div
            className="skeleton"
            style={{
              width: "190px",
              height: "190px",
              borderRadius: "50%",
            }}
          ></div>
        </div>

        <div className="profile-info" style={{flex: 1}}>
          <div
            className="skeleton"
            style={{
              width: "260px",
              height: "40px",
              marginBottom: "14px",
            }}
          ></div>

          <div
            className="skeleton"
            style={{
              width: "220px",
              height: "18px",
              marginBottom: "30px",
            }}
          ></div>

          <div className="stats">
            <div>
              <div
                className="skeleton"
                style={{
                  width: "45px",
                  height: "32px",
                  marginBottom: "8px",
                }}
              ></div>

              <div
                className="skeleton"
                style={{
                  width: "60px",
                  height: "14px",
                }}
              ></div>
            </div>
          </div>

          <div
            className="skeleton"
            style={{
              width: "100%",
              maxWidth: "520px",
              height: "16px",
              marginTop: "26px",
              marginBottom: "12px",
            }}
          ></div>

          <div
            className="skeleton"
            style={{
              width: "75%",
              height: "16px",
              marginBottom: "30px",
            }}
          ></div>

          <div
            className="skeleton"
            style={{
              width: "160px",
              height: "48px",
              borderRadius: "12px",
            }}
          ></div>
        </div>
      </div>

      {/* Title */}
      <div
        className="skeleton"
        style={{
          width: "220px",
          height: "34px",
          marginBottom: "28px",
        }}
      ></div>

      {/* Cards */}
      <div className="profile-grid">
        {[1, 2, 3].map((item) => (
          <div className="profile-card skeleton-card" key={item}>
            <div
              className="skeleton"
              style={{
                width: "100%",
                height: "250px",
                borderRadius: "18px",
              }}
            ></div>

            <div
              className="skeleton"
              style={{
                width: "75%",
                height: "22px",
                marginTop: "18px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfileSkeleton;
