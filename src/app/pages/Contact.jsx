import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="fade-in">Contact Us</h1>
          <p className="fade-in">Get in touch with us for any inquiries</p>
        </div>
      </section>

      <section className="contact-content container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Visit Sefrou</h2>
            <p>We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello, feel free to reach out.</p>
            
            <div className="contact-details">
              <div className="contact-detail">
                <MapPin className="contact-icon" />
                <div>
                  <h4>Address</h4>
                  <p>Sefrou, Fès-Meknès<br />Morocco</p>
                </div>
              </div>

              <div className="contact-detail">
                <Phone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>+212 XXX-XXXXXX</p>
                </div>
              </div>

              <div className="contact-detail">
                <Mail className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>info@visitsefrou.ma</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            {submitted && (
              <div className="contact-success">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <Input
                label="Name"
                value={name}
                onChange={setName}
                required
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
                placeholder="your.email@example.com"
              />
              <Input
                label="Message"
                type="textarea"
                value={message}
                onChange={setMessage}
                required
                placeholder="Your message..."
                rows={6}
              />
              <Button type="submit" fullWidth>Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}