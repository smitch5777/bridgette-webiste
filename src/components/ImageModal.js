import React, { useEffect } from 'react';
import './ImageModal.css';

const ImageModal = ({ image, metadata, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-image-container">
          <img src={image.url} alt={metadata.title} />
        </div>
        
        <div className="modal-info">
          <h2>{metadata.title}</h2>
          <div className="image-details">
            <p><strong>File:</strong> {metadata.filename}</p>
            <p><strong>Size:</strong> {formatFileSize(image.size)}</p>
            <p><strong>Added:</strong> {formatDate(image.lastModified)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;