import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  imageBase64: { 
    type: String 
  },
  imageType: { 
    type: String 
  },
  imageName: { 
    type: String 
  },
  category: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Article = mongoose.model('Article', ArticleSchema);
export default Article;