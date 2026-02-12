import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../components/Card';
import './Articles.css';

export function Articles() {
  const { articles } = useApp();

  return (
    <div className="articles-page">
      <section className="articles-hero">
        <div className="container">
          <h1 className="fade-in">Articles & News</h1>
          <p className="fade-in">Discover stories, insights, and updates about Sefrou</p>
        </div>
      </section>

      <section className="articles-content container">
        <div className="articles-grid">
          {articles.map(article => (
            <Card key={article.id} hover>
              <CardImage src={article.image} alt={article.title} />
              <CardContent>
                <div className="article-meta">
                  <span className="article-date">{new Date(article.date).toLocaleDateString()}</span>
                  <span className="article-author">by {article.author}</span>
                </div>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}