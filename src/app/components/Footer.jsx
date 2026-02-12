import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Visit Sefrou</h3>
            <p className="footer-description">
              Discover the charm and beauty of Sefrou, the Garden of Morocco.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/discover">Discover</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} />
                <span>Sefrou, Morocco</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+212 XXX-XXXXXX</span>
              </li>
              <li>
                <Mail size={18} />
                <span>info@visitsefrou.ma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Visit Sefrou. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}