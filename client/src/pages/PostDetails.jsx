import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import PostDetailsSkeleton from "../loaders/PostDetailsSkeleton";
import "../styles/skeleton.css";
import api from "../api/axios";
import socket from "../socket";
import {FiMessageCircle, FiTrash2} from "react-icons/fi";
import "../styles/postDetails.css";

function PostDetails() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // ================= POST =================
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch {
        alert("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ================= COMMENTS =================
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // ================= SOCKET =================
  useEffect(() => {
    if (!id) return;

    socket.emit("join-post", id);

    const handleNewComment = (comment) => {
      setComments((prev) => [comment, ...prev]);
    };

    const handleDeleteComment = (commentId) => {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    };

    socket.on("new-comment", handleNewComment);
    socket.on("delete-comment", handleDeleteComment);

    return () => {
      socket.emit("leave-post", id);
      socket.off("new-comment", handleNewComment);
      socket.off("delete-comment", handleDeleteComment);
    };
  }, [id]);

  // ================= ADD COMMENT =================
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await api.post(`/comments/${id}`, {
        text: commentText,
        parentComment: replyTo,
      });

      setCommentText("");
      setReplyTo(null);

      fetchComments();
    } catch {
      alert("Failed to add comment");
    }
  };

  // ================= DELETE POST =================
  const handleDeletePost = async () => {
    if (!window.confirm("Delete post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch {
      alert("Delete failed");
    }
  };

  // ================= EDIT POST =================
  const handleEditPost = () => {
    navigate(`/edit/${post._id}`);
  };

  // ================= DELETE COMMENT =================
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  // ================= TREE =================
  const buildTree = (list = []) => {
    const map = {};
    const roots = [];

    list.forEach((c) => {
      map[c._id] = {...c, replies: []};
    });

    list.forEach((c) => {
      if (c.parentComment && map[c.parentComment]) {
        map[c.parentComment].replies.push(map[c._id]);
      } else {
        roots.push(map[c._id]);
      }
    });

    return roots;
  };

  // ================= COMMENT COMPONENT =================
  const Comment = ({comment}) => {
    const isOwner =
      currentUser?._id?.toString() === comment.user?._id?.toString();

    return (
      <div className="comment-node">
        <div className="comment-card">
          <div className="comment-header">
            <div className="avatar">
              {comment.user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{comment.user?.username}</strong>
              <p className="comment-text">{comment.text}</p>
            </div>
          </div>

          <div className="comment-actions">
            <button
              className="reply-btn"
              onClick={() => setReplyTo(comment._id)}
            >
              <FiMessageCircle />
            </button>

            {isOwner && (
              <button
                className="delete-comment"
                onClick={() => handleDeleteComment(comment._id)}
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        </div>

        {comment.replies?.length > 0 && (
          <div className="comment-replies">
            {comment.replies.map((r) => (
              <Comment key={r._id} comment={r} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <PostDetailsSkeleton />;
  if (!post) return <p>Post not found</p>;

  const isAuthor =
    currentUser?._id?.toString() === post?.author?._id?.toString();

  const tree = buildTree(comments);

  return (
    <section className="post-details">
      <div className="container post-container">
        {/* ================= POST ================= */}
        <article className="post-article">
          <img src={post.coverImage} className="post-cover" />
          <h1>{post.title}</h1>

          <div className="post-meta">
            <span>{post.author?.username}</span>
            <span>{post.category}</span>
          </div>

          <div className="post-content">{post.content}</div>

          {/* ACTIONS */}
          {isAuthor && (
            <div className="post-actions">
              <button onClick={handleEditPost} className="edit-btn">
                Edit Post
              </button>

              <button onClick={handleDeletePost} className="delete-btn">
                Delete Post
              </button>
            </div>
          )}
        </article>

        {/* ================= COMMENTS ================= */}
        <aside className="comments-section">
          {replyTo && (
            <div className="reply-box">
              Replying...
              <button onClick={() => setReplyTo(null)}>✕</button>
            </div>
          )}

          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write comment..."
            />

            <button type="submit">Post</button>
          </form>

          <div className="comments-list">
            {tree.map((c) => (
              <Comment key={c._id} comment={c} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default PostDetails;
