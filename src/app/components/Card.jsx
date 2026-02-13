import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
export function Card({ children, hover = false, className = '' }) {
  const navigate=useNavigate()
  return (
    <div onClick={()=> alert("ok")} className={`card${hover ? ' card-hover' : ''} ${className}`}>
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