import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { salvarTokens } from '../services/authService';

const SpotifyCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [processado, setProcessado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const processarCallback = async () => {
      try {
        // Extrai os parâmetros da URL
        const erro = searchParams.get('erro');
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const expiresIn = searchParams.get('expires_in');
        
        if (erro) {
          setErro(`Erro na autenticação do Spotify: ${erro}`);
          setProcessado(true);
          return;
        }
        
        if (accessToken && refreshToken && expiresIn) {
          console.log('Tokens recebidos do backend, salvando localmente');
          salvarTokens(accessToken, refreshToken, parseInt(expiresIn, 10));
          setProcessado(true);
        } else {
          setErro('Tokens de autenticação não fornecidos');
          setProcessado(true);
        }
      } catch (erro) {
        console.error('Erro ao processar callback do Spotify:', erro);
        setErro('Ocorreu um erro ao processar a autenticação do Spotify');
        setProcessado(true);
      }
    };

    processarCallback();
  }, [searchParams]);

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro de Autenticação</h1>
          <p className="text-gray-700 mb-6">{erro}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  if (!processado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-700">Processando autenticação do Spotify...</p>
      </div>
    );
  }

  // Redireciona para a página inicial após processar com sucesso
  return <Navigate to="/" replace />;
};

export default SpotifyCallback;
