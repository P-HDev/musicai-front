import { useAuth } from '../context/AuthContext';
import BotaoLogout from './BotaoLogout';

interface PropriedadesUsuarioLogado {
  tamanhoFonte?: string;
  classeCss?: string;
  mostrarBotaoLogout?: boolean;
}

const UsuarioLogado = ({
  tamanhoFonte = '1rem',
  classeCss = '',
  mostrarBotaoLogout = true
}: PropriedadesUsuarioLogado) => {
  const { user } = useAuth();
  
  const estilos = {
    fontSize: tamanhoFonte,
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`usuario-logado ${classeCss}`} style={estilos}>
      <span className="nome-usuario">{user.name || 'Usuário'}</span>
      {mostrarBotaoLogout && <BotaoLogout className="ml-2" />}
    </div>
  );
};

export default UsuarioLogado;
