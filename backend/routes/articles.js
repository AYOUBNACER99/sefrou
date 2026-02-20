import express from 'express';
import Article from '../models/Article.js';  // Change from Gallery to Article
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      description: article.description,
      category: article.category,
      author: article.author,
      date: article.date,
      image: article.imageBase64 ? 
        `data:${article.imageType};base64,${article.imageBase64}` : ''
    }));
    res.json({ success: true, data: formattedArticles });
  } catch (error) {
    console.error('GET articles error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create article
router.post('/', upload.single('image'), async (req, res) => {
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
        id: newArticle.id,
        title: newArticle.title,
        summary: newArticle.summary,
        description: newArticle.description,
        category: newArticle.category,
        author: newArticle.author,
        date: newArticle.date,
        image: imageBase64 ? `data:${imageType};base64,${imageBase64}` : ''
      },
      message: 'Article created successfully'
    });

  } catch (error) {
    console.error('POST article error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update article
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, description, category, author, date } = req.body;
    const file = req.file;
    
    const article = await Article.findOne({ id });
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    article.title = title || article.title;
    article.summary = summary || article.summary;
    article.description = description || article.description;
    article.category = category || article.category;
    article.author = author || article.author;
    article.date = date || article.date;
    
    if (file) {
      article.imageBase64 = file.buffer.toString('base64');
      article.imageType = file.mimetype;
      article.imageName = file.originalname;
    }

    await article.save();

    res.json({ 
      success: true, 
      data: {
        id: article.id,
        title: article.title,
        summary: article.summary,
        description: article.description,
        category: article.category,
        author: article.author,
        date: article.date,
        image: article.imageBase64 ? 
          `data:${article.imageType};base64,${article.imageBase64}` : ''
      },
      message: 'Article updated successfully'
    });

  } catch (error) {
    console.error('PUT article error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting article with ID:', id);
    
    const result = await Article.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Article not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Article deleted successfully' 
    });
  } catch (error) {
    console.error('DELETE article error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;