import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './cardeinfo.css'
export default function Info() {
  const { id } = useParams(); // Grabs 'id' from the URL
  const {articles} = useApp()
  const attraction=articles.find(article=>article.id==id)


  return (
    <div className="info-page-wrapper">
  <div className="info-container">
    {/* Left Side: Image */}
    <div className="info-image-box">
      <img src={attraction.image} alt={attraction.title} />
    </div>

    {/* Right Side: Content */}
    <div className="info-content">
      <span className="info-category">{attraction.category}</span>
      <h1 className="info-title">{attraction.title}</h1>
      
      <div className="info-meta">
        <span><strong>By:</strong> {attraction.author}</span>
        <span><strong>Date:</strong> {attraction.date}</span>
      </div>

      <p className="info-description">{attraction.description}</p>
      
      <button className="back-btn" onClick={() => window.history.back()}>
        Back to Attractions
      </button>
    </div>
  </div>
</div>
  );
}