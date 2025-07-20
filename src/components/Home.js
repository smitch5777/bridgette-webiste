import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ galleries }) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Bridgette's Art</h1>
          <p>Discover beautiful artwork across various collections</p>
          <Link to="/about" className="cta-button">Learn More About the Artist</Link>
        </div>
      </section>

      <section className="featured-galleries">
        <h2>Art Collections</h2>
        <div className="galleries-grid">
          {galleries.map((gallery) => (
            <Link 
              key={gallery} 
              to={`/gallery/${gallery}`} 
              className="gallery-card"
            >
              <div className="gallery-preview">
                <h3>{gallery.charAt(0).toUpperCase() + gallery.slice(1)}</h3>
                <p>Explore this collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-preview">
        <h2>Get in Touch</h2>
        <p>Interested in commissioning artwork or have questions?</p>
        <Link to="/contact" className="contact-button">Contact Bridgette</Link>
      </section>
    </div>
  );
};

export default Home;