import "../../styles/newsletter.css";

function Newsletter() {
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

          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
