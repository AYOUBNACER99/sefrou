import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { LogOut, Plus, Edit, Trash2, Image, FileText, Settings } from 'lucide-react';
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
    updateSiteContent
  } = useApp();

  const [activeTab, setActiveTab] = useState('gallery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState({ url: '', title: '', description: '' });

  // Article form state
  const [articleForm, setArticleForm] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
    author: 'Visit Sefrou Team'
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

  const openGalleryModal = (image) => {
    if (image) {
      setEditingItem(image);
      setGalleryForm({ url: image.url, title: image.title, description: image.description });
    } else {
      setEditingItem(null);
      setGalleryForm({ url: '', title: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const openArticleModal = (article) => {
    if (article) {
      setEditingItem(article);
      setArticleForm({
        title: article.title,
        summary: article.summary,
        content: article.content,
        image: article.image,
        author: article.author
      });
    } else {
      setEditingItem(null);
      setArticleForm({
        title: '',
        summary: '',
        content: '',
        image: '',
        author: 'Visit Sefrou Team'
      });
    }
    setIsModalOpen(true);
  };

  const handleGallerySubmit = () => {
    if (editingItem) {
      updateGalleryImage(editingItem.id, galleryForm);
    } else {
      addGalleryImage(galleryForm);
    }
    setIsModalOpen(false);
  };

  const handleArticleSubmit = () => {
    const articleData = {
      ...articleForm,
      date: editingItem ? editingItem.date : new Date().toISOString().split('T')[0]
    };
    if (editingItem) {
      updateArticle(editingItem.id, articleData);
    } else {
      addArticle(articleData);
    }
    setIsModalOpen(false);
  };

  const handleContentSubmit = () => {
    updateSiteContent(contentForm);
    alert('Content updated successfully!');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <h1>Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </Button>
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
                      <button onClick={() => deleteGalleryImage(image.id)} className="danger">
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
                    <p>{article.summary}</p>
                    <span className="dashboard-list-meta">
                      {new Date(article.date).toLocaleDateString()} • {article.author}
                    </span>
                  </div>
                  <div className="dashboard-list-actions">
                    <button onClick={() => openArticleModal(article)}>
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => deleteArticle(article.id)} className="danger">
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
                value={contentForm.hero.title}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  hero: { ...contentForm.hero, title: value }
                })}
              />
              <Input
                label="Subtitle"
                value={contentForm.hero.subtitle}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  hero: { ...contentForm.hero, subtitle: value }
                })}
              />
              <Input
                label="Description"
                type="textarea"
                value={contentForm.hero.description}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  hero: { ...contentForm.hero, description: value }
                })}
              />

              <h3>About Section</h3>
              <Input
                label="Title"
                value={contentForm.about.title}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  about: { ...contentForm.about, title: value }
                })}
              />
              <Input
                label="Content"
                type="textarea"
                value={contentForm.about.content}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  about: { ...contentForm.about, content: value }
                })}
                rows={6}
              />

              <h3>Discover Section</h3>
              <Input
                label="Title"
                value={contentForm.discover.title}
                onChange={(value) => setContentForm({
                  ...contentForm,
                  discover: { ...contentForm.discover, title: value }
                })}
              />
              <Input
                label="Content"
                type="textarea"
                value={contentForm.discover.content}
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
            <Input
              label="Image URL"
              value={galleryForm.url}
              onChange={(value) => setGalleryForm({ ...galleryForm, url: value })}
              placeholder="https://example.com/image.jpg"
              required
            />
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
            <Button onClick={handleGallerySubmit} fullWidth>
              {editingItem ? 'Update' : 'Add'} Image
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
          <div className="modal-form">
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
              label="Content"
              type="textarea"
              value={articleForm.content}
              onChange={(value) => setArticleForm({ ...articleForm, content: value })}
              required
              rows={6}
            />
            <Input
              label="Image URL"
              value={articleForm.image}
              onChange={(value) => setArticleForm({ ...articleForm, image: value })}
              required
            />
            <Input
              label="Author"
              value={articleForm.author}
              onChange={(value) => setArticleForm({ ...articleForm, author: value })}
              required
            />
            <Button onClick={handleArticleSubmit} fullWidth>
              {editingItem ? 'Update' : 'Create'} Article
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}