import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: 'Welcome to Sefrou' },
    subtitle: { type: String, default: 'The Garden of Morocco' },
    description: { type: String, default: 'Discover the charm of Sefrou, a hidden gem nestled in the Middle Atlas mountains' }
  },
  about: {
    title: { type: String, default: 'About Sefrou' },
    content: { type: String, default: 'Sefrou is a charming Moroccan city located in the Fès-Meknès region.' }
  },
  discover: {
    title: { type: String, default: 'Discover Sefrou' },
    content: { type: String, default: 'From the cascading waterfalls to the ancient medina, Sefrou offers countless attractions.' }
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const SiteContent = mongoose.model('SiteContent', SiteContentSchema);
export default SiteContent;