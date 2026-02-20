
import React, { createContext, useContext, useState, useEffect } from 'react';
import { galleryAPI, articlesAPI, contentAPI } from '../services/api';
// Initial data


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
const ADMIN_PASSWORD = 'sefrou@1900@2024<';

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [articles, setArticles] = useState([]);
  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from API on mount
  useEffect(() => {
    loadDataFromAPI();
    
    const savedAuth = sessionStorage.getItem('isAuthenticated');
    setIsAuthenticated(savedAuth === 'true');
  }, []);

  const loadDataFromAPI = async () => {
    try {
      setLoading(true);
      
      // Try to load from API
      const [galleryRes, articlesRes, contentRes] = await Promise.all([
        galleryAPI.getAll().catch(() => null),
        articlesAPI.getAll().catch(() => null),
        contentAPI.get().catch(() => null)
      ]);

      if (galleryRes?.data?.success) {
        setGalleryImages(galleryRes.data.data);
        localStorage.setItem('galleryImages', JSON.stringify(galleryRes.data.data));
      } else {
        // Fallback to localStorage or initial
        const saved = localStorage.getItem('galleryImages');
        setGalleryImages(saved ? JSON.parse(saved) : initialGalleryImages);
      }

      if (articlesRes?.data?.success) {
        setArticles(articlesRes.data.data);
        localStorage.setItem('articles', JSON.stringify(articlesRes.data.data));
      } else {
        const saved = localStorage.getItem('articles');
        setArticles(saved ? JSON.parse(saved) : initialArticles);
      }

      if (contentRes?.data?.success) {
        setSiteContent(contentRes.data.data);
        localStorage.setItem('siteContent', JSON.stringify(contentRes.data.data));
      } else {
        const saved = localStorage.getItem('siteContent');
        setSiteContent(saved ? JSON.parse(saved) : initialSiteContent);
      }

      setError(null);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Cannot connect to server. Using local data.');
      
      // Fallback to localStorage
      const savedImages = localStorage.getItem('galleryImages');
      const savedArticles = localStorage.getItem('articles');
      const savedContent = localStorage.getItem('siteContent');
      
      setGalleryImages(savedImages ? JSON.parse(savedImages) : initialGalleryImages);
      setArticles(savedArticles ? JSON.parse(savedArticles) : initialArticles);
      setSiteContent(savedContent ? JSON.parse(savedContent) : initialSiteContent);
    } finally {
      setLoading(false);
    }
  };

  // Authentication
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

  // Gallery functions
  const addGalleryImage = async (formData) => {
    try {
      const response = await galleryAPI.create(formData);
      if (response.data.success) {
        const updatedImages = [response.data.data, ...galleryImages];
        setGalleryImages(updatedImages);
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
        return response.data.data;
      }
    } catch (error) {
      console.error('Error adding image:', error);
      throw error;
    }
  };

  const updateGalleryImage = (id, image) => {
    // You can implement update if needed
    const updatedImages = galleryImages.map(img => 
      img.id === id ? { ...img, ...image } : img
    );
    setGalleryImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
  };

  const deleteGalleryImage = async (id) => {
    try {
      await galleryAPI.delete(id);
      const updatedImages = galleryImages.filter(img => img.id !== id);
      setGalleryImages(updatedImages);
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

  // Article functions
  const addArticle = async (articleData) => {
    try {
      const formData = new FormData();
      Object.keys(articleData).forEach(key => {
        if (key === 'image' && articleData[key] instanceof File) {
          formData.append('image', articleData[key]);
        } else if (key !== 'image') {
          formData.append(key, articleData[key]);
        }
      });

      const response = await articlesAPI.create(formData);
      if (response.data.success) {
        const updatedArticles = [response.data.data, ...articles];
        setArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        return response.data.data;
      }
    } catch (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  };

  const updateArticle = async (id, articleData) => {
    try {
      const formData = new FormData();
      Object.keys(articleData).forEach(key => {
        if (key === 'image' && articleData[key] instanceof File) {
          formData.append('image', articleData[key]);
        } else if (key !== 'image') {
          formData.append(key, articleData[key]);
        }
      });

      const response = await articlesAPI.update(id, formData);
      if (response.data.success) {
        const updatedArticles = articles.map(article => 
          article.id === id ? response.data.data : article
        );
        setArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        return response.data.data;
      }
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticle = async (id) => {
    try {
      await articlesAPI.delete(id);
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  // Content functions
  const updateSiteContent = async (content) => {
    try {
      const response = await contentAPI.update(content);
      if (response.data.success) {
        setSiteContent(response.data.data);
        localStorage.setItem('siteContent', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      galleryImages,
      articles,
      siteContent,
      loading,
      error,
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