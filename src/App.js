import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import { getS3Folders } from './services/s3Service';

function App() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const loadGalleries = async () => {
      try {
        const folders = await getS3Folders();
        setGalleries(folders);
      } catch (error) {
        console.error('Error loading galleries:', error);
      }
    };

    loadGalleries();
  }, []);

  return (
    <Router basename="/bridgette-website">
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Bridgette's Art
            </Link>
            <div className="nav-menu">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <div className="nav-dropdown">
                <span className="nav-link">Galleries</span>
                <div className="dropdown-content">
                  {galleries.map((gallery) => (
                    <Link 
                      key={gallery} 
                      to={`/gallery/${gallery}`} 
                      className="dropdown-link"
                    >
                      {gallery.charAt(0).toUpperCase() + gallery.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home galleries={galleries} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery/:galleryName" element={<Gallery />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Bridgette's Art. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
