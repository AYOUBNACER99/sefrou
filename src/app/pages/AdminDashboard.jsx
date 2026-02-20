import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { LogOut, Plus, Edit, Trash2, Image, FileText, Settings, Upload, RefreshCw } from 'lucide-react';
import './AdminDashboard.css';

export function AdminDashboard() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    logout,
    galleryImages,
    articles,
    siteContent,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    addArticle,
    updateArticle,
    deleteArticle,
    updateSiteContent,
    loading,
    error,
    refreshData
  } = useApp();

  const [activeTab, setActiveTab] = useState('gallery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState({ 
    title: '', 
    description: '',
    image: null,
    imagePreview: '' 
  });

  // Article form state
  const [articleForm, setArticleForm] = useState({
    title: '',
    summary: '',
    description: '',
    category: '',
    author: 'Visit Sefrou Team',
    image: null,
    imagePreview: ''
  });

  // Content form state
  const [contentForm, setContentForm] = useState(siteContent);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setContentForm(siteContent);
  }, [siteContent]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // File change handlers
  const handleGalleryFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Image size should be less than 5MB');
        return;
      }

      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryForm({
          ...galleryForm,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArticleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Image size should be less than 5MB');
        return;
      }

      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticleForm({
          ...articleForm,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const openGalleryModal = (image) => {
    if (image) {
      setEditingItem(image);
      setGalleryForm({ 
        title: image.title, 
        description: image.description,
        image: null,
        imagePreview: image.url 
      });
    } else {
      setEditingItem(null);
      setGalleryForm({ 
        title: '', 
        description: '',
        image: null,
        imagePreview: '' 
      });
    }
    setIsModalOpen(true);
  };

  const openArticleModal = (article) => {
    if (article) {
      setEditingItem(article);
      setArticleForm({
        title: article.title,
        summary: article.summary,
        description: article.description,
        category: article.category,
        author: article.author,
        image: null,
        imagePreview: article.image || ''
      });
    } else {
      setEditingItem(null);
      setArticleForm({
        title: '',
        summary: '',
        description: '',
        category: '',
        author: 'Visit Sefrou Team',
        image: null,
        imagePreview: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleGallerySubmit = async () => {
    if (!galleryForm.image && !editingItem) {
      setFormError('Please select an image');
      return;
    }

    if (!galleryForm.title || !galleryForm.description) {
      setFormError('Please fill in all fields');
      return;
    }

    setUploading(true);
    setFormError('');

    try {
      if (editingItem) {
        // For gallery edit, just update locally
        updateGalleryImage(editingItem.id, {
          title: galleryForm.title,
          description: galleryForm.description,
          url: galleryForm.imagePreview
        });
      } else {
        const formData = new FormData();
        formData.append('title', galleryForm.title);
        formData.append('description', galleryForm.description);
        formData.append('image', galleryForm.image);
        
        await addGalleryImage(formData);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      setFormError(error.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleArticleSubmit = async () => {
    if (!articleForm.title || !articleForm.summary || !articleForm.description || 
        !articleForm.category || !articleForm.author) {
      setFormError('Please fill in all fields');
      return;
    }

    setUploading(true);
    setFormError('');

    try {
      const formData = new FormData();
      formData.append('title', articleForm.title);
      formData.append('summary', articleForm.summary);
      formData.append('description', articleForm.description);
      formData.append('category', articleForm.category);
      formData.append('author', articleForm.author);
      formData.append('date', editingItem ? editingItem.date : new Date().toISOString().split('T')[0]);
      
      if (articleForm.image) {
        formData.append('image', articleForm.image);
      }

      if (editingItem) {
        await updateArticle(editingItem.id, formData);
      } else {
        await addArticle(formData);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      setFormError(error.message || 'Error saving article');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
      } catch (error) {
        alert('Error deleting article: ' + error.message);
      }
    }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryImage(id);
      } catch (error) {
        alert('Error deleting image: ' + error.message);
      }
    }
  };

  const handleContentSubmit = () => {
    updateSiteContent(contentForm);
    alert('Content updated successfully!');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h1>Admin Dashboard</h1>
              {error && <span className="error-badge">{error}</span>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" onClick={refreshData}>
                <RefreshCw size={18} /> Refresh
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={18} /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content container">
        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab${activeTab === 'gallery' ? ' active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Image size={20} /> Gallery
          </button>
          <button
            className={`dashboard-tab${activeTab === 'articles' ? ' active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <FileText size={20} /> Articles
          </button>
          <button
            className={`dashboard-tab${activeTab === 'content' ? ' active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <Settings size={20} /> Site Content
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Gallery Images</h2>
              <Button onClick={() => openGalleryModal()}>
                <Plus size={18} /> Add Image
              </Button>
            </div>

            <div className="dashboard-grid">
              {galleryImages.map(image => (
                <div key={image.id} className="dashboard-item">
                  <img src={image.url} alt={image.title} />
                  <div className="dashboard-item-content">
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <div className="dashboard-item-actions">
                      <button onClick={() => openGalleryModal(image)}>
                        <Edit size={16} /> Edit
                      </button>
                      <button onClick={() => handleDeleteGallery(image.id)} className="danger">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Articles</h2>
              <Button onClick={() => openArticleModal()}>
                <Plus size={18} /> Add Article
              </Button>
            </div>

            <div className="dashboard-list">
              {articles.map(article => (
                <div key={article.id} className="dashboard-list-item">
                  <div className="dashboard-list-content">
                    <h3>{article.title}</h3>
                    <p><strong>Category:</strong> {article.category}</p>
                    <p><strong>Summary:</strong> {article.summary}</p>
                    <span className="dashboard-list-meta">
                      {new Date(article.date).toLocaleDateString()} • {article.author}
                    </span>
                  </div>
                  <div className="dashboard-list-actions">
                    <button onClick={() => openArticleModal(article)}>
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDeleteArticle(article.id)} className="danger">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="dashboard-section">
            <h2>Site Content</h2>
            
            <div className="dashboard-form">
              <h3>Hero Section</h3>
              <Input
                label="Title"
                value={contentForm.hero?.title || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  hero: { ...contentForm.hero, title: value }
                })}
              />
              <Input
                label="Subtitle"
                value={contentForm.hero?.subtitle || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  hero: { ...contentForm.hero, subtitle: value }
                })}
              />
              <Input
                label="Description"
                type="textarea"
                value={contentForm.hero?.description || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  hero: { ...contentForm.hero, description: value }
                })}
              />

              <h3>About Section</h3>
              <Input
                label="Title"
                value={contentForm.about?.title || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  about: { ...contentForm.about, title: value }
                })}
              />
              <Input
                label="Content"
                type="textarea"
                value={contentForm.about?.content || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  about: { ...contentForm.about, content: value }
                })}
                rows={6}
              />

              <h3>Discover Section</h3>
              <Input
                label="Title"
                value={contentForm.discover?.title || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  discover: { ...contentForm.discover, title: value }
                })}
              />
              <Input
                label="Content"
                type="textarea"
                value={contentForm.discover?.content || ''}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  discover: { ...contentForm.discover, content: value }
                })}
                rows={6}
              />

              <Button onClick={handleContentSubmit} fullWidth size="large">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {isModalOpen && activeTab === 'gallery' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem ? 'Edit Image' : 'Add Image'}
        >
          <div className="modal-form">
            {formError && <div className="error-message">{formError}</div>}
            
            <div className="form-group">
              <label>Image {!editingItem && '*'}</label>
              <div className="file-input-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryFileChange}
                  className="file-input"
                  id="gallery-image"
                />
                <label htmlFor="gallery-image" className="file-input-label">
                  <Upload size={18} /> Choose Image
                </label>
              </div>
              {galleryForm.imagePreview && (
                <div className="image-preview">
                  <img src={galleryForm.imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <Input
              label="Title"
              value={galleryForm.title}
              onChange={(value) => setGalleryForm({ ...galleryForm, title: value })}
              required
            />
            <Input
              label="Description"
              type="textarea"
              value={galleryForm.description}
              onChange={(value) => setGalleryForm({ ...galleryForm, description: value })}
              required
            />
            <Button 
              onClick={handleGallerySubmit} 
              fullWidth 
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : (editingItem ? 'Update' : 'Add')} Image
            </Button>
          </div>
        </Modal>
      )}

      {/* Article Modal */}
      {isModalOpen && activeTab === 'articles' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem ? 'Edit Article' : 'Add Article'}
        >
          <div className="modal-form2">
            {formError && <div className="error-message">{formError}</div>}
            
            <div className="form-group">
              <label>Image (Optional)</label>
              <div className="file-input-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleArticleFileChange}
                  className="file-input"
                  id="article-image"
                />
                <label htmlFor="article-image" className="file-input-label">
                  <Upload size={18} /> Choose Image
                </label>
              </div>
              {articleForm.imagePreview && (
                <div className="image-preview">
                  <img src={articleForm.imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <Input
              label="Title"
              value={articleForm.title}
              onChange={(value) => setArticleForm({ ...articleForm, title: value })}
              required
            />
            <Input
              label="Summary"
              type="textarea"
              value={articleForm.summary}
              onChange={(value) => setArticleForm({ ...articleForm, summary: value })}
              required
              rows={3}
            />
            <Input
              label="Description"
              type="textarea"
              value={articleForm.description}
              onChange={(value) => setArticleForm({ ...articleForm, description: value })}
              required
              rows={6}
            />
            <Input
              label="Category"
              value={articleForm.category}
              onChange={(value) => setArticleForm({ ...articleForm, category: value })}
              required
            />
            <Input
              label="Author"
              value={articleForm.author}
              onChange={(value) => setArticleForm({ ...articleForm, author: value })}
              required
            />
            <Button 
              onClick={handleArticleSubmit} 
              fullWidth
              disabled={uploading}
            >
              {uploading ? 'Saving...' : (editingItem ? 'Update' : 'Create')} Article
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}