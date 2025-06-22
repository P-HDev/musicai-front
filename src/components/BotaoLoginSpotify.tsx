import React from 'react';
import { iniciarAutenticacaoSpotify } from '../services/authService';

interface BotaoSpotifyProps {
  className?: string;
  texto?: string;
}

const BotaoLoginSpotify: React.FC<BotaoSpotifyProps> = ({
  className = '',
  texto = 'Entrar com Spotify'
}) => {
  const handleLogin = () => {
    iniciarAutenticacaoSpotify();
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center justify-center bg-[#1DB954] text-white py-2 px-4 rounded-full font-medium hover:bg-[#1AA34A] transition-colors ${className}`}
    >
      {/* Ícone do Spotify */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="24" 
        height="24" 
        className="mr-2"
      >
        <path 
          fill="currentColor" 
          d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm4.586 14.424a.622.622 0 01-.857.207c-2.349-1.435-5.304-1.76-8.785-.964a.622.622 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.622.622 0 01.207.857zm1.223-2.722a.778.778 0 01-1.071.257c-2.689-1.653-6.785-2.131-9.964-1.166a.777.777 0 11-.453-1.487c3.631-1.102 8.147-.568 11.229 1.325a.778.778 0 01.259 1.071zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.932.932 0 11-.542-1.783c3.526-1.072 9.384-.865 13.079 1.324a.932.932 0 01-.919 1.615z"
        />
      </svg>
      {texto}
    </button>
  );
};

export default BotaoLoginSpotify;
