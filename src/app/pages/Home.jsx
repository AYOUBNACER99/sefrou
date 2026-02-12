import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription
} from '../components/Card';
import { MapPin, Calendar, Camera } from 'lucide-react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

export function Home() {
  const { siteContent, articles, galleryImages } = useApp();

  /* =====================
     CTRL MODE (EDIT MODE)
  ====================== */
  const [ctrlMode, setCtrlMode] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Control') setCtrlMode(true);
    };

    const up = (e) => {
      if (e.key === 'Control') setCtrlMode(false);
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  /* ===== Map Polygon ===== */
  const polygonPositions = [
    [33.84, -4.85],
    [33.84, -4.82],
    [33.82, -4.82],
    [33.82, -4.85]
  ];

  return (
    <div className={`home ${ctrlMode ? 'ctrl-active' : ''}`}>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1 className="hero-title fade-in">{siteContent.hero.title}</h1>
          <p className="hero-subtitle fade-in">{siteContent.hero.subtitle}</p>
          <p className="hero-description fade-in">{siteContent.hero.description}</p>
          <div className="hero-buttons fade-in">
            <Link to="/discover">
              <Button size="large">Explore Sefrou</Button>
            </Link>
            <Link to="/gallery">
              <Button size="large" variant="outline">View Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="features-grid">
          <div className="feature-item slide-in-left">
            <div className="feature-icon"><MapPin size={32} /></div>
            <h3>Explore Places</h3>
            <p>Discover historic sites, natural wonders, and hidden gems throughout Sefrou</p>
          </div>
          <div className="feature-item fade-in">
            <div className="feature-icon"><Calendar size={32} /></div>
            <h3>Cultural Events</h3>
            <p>Experience the famous Cherry Festival and other traditional celebrations</p>
          </div>
          <div className="feature-item slide-in-right">
            <div className="feature-icon"><Camera size={32} /></div>
            <h3>Capture Memories</h3>
            <p>Browse our gallery of stunning photography from around the region</p>
          </div>
        </div>
      </section>

      {/* 🗺️ MAP SECTION */}
      <section className="section-map container">
        <h2 className="section-title">
          City Boundary {ctrlMode && '(Ctrl Mode)'}
        </h2>

        <div className={`map-wrapper ${ctrlMode ? 'map-edit' : ''}`}>
          <MapContainer
            center={[33.83, -4.84]}
            zoom={13}
            className="map"
            dragging={!ctrlMode}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polygon
              positions={polygonPositions}
              pathOptions={{ color: ctrlMode ? 'red' : 'blue' }}
            />
          </MapContainer>

          {ctrlMode && <div className="map-hint">Ctrl pressed: Edit mode</div>}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section-articles container">
        <div className="section-header">
          <h2 className="section-title">Latest Articles</h2>
          <Link to="/articles">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="articles-grid">
          {articles.slice(0, 3).map(article => (
            <Card key={article.id} hover>
              <CardImage src={article.image} alt={article.title} />
              <CardContent>
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <span className="article-author">
                    by {article.author}
                  </span>
                </div>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.summary}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-gallery bg-cream">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Photo Gallery</h2>
            <Link to="/gallery">
              <Button variant="outline">See More</Button>
            </Link>
          </div>
          <div className="gallery-grid">
            {galleryImages.slice(0, 6).map(image => (
              <div key={image.id} className="gallery-item">
                <img src={image.url} alt={image.title} />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Explore Sefrou?</h2>
          <p>Start your journey through Morocco's hidden gem today</p>
          <Link to="/contact">
            <Button size="large">Get in Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}