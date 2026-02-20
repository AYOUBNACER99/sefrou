import express from 'express';
import SiteContent from '../models/SiteContent.js';

const router = express.Router();

// Get content
router.get('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
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

// Update content
router.put('/', async (req, res) => {
  try {
    const { hero, about, discover } = req.body;
    
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent();
    }

    if (hero) content.hero = { ...content.hero, ...hero };
    if (about) content.about = { ...content.about, ...about };
    if (discover) content.discover = { ...content.discover, ...discover };
    
    await content.save();

    res.json({ success: true, data: content, message: 'Content updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;