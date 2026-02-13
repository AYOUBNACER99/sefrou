import { useLocation, useParams } from 'react-router-dom';

export default function LandmarkCard() {
  const { state } = useLocation();
  const { id } = useParams();

  if (!state) {
    return <p>Not found</p>;
  }

  return (
    <div className="container">
      <h1>{state.title}</h1>
      <img src={state.image} alt={state.title} style={{ maxWidth: '100%' }} />
      <p>{state.description}</p>
      <span>{state.category}</span>
    </div>
  );
}
