import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import galleryRoutes from './routes/gallery.js';
import articleRoutes from './routes/articles.js';
import contentRoutes from './routes/content.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection - REMOVED deprecated options
mongoose.connect('mongodb://localhost:27017/sefrou_db')
.then(() => console.log('✅ MongoDB Connected to database: sefrou_db'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Use routes
app.use('/api/gallery', galleryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});