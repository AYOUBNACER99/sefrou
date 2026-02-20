import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { useApp } from "./context/AppContext";
import { Discover } from './pages/Discover';
import { Articles } from './pages/Articles';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import Info from './components/cardeinfo';
import '../styles/main.css';

// إما حذف هذا السطر أو تعديله
// import "./styles/main.css"; // ⬅️ حذف أو تعليق
import "../styles/index.css"; // ⬅️ استخدم هذا إذا كان موجوداً

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

function AppContent() {
  const { articles, galleryImages } = useApp();
  const o={
      id: "7",
      title: 'Bab Merba',
      description: 'Historic gate leading into the old medina',
      image: 'https://images.unsplash.com/photo-1757163587904-14cdadfda026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwdHJhZGl0aW9uYWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5NTMxMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Culture',
      date: '2024-01-10',
      author: 'Visit Sefrou Team'
    }
 console.log(articles)
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/gallery" element={<Gallery />} />
           <Route path="/contact" element={<Contact />} />
          <Route path="/discover" element={<Discover titre='aaaa' contents='vvvv' content={[o]} />} />
          <Route path="/Places" element={<Discover titre='aaaa2' contents='vvvv2' content={[o]}/>} />
          <Route path="/Food" element={<Discover titre='aaaa3' contents='vvvv3'  content={[o]}/>} />
          <Route path="/Festival" element={<Discover titre='aaaa4' contents='vvvv4' content={[o]}/>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/Info/:id" element={<Info />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
