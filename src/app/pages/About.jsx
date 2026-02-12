import React from 'react';
import { useApp } from '../context/AppContext';
import './About.css';

export function About() {
  const { siteContent } = useApp();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="fade-in">{siteContent.about.title}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            {/* Text Column */}
            <div className="about-text fade-in">
              <p>{siteContent.about.content}</p>
              <p>
                Located at the foot of the Middle Atlas Mountains, Sefrou is a gateway to adventure and
                cultural discovery. The city's strategic location has made it a historical crossroads,
                bringing together various cultures and traditions over centuries.
              </p>
              <p>
                Whether you're exploring the labyrinthine streets of the medina, witnessing the spectacular
                Cherry Festival, or hiking to nearby waterfalls, Sefrou offers an authentic Moroccan
                experience away from the tourist crowds.
              </p>
            </div>

            {/* Image Column */}
            <div className="about-image fade-in">
              <img
                src="https://images.unsplash.com/photo-1704738795093-5d8f864f4330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Sefrou Medina"
              />
            </div>
          </div>

          {/* Highlights Section */}
          <div className="about-highlights">
            <div className="highlight-card">
              <h3>Rich History</h3>
              <p>Centuries of cultural heritage preserved in every corner of the city</p>
            </div>
            <div className="highlight-card">
              <h3>Natural Beauty</h3>
              <p>Surrounded by stunning landscapes and scenic waterfalls</p>
            </div>
            <div className="highlight-card">
              <h3>Warm Welcome</h3>
              <p>Experience genuine Moroccan hospitality and traditions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
