import axios from 'axios';
import { obterAccessToken } from './authService';
import type { DadosMusica } from '../types/DadosMusica';

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

// Gerar playlist com base em uma mensagem
export const gerarPlaylistPorMensagem = async (
  mensagem: string,
  quantidadeMusicas: number = 20
): Promise<DadosMusica[]> => {
  try {
    const token = obterAccessToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    const response = await axios.post(
      `${API_URL}/Spotify/gerar-playlist`,
      { 
        mensagem,
        numeroDeMusicas: quantidadeMusicas
      },
      obterConfiguracaoAutenticada()
    );
    
    return response.data;
  } catch (erro) {
    console.error('Erro ao gerar playlist por mensagem:', erro);
    throw erro;
  }
};

// Criar playlist no Spotify
export const criarPlaylistNoSpotify = async (
  nome: string,
  descricao: string,
  trackIds: string[]
): Promise<void> => {
  try {
    const token = obterAccessToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    await axios.post(
      `${API_URL}/Spotify/gerar-e-salvar-playlist`,
      {
        nomePlaylist: nome,
        descricao,
        trackIds,
        accessToken: token,
      },
      obterConfiguracaoAutenticada()
    );
  } catch (erro) {
    console.error('Erro ao criar playlist no Spotify:', erro);
    throw erro;
  }
};
