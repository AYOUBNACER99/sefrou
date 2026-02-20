import express from 'express';
import Gallery from '../models/Gallery.js';  // This should import from Gallery.js
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    const formattedImages = images.map(img => ({
      id: img.id,
      title: img.title,
      description: img.description,
      url: `data:${img.imageType};base64,${img.imageBase64}`
    }));
    res.json({ success: true, data: formattedImages });
  } catch (error) {
    console.error('GET gallery error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    const imageBase64 = file.buffer.toString('base64');
    
    const newImage = new Gallery({
      id: Date.now().toString(),
      title,
      description,
      imageBase64,
      imageType: file.mimetype,
      imageName: file.originalname
    });

    await newImage.save();

    res.json({ 
      success: true, 
      data: {
        id: newImage.id,
        title: newImage.title,
        description: newImage.description,
        url: `data:${file.mimetype};base64,${imageBase64}`
      },
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('POST gallery error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Attempting to delete gallery image with ID:', id);
    
    const image = await Gallery.findOne({ id });
    
    if (!image) {
      console.log('Image not found with ID:', id);
      return res.status(404).json({ 
        success: false, 
        error: 'Image not found' 
      });
    }
    
    const result = await Gallery.deleteOne({ id });
    console.log('Delete result:', result);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Image not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Image deleted successfully' 
    });
  } catch (error) {
    console.error('DELETE gallery error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;