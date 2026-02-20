import React from 'react';

import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../components/Card';
import './Discover.css';

export function Discover({content,titre,contents}) {
 

 

  return (
    <div className="discover-page">
      <section className="discover-hero">
        <div className="container">
          <h1 className="fade-in">{titre}</h1>
          <p className="fade-in">{contents}</p>
        </div>
      </section>

      <section className="discover-content container">
        <div className="discover-grid">
          {content.map(attraction => ( 
            <Card info={attraction.id} key={attraction.id} hover>
               {console.log(attraction.id)}
              <CardImage src={attraction.image} alt={attraction.title} />
              <CardContent>
                <span className="attraction-category">{attraction.category}</span>
                <CardTitle>{attraction.title}</CardTitle>
                <CardDescription>{attraction.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}