import React from 'react';
import { useAuth } from '../context/AuthContext';
import SpotifyLoginButton from '../components/SpotifyLoginButton';
import UsuarioLogado from '../components/UsuarioLogado';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const { isAuthenticated, user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="home-container loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>MusicAI</h1>
      
      {isAuthenticated ? (
        <div className="user-profile">
          <div className="cabecalho-usuario">
            {user?.profileImage && (
              <img src={user.profileImage} alt="Perfil" className="profile-image" />
            )}
            <UsuarioLogado tamanhoFonte="1.5rem" classeCss="nome-destacado" />
          </div>
          
          <h2>Bem-vindo, {user?.name || 'Usuário'}!</h2>
          <p>Você está <span className="authenticated-badge">conectado</span> com sua conta Spotify.</p>
          
          <div className="opcoes-container">
            <h3>O que você deseja fazer?</h3>
            
            <div className="cards-container">
              <div className="card-opcao">
                <h4>Criar nova playlist</h4>
                <p>Use nossa IA para criar uma playlist personalizada baseada em descrições textuais.</p>
                <Link to="/criar-playlist" className="botao botao-primario">
                  Criar nova playlist
                </Link>
              </div>
              
              <div className="card-opcao">
                <h4>Ver suas playlists</h4>
                <p>Visualize as playlists que você já tem na sua conta Spotify.</p>
                <Link to="/dashboard" className="botao botao-secundario">
                  Ver playlists
                </Link>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="logout-button" onClick={logout}>
              Sair
            </button>
          </div>
        </div>
      ) : (
        <div className="login-section">
          <p>Conecte-se com o Spotify para começar a usar o MusicAI</p>
          <p className="auth-status">Status: <span className="not-authenticated">Não autenticado</span></p>
          <SpotifyLoginButton />
          <p className="info-text">Ao clicar no botão acima, você será redirecionado para a página de autenticação do Spotify.</p>
        </div>
      )}
      
      <style jsx>{`
        .home-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .opcoes-container {
          margin-top: 2rem;
          width: 100%;
        }
        
        .cards-container {
          display: flex;
          gap: 1.5rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        
        .card-opcao {
          flex: 1;
          min-width: 250px;
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .card-opcao:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .card-opcao h4 {
          margin-top: 0;
          color: #1DB954;
        }
        
        .botao {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
        }
        
        .botao-primario {
          background-color: #1DB954;
          color: white;
        }
        
        .botao-primario:hover {
          background-color: #1AA34A;
        }
        
        .botao-secundario {
          background-color: #333;
          color: white;
        }
        
        .botao-secundario:hover {
          background-color: #555;
        }
        
        .cabecalho-usuario {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .authenticated-badge {
          display: inline-block;
          background-color: #1DB954;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
        
        .logout-button {
          margin-top: 2rem;
          background-color: transparent;
          border: 1px solid #e0e0e0;
          color: #666;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .logout-button:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default Home;
