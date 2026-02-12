import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial data
const initialGalleryImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1757163587904-14cdadfda026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwdHJhZGl0aW9uYWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5NTMxMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Traditional Architecture',
    description: 'Beautiful traditional Moroccan architecture in Sefrou'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1659303474811-5b08061ecaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbmF0dXJlJTIwd2F0ZXJmYWxsfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Natural Beauty',
    description: 'Stunning waterfalls near Sefrou'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1704738795093-5d8f864f4330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Sefrou Medina',
    description: 'The historic medina of Sefrou'
  }
];

const initialArticles = [
  {
    id: '1',
    title: 'Cherry Festival 2024',
    summary: 'Experience the annual cherry festival in Sefrou',
    content: 'The Cherry Festival is Sefrou\'s most celebrated annual event, showcasing the region\'s rich agricultural heritage. Every June, the city comes alive with music, dance, and of course, delicious cherries from local orchards.',
    image: 'https://images.unsplash.com/photo-1757163587904-14cdadfda026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwdHJhZGl0aW9uYWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5NTMxMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-01-15',
    author: 'Visit Sefrou Team'
  },
  {
    id: '2',
    title: 'Exploring the Old Medina',
    summary: 'A journey through Sefrou\'s historic heart',
    content: 'The old medina of Sefrou is a labyrinth of narrow streets, traditional houses, and artisan workshops. Walking through its ancient pathways is like stepping back in time, where every corner tells a story of Morocco\'s rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1704738795093-5d8f864f4330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc2OTUzMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-01-10',
    author: 'Visit Sefrou Team'
  }
];

const initialSiteContent = {
  hero: {
    title: 'Welcome to Sefrou',
    subtitle: 'The Garden of Morocco',
    description: 'Discover the charm of Sefrou, a hidden gem nestled in the Middle Atlas mountains'
  },
  about: {
    title: 'About Sefrou',
    content: 'Sefrou is a charming Moroccan city located in the Fès-Meknès region. Known as the "Garden of Morocco" and the "City of Cherries," it offers a perfect blend of natural beauty, rich history, and authentic Moroccan culture. The city is famous for its annual Cherry Festival, historic medina, and stunning waterfalls.'
  },
  discover: {
    title: 'Discover Sefrou',
    content: 'From the cascading waterfalls to the ancient medina, Sefrou offers countless attractions. Explore traditional markets, visit historic monuments, hike through beautiful natural landscapes, and experience genuine Moroccan hospitality.'
  }
};

const AppContext = createContext(undefined);

const ADMIN_PASSWORD = 'sefrou@1900@2024<'; // Simple password for demo

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [articles, setArticles] = useState([]);
  const [siteContent, setSiteContent] = useState(initialSiteContent);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    const savedArticles = localStorage.getItem('articles');
    const savedContent = localStorage.getItem('siteContent');
    const savedAuth = sessionStorage.getItem('isAuthenticated');

    setGalleryImages(savedImages ? JSON.parse(savedImages) : initialGalleryImages);
    setArticles(savedArticles ? JSON.parse(savedArticles) : initialArticles);
    setSiteContent(savedContent ? JSON.parse(savedContent) : initialSiteContent);
    setIsAuthenticated(savedAuth === 'true');
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(siteContent));
  }, [siteContent]);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  const addGalleryImage = (image) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGalleryImages([...galleryImages, newImage]);
  };

  const updateGalleryImage = (id, image) => {
    setGalleryImages(galleryImages.map(img => 
      img.id === id ? { ...img, ...image } : img
    ));
  };

  const deleteGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  const addArticle = (article) => {
    const newArticle = { ...article, id: Date.now().toString() };
    setArticles([newArticle, ...articles]);
  };

  const updateArticle = (id, article) => {
    setArticles(articles.map(art => 
      art.id === id ? { ...art, ...article } : art
    ));
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter(art => art.id !== id));
  };

  const updateSiteContent = (content) => {
    setSiteContent(prev => ({
      ...prev,
      ...content
    }));
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      galleryImages,
      articles,
      siteContent,
      login,
      logout,
      addGalleryImage,
      updateGalleryImage,
      deleteGalleryImage,
      addArticle,
      updateArticle,
      deleteArticle,
      updateSiteContent
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}