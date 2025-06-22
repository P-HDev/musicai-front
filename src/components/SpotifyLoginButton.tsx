import { useAuth } from '../context/AuthContext';
import { SpotifyLogo } from '../assets/SpotifyLogo';
import './SpotifyLoginButton.css';

const SpotifyLoginButton = () => {
  const { login, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <button className="spotify-button loading" disabled>Carregando...</button>;
  }

  if (isAuthenticated) {
    return null; // Não mostrar botão se já estiver autenticado
  }

  return (
    <button 
      className="spotify-button"
      onClick={login}
      aria-label="Login com Spotify"
    >
      <span className="spotify-logo"><SpotifyLogo /></span>
      <span>Login com Spotify</span>
    </button>
  );
};

export default SpotifyLoginButton;
