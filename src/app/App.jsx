import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';

import { Discover } from './pages/Discover';
import { Articles } from './pages/Articles';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import LandmarkCard from './components/cardeinfo';
import '../styles/main.css';

// إما حذف هذا السطر أو تعديله
// import "./styles/main.css"; // ⬅️ حذف أو تعليق
import "../styles/index.css"; // ⬅️ استخدم هذا إذا كان موجوداً

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminLogin />} />
                <Route path="/landmark/:id" element={<LandmarkCard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}