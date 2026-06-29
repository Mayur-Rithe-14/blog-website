import {Link, useNavigate} from "react-router-dom";
import {FiSearch, FiMenu, FiX} from "react-icons/fi";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const {user, logout, isAuthenticated} = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // You can implement this route later
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          Blogify
        </Link>

        {/* Right */}
        <div className="nav-right">
          {isAuthenticated ? (
            <>
              {/* SEARCH BAR */}
              <form className="search-box" onSubmit={handleSearch}>
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>

              {/* WRITE */}
              <Link className="write-btn" to="/create">
                Write
              </Link>

              {/* PROFILE */}
              <Link to="/profile">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.username}&background=5B5CEB&color=fff`}
                  alt={user?.username}
                  className="avatar"
                />
              </Link>

              {/* LOGOUT */}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="login-btn" to="/login">
                Login
              </Link>

              <Link className="write-btn" to="/register">
                Register
              </Link>
            </>
          )}

          <button className="mobile-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
