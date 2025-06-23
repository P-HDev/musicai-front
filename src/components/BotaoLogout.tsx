import React from 'react';
import { useAuth } from '../context/AuthContext';
import './BotaoLogout.css';

interface BotaoLogoutProps {
  className?: string;
}

const BotaoLogout: React.FC<BotaoLogoutProps> = ({ className }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      className={`botao-logout ${className || ''}`}
      onClick={handleLogout}
      title="Sair"
    >
      Sair
    </button>
  );
};

export default BotaoLogout;
