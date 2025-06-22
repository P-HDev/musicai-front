import React, { useEffect, useState } from 'react';
import type { PlaylistSpotify } from '../types/PlaylistSpotify';
import CardPlaylist from './CardPlaylist';
import { obterPlaylistsUsuario } from '../services/spotifyService';
import { useAuth } from '../context/AuthContext';

const ListaPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistSpotify[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const buscarPlaylists = async () => {
      if (!isAuthenticated) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);
        
        const playlistsObtidas = await obterPlaylistsUsuario();
        setPlaylists(playlistsObtidas);
      } catch (erro) {
        console.error('Falha ao obter playlists:', erro);
        setErro('Não foi possível carregar suas playlists. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    };

    buscarPlaylists();
  }, [isAuthenticated]);

  const abrirPlaylistNoSpotify = (urlExterna: string) => {
    window.open(urlExterna, '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="mensagem-autenticacao">
        <p>Faça login com o Spotify para ver suas playlists.</p>
      </div>
    );
  }

  if (carregando) {
    return (
      <div className="carregando-container">
        <div className="spinner"></div>
        <p>Carregando suas playlists...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="mensagem-erro">
        <p>{erro}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="sem-playlists">
        <p>Você ainda não tem playlists no Spotify.</p>
      </div>
    );
  }

  return (
    <div className="lista-playlists-container">
      <h2 className="titulo-secao">Suas Playlists</h2>
      
      <div className="grid-playlists">
        {playlists.map(playlist => (
          <div key={playlist.id} className="playlist-item">
            <CardPlaylist 
              playlist={playlist}
              onClick={() => abrirPlaylistNoSpotify(playlist.urlExterna)}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .lista-playlists-container {
          padding: 20px 0;
        }
        
        .titulo-secao {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .grid-playlists {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 24px;
        }
        
        .playlist-item {
          min-width: 0;
        }
        
        .carregando-container, .mensagem-erro, .mensagem-autenticacao, .sem-playlists {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
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
        
        .mensagem-erro button {
          margin-top: 16px;
          background-color: #1DB954;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .mensagem-erro button:hover {
          background-color: #1AA34A;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ListaPlaylists;
