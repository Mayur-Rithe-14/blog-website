import {Link} from "react-router-dom";
import heroImage from "../../assets/images/hero1.png";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-left">
          <span className="hero-tag">Welcome to Blogify</span>

          <h1>
            Discover.
            <br />
            Read.
            <br />
            Share.
          </h1>

          <p>
            A place where thoughts become stories. Read articles from
            developers, designers and creators around the world.
          </p>

          <Link to="/" className="hero-btn">
            Explore Blogs
          </Link>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
