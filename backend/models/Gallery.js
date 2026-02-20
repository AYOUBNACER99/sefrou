import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  imageBase64: { 
    type: String, 
    required: true 
  },
  imageType: { 
    type: String, 
    required: true 
  },
  imageName: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Gallery = mongoose.model('Gallery', GalleryImageSchema);
export default Gallery;