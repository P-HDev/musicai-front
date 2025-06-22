import axios from 'axios';
import { obterAccessToken } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5102';

// Obter configuração com token de autenticação
const obterConfiguracaoAutenticada = () => {
  const token = obterAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Gerar nome para a playlist baseado na descrição do usuário
export const gerarNomePlaylist = async (descricao: string): Promise<string> => {
  try {
    const token = obterAccessToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    const response = await axios.post(
      `${API_URL}/OpenIA/gerar-nome-playlist`,
      { descricao },
      obterConfiguracaoAutenticada()
    );
    
    return response.data.nome;
  } catch (erro) {
    console.error('Erro ao gerar nome da playlist:', erro);
    throw erro;
  }
};
