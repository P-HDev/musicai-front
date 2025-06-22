import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { tokenEstaValido, obterAccessToken, limparTokens, iniciarAutenticacaoSpotify } from '../services/authService';

interface AuthContextType {
  autenticado: boolean;
  accessToken: string | null;
  carregando: boolean;
  logout: () => void;
  login: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { name?: string; profileImage?: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [user, setUser] = useState<{ name?: string; profileImage?: string } | null>(null);

  useEffect(() => {
    const verificarAutenticacao = () => {
      const token = obterAccessToken();
      const estaAutenticado = tokenEstaValido() && !!token;
      
      setAutenticado(estaAutenticado);
      setAccessToken(token);
      
      // Se estiver autenticado, definimos um usuário fictício para manter compatibilidade
      if (estaAutenticado && !user) {
        setUser({ name: 'Usuário Spotify' });
      } else if (!estaAutenticado && user) {
        setUser(null);
      }
      
      setCarregando(false);
    };

    verificarAutenticacao();

    // Verificar a autenticação periodicamente para atualizar o estado quando o token expirar
    const intervalo = setInterval(verificarAutenticacao, 60000); // A cada minuto
    
    return () => clearInterval(intervalo);
  }, [user]);

  const login = () => {
    console.log('Função login chamada! Iniciando autenticação com Spotify...');
    iniciarAutenticacaoSpotify();
  };

  const logout = () => {
    console.log('Função logout chamada! Limpando tokens...');
    limparTokens();
    setAutenticado(false);
    setAccessToken(null);
    setUser(null);
  };

  // Valores fornecidos pelo contexto, mantendo compatibilidade com a interface antiga e nova
  const contextValue: AuthContextType = {
    autenticado,
    accessToken,
    carregando,
    logout,
    login,
    isAuthenticated: autenticado,
    isLoading: carregando,
    user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
