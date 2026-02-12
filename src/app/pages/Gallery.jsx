import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';
import './Gallery.css';

export function Gallery() {
  const { galleryImages } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <h1 className="fade-in">Photo Gallery</h1>
          <p className="fade-in">Explore the beauty of Sefrou through our collection</p>
        </div>
      </section>

      <section className="gallery-content container">
        <div className="gallery-masonry">
          {galleryImages.map(image => (
            <div
              key={image.id}
              className="gallery-item-full"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-item-overlay">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            <X size={32} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}