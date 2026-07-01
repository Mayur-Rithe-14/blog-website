import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ProfileSkeleton from "../loaders/ProfileSkeleton";
import api from "../api/axios";
import "../styles/profile.css";

const SERVER_URL = import.meta.env.VITE_SOCKET_URL;

function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");

      setUser(res.data.user);
      setPosts(res.data.posts);

      setUsername(res.data.user.username);
      setBio(res.data.user.bio || "");

      if (res.data.user.profileImage) {
        setPreview(res.data.user.profileImage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("bio", bio);

      if (image) {
        formData.append("profileImage", image);
      }

      await api.put("/users/profile", formData);

      setEditing(false);

      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (!user) return <ProfileSkeleton />;

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src={
              preview ||
              `https://ui-avatars.com/api/?name=${user.username}&background=5B5CEB&color=fff`
            }
            alt={user.username}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=5B5CEB&color=fff`;
            }}
          />

          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files.length) return;

                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          )}
        </div>

        <div className="profile-info">
          {editing ? (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <h1>{user.username}</h1>
          )}

          <p>{user.email}</p>

          <div className="stats">
            <div>
              <strong>{posts.length}</strong>
              <span>Posts</span>
            </div>
          </div>

          {editing ? (
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          ) : (
            <p className="bio">{bio || "No bio yet."}</p>
          )}

          {editing ? (
            <button onClick={saveProfile}>Save Profile</button>
          ) : (
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      <h2 className="profile-title">Your Articles</h2>

      <div className="profile-grid">
        {posts.map((post) => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="profile-card"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200";
              }}
            />

            <div className="overlay">
              <h3>{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default UserProfile;
