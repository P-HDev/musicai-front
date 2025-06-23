import { type ReactNode } from 'react';
import './Layout.css';
import UsuarioLogado from './UsuarioLogado';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">MusicAI</div>
        {isAuthenticated && (
          <div className="user-area">
            <UsuarioLogado tamanhoFonte="0.9rem" classeCss="header-user" />
          </div>
        )}
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MusicAI. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
