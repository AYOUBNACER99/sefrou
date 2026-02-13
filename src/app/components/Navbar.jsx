import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/discover', label: 'Discover' },
    { path: '/articles', label: 'Articles' },
    { path: '/gallery', label: 'Gallery' },
    
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            Visit Sefrou
          </Link>

          <button 
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`navbar-menu${isOpen ? ' navbar-menu-open' : ''}`}>
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar-link${isActive(link.path) ? ' navbar-link-active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                className="navbar-link navbar-admin"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}