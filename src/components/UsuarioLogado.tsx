import { useAuth } from '../context/AuthContext';

interface PropriedadesUsuarioLogado {
  tamanhoFonte?: string;
  classeCss?: string;
}

const UsuarioLogado = ({ tamanhoFonte = '1rem', classeCss = '' }: PropriedadesUsuarioLogado) => {
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
    </div>
  );
};

export default UsuarioLogado;
