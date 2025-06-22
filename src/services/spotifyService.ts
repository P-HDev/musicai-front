import axios from 'axios';
import { obterAccessToken } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5102';

// Função para criar uma configuração com o token de autorização
const obterConfiguracaoAutenticada = () => {
  const token = obterAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Pesquisa músicas no Spotify
export const pesquisarMusicas = async (termoPesquisa: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/Spotify/pesquisar?termo=${encodeURIComponent(termoPesquisa)}`,
      obterConfiguracaoAutenticada()
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao pesquisar músicas no Spotify:', error);
    throw error;
  }
};

// Função para criar uma playlist
export const criarPlaylist = async (nome: string, descricao: string, trackIds: string[]) => {
  try {
    const response = await axios.post(
      `${API_URL}/Spotify/criar-playlist`,
      {
        nome,
        descricao,
        trackIds
      },
      obterConfiguracaoAutenticada()
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao criar playlist no Spotify:', error);
    throw error;
  }
};

// Validar se o token atual é válido
export const validarToken = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/Spotify/validar-token`,
      obterConfiguracaoAutenticada()
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao validar token do Spotify:', error);
    throw error;
  }
};

// Obter playlists do usuário
export const obterPlaylistsUsuario = async () => {
  try {
    const token = obterAccessToken();
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    const response = await axios.get(
      `${API_URL}/Spotify/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (erro) {
    console.error('Erro ao obter playlists do Spotify:', erro);
    throw erro;
  }
};
