import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getS3Images, getImageMetadata } from '../services/s3Service';
import ImageModal from './ImageModal';
import './Gallery.css';

const Gallery = () => {
  const { galleryName } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const imageList = await getS3Images(galleryName);
        setImages(imageList);
        setImagesLoaded({});
      } catch (err) {
        setError('Failed to load images');
        console.error('Error loading images:', err);
      } finally {
        setLoading(false);
      }
    };

    if (galleryName) {
      loadImages();
    }
  }, [galleryName]);

  const handleImageLoad = (imageKey) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageKey]: true
    }));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-error">
        <h2>Error Loading Gallery</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="gallery-empty">
        <h2>{galleryName.charAt(0).toUpperCase() + galleryName.slice(1)}</h2>
        <p>No images found in this gallery.</p>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1>{galleryName.charAt(0).toUpperCase() + galleryName.slice(1)}</h1>
        <p>{images.length} {images.length === 1 ? 'piece' : 'pieces'}</p>
      </div>

      <div className="gallery-grid">
        {images.map((image) => {
          const metadata = getImageMetadata(image.key);
          return (
            <div 
              key={image.key} 
              className="gallery-item"
              onClick={() => handleImageClick(image)}
            >
              <div className="image-container">
                {!imagesLoaded[image.key] && (
                  <div className="image-placeholder">
                    <div className="placeholder-spinner"></div>
                  </div>
                )}
                <img
                  src={image.url}
                  alt={metadata.title}
                  onLoad={() => handleImageLoad(image.key)}
                  style={{
                    display: imagesLoaded[image.key] ? 'block' : 'none'
                  }}
                />
                <div className="image-overlay">
                  <h3>{metadata.title}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={closeModal}
          metadata={getImageMetadata(selectedImage.key)}
        />
      )}
    </div>
  );
};

export default Gallery;