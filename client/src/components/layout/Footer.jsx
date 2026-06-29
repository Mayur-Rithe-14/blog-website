import {Link} from "react-router-dom";
import {FaGithub, FaLinkedin, FaInstagram, FaTwitter} from "react-icons/fa";

import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-logo">Blogify</h2>

          <p>
            Discover inspiring stories, tutorials and articles from developers
            around the world.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/">Explore</Link>

          <Link to="/create">Write</Link>
        </div>

        <div>
          <h3>Categories</h3>

          <p>Technology</p>

          <p>Programming</p>

          <p>Web Development</p>
        </div>

        <div>
          <h3>Follow Us</h3>

          <div className="socials">
            <FaGithub />

            <FaLinkedin />

            <FaInstagram />

            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="copyright">© 2026 Blogify. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
