import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import "../styles/auth.css";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/login`, formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2 className="logo">Blogify</h2>
        <h1>Welcome Back 👋</h1>

        <p>Login to continue.</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button>{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p className="bottom-text">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
