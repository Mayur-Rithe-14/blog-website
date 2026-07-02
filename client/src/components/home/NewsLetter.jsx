import {useState} from "react";
import api from "../../api/axios";
import "../../styles/newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/newsletter", {
        email,
      });

      alert(res.data.message);

      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-box">
          <span className="newsletter-tag">Stay Updated</span>

          <h2>Never Miss a New Article</h2>

          <p>
            Subscribe to receive the latest blogs, tutorials, and web
            development tips directly in your inbox.
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
