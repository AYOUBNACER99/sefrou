import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../components/Card';
import './Discover.css';

export function Discover() {
  const { siteContent } = useApp();

  const attractions = [
    {
      id: 1,
      title: 'Sefrou Waterfalls',
      description: 'Beautiful cascading waterfalls located near the city center',
      image: 'https://images.unsplash.com/photo-1659303474811-5b08061ecaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbmF0dXJlJTIwd2F0ZXJmYWxsfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Nature'
    },
    {
      id: 2,
      title: 'Old Medina',
      description: 'Historic walled city with traditional markets and architecture',
      image: 'https://images.unsplash.com/photo-1704738795093-5d8f864f4330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Culture'
    },
    {
      id: 3,
      title: 'Traditional Souks',
      description: 'Vibrant markets offering local crafts, spices, and goods',
      image: 'https://images.unsplash.com/photo-1757163587904-14cdadfda026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwdHJhZGl0aW9uYWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5NTMxMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Culture'
    },
    {
      id: 4,
      title: 'Cherry Orchards',
      description: 'Vast orchards producing Morocco\'s finest cherries',
      image: 'https://images.unsplash.com/photo-1659303474811-5b08061ecaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbmF0dXJlJTIwd2F0ZXJmYWxsfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Nature'
    },
    {
      id: 5,
      title: 'Bab Merba',
      description: 'Historic gate leading into the old medina',
      image: 'https://images.unsplash.com/photo-1757163587904-14cdadfda026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwdHJhZGl0aW9uYWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5NTMxMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Culture'
    },
    {
      id: 6,
      title: 'Hiking Trails',
      description: 'Scenic mountain trails with breathtaking views',
      image: 'https://images.unsplash.com/photo-1659303474811-5b08061ecaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbmF0dXJlJTIwd2F0ZXJmYWxsfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Nature'
    }
  ];

  return (
    <div className="discover-page">
      <section className="discover-hero">
        <div className="container">
          <h1 className="fade-in">{siteContent.discover.title}</h1>
          <p className="fade-in">{siteContent.discover.content}</p>
        </div>
      </section>

      <section className="discover-content container">
        <div className="discover-grid">
          {attractions.map(attraction => (
            <Card key={attraction.id} hover>
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