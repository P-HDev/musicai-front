import React from 'react';
import { useAuth } from '../context/AuthContext';
import ListaPlaylists from '../components/ListaPlaylists';
import SpotifyLoginButton from '../components/SpotifyLoginButton';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="carregando-container">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard MusicAI</h1>
        
        {isAuthenticated ? (
          <div className="usuario-info">
            <span className="nome-usuario">{user?.name || 'Usuário'}</span>
            <button className="botao-logout" onClick={logout}>
              Sair
            </button>
          </div>
        ) : (
          <SpotifyLoginButton />
        )}
      </header>

      <main className="conteudo-principal">
        {isAuthenticated ? (
          <>
            <section className="secao-boas-vindas">
              <h2>Olá, {user?.name || 'Usuário'}!</h2>
              <p>Bem-vindo ao seu dashboard MusicAI. Aqui você pode visualizar e gerenciar suas playlists do Spotify.</p>
            </section>
            
            <section className="secao-playlists">
              <ListaPlaylists />
            </section>
          </>
        ) : (
          <div className="mensagem-login">
            <h2>Bem-vindo ao MusicAI</h2>
            <p>Conecte-se com sua conta Spotify para visualizar suas playlists e criar novas playlists personalizadas com IA.</p>
            <div className="botao-login-container">
              <SpotifyLoginButton />
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 30px;
        }
        
        .usuario-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .nome-usuario {
          font-weight: 600;
        }
        
        .botao-logout {
          background-color: transparent;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          padding: 6px 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .botao-logout:hover {
          background-color: #f5f5f5;
        }
        
        .conteudo-principal {
          margin-top: 20px;
        }
        
        .secao-boas-vindas {
          margin-bottom: 40px;
        }
        
        .mensagem-login {
          text-align: center;
          padding: 60px 20px;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        
        .botao-login-container {
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }
        
        .carregando-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70vh;
          text-align: center;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #1DB954;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
