import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';

export function About() {
  const { siteContent } = useApp();

  const images = [
    "112.jpg",
    "food.png",
    "fistival.png",
    "architict.png"
  ];

  const [[index, direction], setIndex] = useState([0, 0]);

  const nextImage = () => {
    setIndex([(index + 1) % images.length, 1]);
  };

  const prevImage = () => {
    setIndex([(index - 1 + images.length) % images.length, -1]);
  };

  const sliderVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.95 })
  };

  // Animation for text and cards
  const fadeSlideUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const fadeSlideIn = (delay = 0) => ({ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay } } });

  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {siteContent.about.title}
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">

            {/* Text Column */}
            <motion.div
              className="about-text"
              variants={fadeSlideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>{siteContent.about.content}</p>
              <p>
                Located at the foot of the Middle Atlas Mountains, Sefrou is a gateway to adventure and
                cultural discovery. The city's strategic location has made it a historical crossroads.
              </p>
              <p>
                Whether you're exploring the medina or hiking nearby waterfalls,
                Sefrou offers an authentic Moroccan experience.
              </p>
            </motion.div>

            {/* Image Column Slider */}
            <motion.div
              className="about-image slider-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button className="arrow left" onClick={prevImage}>←</button>

              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={`Sefrou ${index + 1}`}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
                  className="slider-image"
                  whileHover={{ scale: 1.05 }}
                />
              </AnimatePresence>

              <button className="arrow right" onClick={nextImage}>→</button>
            </motion.div>

          </div>

          {/* Highlights Section */}
          <div className="about-highlights">
            {[
              { title: "Rich History", content: "Centuries of cultural heritage preserved in every corner of the city" },
              { title: "Natural Beauty", content: "Surrounded by stunning landscapes and scenic waterfalls" },
              { title: "Warm Welcome", content: "Experience genuine Moroccan hospitality and traditions" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="highlight-card"
                variants={fadeSlideIn(i * 0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}