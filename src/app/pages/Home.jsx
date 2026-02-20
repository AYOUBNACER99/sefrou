import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';
import architictImg from '../../../architict.png';
import foodImg from '../../../food.png';
import fistivalImg from '../../../fistival.png';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../components/Card';
import { MapPin, Calendar, Camera } from 'lucide-react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

// Import video
import heroVideo from '../../../202602192235.mp4';

export function Home() {
  const navigate = useNavigate();
  const { siteContent, galleryImages } = useApp();

  /* ===================== CTRL MODE ===================== */
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

  /* ===================== Map Polygon ===================== */
  const polygonPositions = [
    [33.84, -4.85],
    [33.84, -4.82],
    [33.82, -4.82],
    [33.82, -4.85]
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`home ${ctrlMode ? 'ctrl-active' : ''}`}>
      {/* ===================== HERO WITH VIDEO BACKGROUND ===================== */}
      <section className="hero">
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-content container">
          <motion.h1 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp} 
            className="hero-title"
          >
            {siteContent.hero.title}
          </motion.h1>
          
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp} 
            className="hero-subtitle"
          >
            {siteContent.hero.subtitle}
          </motion.p>
          
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp} 
            className="hero-description"
          >
            {siteContent.hero.description}
          </motion.p>
          
          <motion.div 
            className="hero-buttons" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp}
          >
            <Button size="large" onClick={() => navigate('/discover')}>Explore Sefrou</Button>
            <Button size="large" variant="outline" onClick={() => navigate('/gallery')}>View Gallery</Button>
          </motion.div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="features container">
        <div className="features-grid">
          <motion.div 
            className="feature-item" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={slideLeft}
          >
            <div className="feature-icon"><MapPin size={32} /></div>
            <h3>Explore Places</h3>
            <p>Discover historic sites, natural wonders, and hidden gems throughout Sefrou</p>
          </motion.div>

          <motion.div 
            className="feature-item" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeIn}
          >
            <div className="feature-icon"><Calendar size={32} /></div>
            <h3>Cultural Events</h3>
            <p>Experience the famous Cherry Festival and other traditional celebrations</p>
          </motion.div>

          <motion.div 
            className="feature-item" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={slideRight}
          >
            <div className="feature-icon"><Camera size={32} /></div>
            <h3>Capture Memories</h3>
            <p>Browse our gallery of stunning photography from around the region</p>
          </motion.div>
        </div>
      </section>

      {/* ===================== MAP ===================== */}
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

      {/* ===================== CATEGORIES ===================== */}
      <section className="section-articles container">
        <div className="section-header">
          <h2 className="section-title">Article Categories</h2>
          <Button variant="outline" onClick={() => navigate('/articles')}>View All</Button>
        </div>
        
        <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {/* FOOD */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp}
          >
            <Card hover>
              <CardImage src={foodImg} alt="Food" />
              <CardContent>
                <CardTitle>Food</CardTitle>
                <CardDescription>Explore all articles under Food.</CardDescription>
                <Button variant="outline" onClick={() => { window.scrollTo(0,0); navigate('/Food'); }}>View Food</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* ARCHITECTURE */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp}
          >
            <Card hover>
              <CardImage src={architictImg} alt="Architecture" />
              <CardContent>
                <CardTitle>Architecture</CardTitle>
                <CardDescription>Explore all articles under Architecture.</CardDescription>
                <Button variant="outline" onClick={() => { window.scrollTo(0,0); navigate('/Places'); }}>View Architecture</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* FESTIVAL */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp}
          >
            <Card hover>
              <CardImage src={fistivalImg} alt="Festival" />
              <CardContent>
                <CardTitle>Festival</CardTitle>
                <CardDescription>Explore all articles under Festival.</CardDescription>
                <Button variant="outline" onClick={() => { window.scrollTo(0,0); navigate('/Festival'); }}>View Festival</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section className="section-gallery bg-cream">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Photo Gallery</h2>
            <Button variant="outline" onClick={() => navigate('/gallery')}>See More</Button>
          </div>
          
          <div className="gallery-grid">
            {galleryImages?.slice(0,6).map(image => (
              <motion.div 
                key={image.id} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once:true, amount:0.3 }} 
                variants={fadeUp} 
                className="gallery-item"
              >
                <img 
                  src={image.url} 
                  alt={image.title} 
                  onError={(e)=> e.target.src='https://via.placeholder.com/300'} 
                />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="cta">
        <div className="container text-center">
          <motion.h2 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once:true, amount:0.3 }} 
            variants={fadeUp}
          >
            Ready to Explore Sefrou?
          </motion.h2>
          
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once:true, amount:0.3 }} 
            variants={fadeUp}
          >
            Start your journey through Morocco's hidden gem today
          </motion.p>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once:true, amount:0.3 }} 
            variants={fadeUp}
          >
            <Button size="large" onClick={() => navigate('/contact')}>Get in Touch</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}