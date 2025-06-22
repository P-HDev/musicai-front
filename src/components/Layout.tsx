import { type ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">MusicAI</div>
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
