// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/sefrou_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ========== MongoDB Schemas ==========

// Gallery Image Schema with Base64
const GalleryImageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  imageBase64: { type: String, required: true },
  imageType: String,
  imageName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Article Schema with Base64
const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String, required: true },
  imageBase64: { type: String },
  imageType: String,
  imageName: String,
  category: String,
  author: String,
  date: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Site Content Schema
const SiteContentSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
    description: String
  },
  about: {
    title: String,
    content: String
  },
  discover: {
    title: String,
    content: String
  },
  updatedAt: { type: Date, default: Date.now }
});

// Create Models
const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema);
const Article = mongoose.model('Article', ArticleSchema);
const SiteContent = mongoose.model('SiteContent', SiteContentSchema);

// ========== Configure Multer for memory storage ==========
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ========== API Routes ==========

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ========== Gallery Routes ==========

// Get all gallery images
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    // Convert base64 to data URL for frontend
    const imagesWithUrl = images.map(img => ({
      ...img.toObject(),
      url: `data:${img.imageType};base64,${img.imageBase64}`
    }));
    res.json({ success: true, data: imagesWithUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload gallery image
app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    const imageBase64 = file.buffer.toString('base64');
    const imageType = file.mimetype;
    const imageName = file.originalname;

    const newImage = new GalleryImage({
      id: Date.now().toString(),
      title: title || 'Untitled',
      description: description || '',
      imageBase64,
      imageType,
      imageName
    });

    await newImage.save();

    res.json({ 
      success: true, 
      data: {
        ...newImage.toObject(),
        url: `data:${imageType};base64,${imageBase64}`
      },
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete gallery image
app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await GalleryImage.deleteOne({ id });
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== Article Routes ==========

// Get all articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    // Convert base64 to data URL for frontend
    const articlesWithUrl = articles.map(article => ({
      ...article.toObject(),
      image: article.imageBase64 ? `data:${article.imageType};base64,${article.imageBase64}` : ''
    }));
    res.json({ success: true, data: articlesWithUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create article
app.post('/api/articles', upload.single('image'), async (req, res) => {
  try {
    const { title, summary, description, category, author, date } = req.body;
    const file = req.file;
    
    let imageBase64 = '';
    let imageType = '';
    let imageName = '';
    
    if (file) {
      imageBase64 = file.buffer.toString('base64');
      imageType = file.mimetype;
      imageName = file.originalname;
    }

    const newArticle = new Article({
      id: Date.now().toString(),
      title,
      summary,
      description,
      category,
      author,
      date: date || new Date().toISOString().split('T')[0],
      imageBase64,
      imageType,
      imageName
    });

    await newArticle.save();

    res.json({ 
      success: true, 
      data: {
        ...newArticle.toObject(),
        image: imageBase64 ? `data:${imageType};base64,${imageBase64}` : ''
      },
      message: 'Article created successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update article
app.put('/api/articles/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, description, category, author, date } = req.body;
    const file = req.file;
    
    const article = await Article.findOne({ id });
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    // Update fields
    article.title = title || article.title;
    article.summary = summary || article.summary;
    article.description = description || article.description;
    article.category = category || article.category;
    article.author = author || article.author;
    article.date = date || article.date;
    article.updatedAt = new Date();

    // Update image if new file provided
    if (file) {
      article.imageBase64 = file.buffer.toString('base64');
      article.imageType = file.mimetype;
      article.imageName = file.originalname;
    }

    await article.save();

    res.json({ 
      success: true, 
      data: {
        ...article.toObject(),
        image: article.imageBase64 ? `data:${article.imageType};base64,${article.imageBase64}` : ''
      },
      message: 'Article updated successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete article
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Article.deleteOne({ id });
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== Site Content Routes ==========

// Get site content
app.get('/api/content', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      // Create default content if not exists
      content = new SiteContent({
        hero: {
          title: 'Welcome to Sefrou',
          subtitle: 'The Garden of Morocco',
          description: 'Discover the charm of Sefrou, a hidden gem nestled in the Middle Atlas mountains'
        },
        about: {
          title: 'About Sefrou',
          content: 'Sefrou is a charming Moroccan city located in the Fès-Meknès region.'
        },
        discover: {
          title: 'Discover Sefrou',
          content: 'From the cascading waterfalls to the ancient medina, Sefrou offers countless attractions.'
        }
      });
      await content.save();
    }
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update site content
app.put('/api/content', async (req, res) => {
  try {
    const { hero, about, discover } = req.body;
    
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent();
    }

    if (hero) content.hero = { ...content.hero, ...hero };
    if (about) content.about = { ...content.about, ...about };
    if (discover) content.discover = { ...content.discover, ...discover };
    
    content.updatedAt = new Date();
    await content.save();

    res.json({ success: true, data: content, message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
