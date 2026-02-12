import React from 'react';
import './Card.css';

export function Card({ children, hover = false, className = '' }) {
  return (
    <div className={`card${hover ? ' card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function CardImage({ src, alt }) {
  return (
    <div className="card-image">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="card-title">{children}</h3>;
}

export function CardDescription({ children }) {
  return <p className="card-description">{children}</p>;
}