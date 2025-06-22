import React from 'react';
import type { PlaylistSpotify } from '../types/PlaylistSpotify';

interface PropsCardPlaylist {
  playlist: PlaylistSpotify;
  onClick?: () => void;
}

const CardPlaylist: React.FC<PropsCardPlaylist> = ({ playlist, onClick }) => {
  return (
    <div 
      className="card-playlist" 
      onClick={onClick}
    >
      <div className="imagem-container">
        {playlist.imagemUrl ? (
          <img 
            src={playlist.imagemUrl} 
            alt={`Capa da playlist ${playlist.nome}`} 
            className="imagem-playlist"
          />
        ) : (
          <div className="imagem-placeholder">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path 
                fill="currentColor" 
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="info-playlist">
        <h3 className="nome-playlist">{playlist.nome}</h3>
        <p className="total-faixas">{playlist.totalFaixas} músicas</p>
        {playlist.descricao && (
          <p className="descricao-playlist">{playlist.descricao}</p>
        )}
      </div>
      
      <style jsx>{`
        .card-playlist {
          display: flex;
          flex-direction: column;
          background-color: #282828;
          border-radius: 8px;
          padding: 16px;
          transition: background-color 0.3s ease;
          cursor: pointer;
          height: 100%;
          color: white;
        }
        
        .card-playlist:hover {
          background-color: #333333;
        }
        
        .imagem-container {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          margin-bottom: 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #121212;
        }
        
        .imagem-playlist {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .imagem-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: #b3b3b3;
        }
        
        .info-playlist {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .nome-playlist {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .total-faixas {
          font-size: 14px;
          color: #b3b3b3;
          margin: 0 0 8px;
        }
        
        .descricao-playlist {
          font-size: 13px;
          color: #b3b3b3;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default CardPlaylist;
