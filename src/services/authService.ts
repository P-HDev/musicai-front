import axios from 'axios';

// URL do seu backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5102';

// Log para verificar a URL da API no carregamento do serviço
console.log('URL da API configurada:', API_URL);

// Obtém URL de autenticação do Spotify do backend
export const getSpotifyAuthUrl = async (): Promise<string> => {
  try {
    console.log(`Fazendo requisição GET para: ${API_URL}/AutenticacaoSpotify/obter-url`);
    const response = await axios.get(`${API_URL}/AutenticacaoSpotify/obter-url`);
    console.log('Resposta da API:', response.data);
    return response.data.urlAutorizacao;
  } catch (error) {
    console.error('Erro ao obter URL de autenticação do Spotify:', error);
    throw error;
  }
};

// Inicia o fluxo de autenticação redirecionando para a página de autorização do Spotify
export const iniciarAutenticacaoSpotify = () => {
  const urlAutorizacao = `${API_URL}/AutenticacaoSpotify/autorizar`;
  console.log('Redirecionando para:', urlAutorizacao);
  
  try {
    window.location.href = urlAutorizacao;
  } catch (erro) {
    console.error('Erro ao redirecionar:', erro);
  }
};

// Armazena os tokens recebidos após autenticação
export const salvarTokens = (accessToken: string, refreshToken: string, expiresIn: number) => {
  const expiryTime = new Date();
  expiryTime.setSeconds(expiryTime.getSeconds() + expiresIn);
  
  localStorage.setItem('spotify_access_token', accessToken);
  localStorage.setItem('spotify_refresh_token', refreshToken);
  localStorage.setItem('spotify_token_expiry', expiryTime.toISOString());
};

// Verifica se o token está válido
export const tokenEstaValido = (): boolean => {
  const expiryStr = localStorage.getItem('spotify_token_expiry');
  if (!expiryStr) return false;
  
  const expiry = new Date(expiryStr);
  const now = new Date();
  // Consideramos o token válido se ainda faltar mais de 5 minutos para expirar
  return now < new Date(expiry.getTime() - 5 * 60 * 1000);
};

// Obtém o token de acesso armazenado
export const obterAccessToken = (): string | null => {
  if (tokenEstaValido()) {
    return localStorage.getItem('spotify_access_token');
  }
  return null;
};

// Limpa os tokens armazenados (logout)
export const limparTokens = () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_token_expiry');
};
