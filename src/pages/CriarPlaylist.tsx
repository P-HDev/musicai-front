import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { gerarPlaylistPorMensagem, criarPlaylistNoSpotify } from '../services/playlistService';
import { gerarNomePlaylist } from '../services/iaService';
import type { DadosMusica } from '../types/DadosMusica';

const CriarPlaylist: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [mensagem, setMensagem] = useState('');
  const [nomePlaylist, setNomePlaylist] = useState('');
  const [quantidadeMusicas, setQuantidadeMusicas] = useState(20);
  const [enviando, setEnviando] = useState(false);
  const [musicas, setMusicas] = useState<DadosMusica[]>([]);
  const [musicasSelecionadas, setMusicasSelecionadas] = useState<DadosMusica[]>([]);
  const [etapa, setEtapa] = useState<'descricao' | 'selecao' | 'conclusao'>('descricao');
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [gerandoNome, setGerandoNome] = useState(false);

  if (isLoading) {
    return (
      <div className="carregando-container">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const manipularEnvioMensagem = async (evento: React.FormEvent) => {
    evento.preventDefault();
    
    if (!mensagem.trim()) {
      setErro('Por favor, descreva como deseja sua playlist.');
      return;
    }

    setEnviando(true);
    setErro(null);
    
    try {
      const musicasGeradas = await gerarPlaylistPorMensagem(mensagem, quantidadeMusicas);
      setMusicas(musicasGeradas);
      setMusicasSelecionadas(musicasGeradas); // Inicialmente todas selecionadas
      setEtapa('selecao');
    } catch (erro) {
      console.error('Erro ao gerar playlist:', erro);
      setErro('Ocorreu um erro ao gerar sua playlist. Por favor, tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const manipularGeracaoNome = async () => {
    if (gerandoNome) return;
    
    setGerandoNome(true);
    try {
      const nomeGerado = await gerarNomePlaylist(mensagem);
      setNomePlaylist(nomeGerado);
    } catch (erro) {
      console.error('Erro ao gerar nome da playlist:', erro);
    } finally {
      setGerandoNome(false);
    }
  };

  const alternarSelecaoMusica = (musica: DadosMusica) => {
    setMusicasSelecionadas(prev => {
      const jaSelecionada = prev.some(m => m.id === musica.id);
      
      if (jaSelecionada) {
        return prev.filter(m => m.id !== musica.id);
      } else {
        return [...prev, musica];
      }
    });
  };

  const musicaEstaSelecionada = (musica: DadosMusica) => {
    return musicasSelecionadas.some(m => m.id === musica.id);
  };

  const criarPlaylist = async () => {
    if (!nomePlaylist) {
      setErro('Por favor, insira um nome para a playlist.');
      return;
    }

    if (musicasSelecionadas.length === 0) {
      setErro('Por favor, selecione pelo menos uma música para a playlist.');
      return;
    }

    setEnviando(true);
    setErro(null);
    
    try {
      await criarPlaylistNoSpotify(
        nomePlaylist, 
        `Playlist criada por MusicAI baseada em: ${mensagem}`, 
        musicasSelecionadas.map(m => m.id)
      );
      
      setSucesso('Playlist criada com sucesso!');
      setEtapa('conclusao');
    } catch (erro) {
      console.error('Erro ao criar playlist:', erro);
      setErro('Ocorreu um erro ao criar sua playlist. Por favor, tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const reiniciarProcesso = () => {
    setEtapa('descricao');
    setMensagem('');
    setNomePlaylist('');
    setQuantidadeMusicas(20);
    setMusicas([]);
    setMusicasSelecionadas([]);
    setSucesso(null);
    setErro(null);
  };

  return (
    <div className="criar-playlist-container">
      <h1>Criar Nova Playlist</h1>

      {/* Etapa 1: Descrição da playlist */}
      {etapa === 'descricao' && (
        <div className="etapa-container">
          <h2>Descreva sua playlist ideal</h2>
          <p>
            Descreva o tipo de playlist que você deseja criar. Você pode mencionar gêneros, 
            artistas, humor, ocasião, ou qualquer outra característica.
          </p>
          
          <form onSubmit={manipularEnvioMensagem} className="formulario-mensagem">
            <div className="campo-grupo">
              <label htmlFor="mensagem">Descrição da playlist:</label>
              <textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Ex: Uma playlist de rock alternativo dos anos 90 para um dia chuvoso"
                rows={4}
                disabled={enviando}
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="quantidade">Quantidade de músicas:</label>
              <input
                type="number"
                id="quantidade"
                value={quantidadeMusicas}
                onChange={(e) => setQuantidadeMusicas(Number(e.target.value))}
                min={5}
                max={50}
                disabled={enviando}
              />
            </div>

            {erro && <div className="mensagem-erro">{erro}</div>}

            <button 
              type="submit" 
              className="botao-enviar" 
              disabled={enviando || !mensagem.trim()}
            >
              {enviando ? 'Gerando músicas...' : 'Gerar Playlist'}
            </button>
          </form>
        </div>
      )}

      {/* Etapa 2: Seleção das músicas */}
      {etapa === 'selecao' && (
        <div className="etapa-container">
          <h2>Selecione as músicas para sua playlist</h2>
          
          <div className="campo-grupo">
            <label htmlFor="nome-playlist">Nome da playlist:</label>
            <div className="input-com-botao">
              <input
                type="text"
                id="nome-playlist"
                value={nomePlaylist}
                onChange={(e) => setNomePlaylist(e.target.value)}
                placeholder="Dê um nome para sua playlist"
                disabled={enviando || gerandoNome}
              />
              <button 
                type="button" 
                onClick={manipularGeracaoNome}
                disabled={enviando || gerandoNome}
                className="botao-gerar-nome"
              >
                {gerandoNome ? 'Gerando...' : 'Gerar nome'}
              </button>
            </div>
          </div>

          <p className="info-selecao">
            Selecione as músicas que você deseja incluir na playlist. 
            Clique em uma música para alternar sua seleção.
          </p>

          <div className="lista-musicas">
            {musicas.map((musica) => (
              <div 
                key={musica.id}
                className={`card-musica ${musicaEstaSelecionada(musica) ? 'selecionada' : ''}`}
                onClick={() => alternarSelecaoMusica(musica)}
              >
                <div className="imagem-musica">
                  {musica.imagemUrl ? (
                    <img src={musica.imagemUrl} alt={`Capa de ${musica.nome}`} />
                  ) : (
                    <div className="placeholder-imagem"></div>
                  )}
                </div>
                <div className="info-musica">
                  <h3>{musica.nome}</h3>
                  <p>{musica.artista}</p>
                </div>
                <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={musicaEstaSelecionada(musica)}
                    onChange={() => {}} // Controlado pelo onClick do card
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            ))}
          </div>

          {erro && <div className="mensagem-erro">{erro}</div>}

          <div className="acoes-selecao">
            <button 
              type="button" 
              onClick={() => setEtapa('descricao')}
              className="botao-secundario"
              disabled={enviando}
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={criarPlaylist}
              className="botao-primario"
              disabled={enviando || musicasSelecionadas.length === 0 || !nomePlaylist}
            >
              {enviando ? 'Criando playlist...' : 'Criar Playlist'}
            </button>
          </div>
        </div>
      )}

      {/* Etapa 3: Conclusão */}
      {etapa === 'conclusao' && (
        <div className="etapa-container etapa-conclusao">
          <div className="icone-sucesso">✓</div>
          <h2>Playlist criada com sucesso!</h2>
          <p>
            Sua playlist "{nomePlaylist}" foi criada no Spotify com {musicasSelecionadas.length} músicas.
          </p>
          
          <div className="acoes-conclusao">
            <button 
              type="button" 
              onClick={reiniciarProcesso}
              className="botao-secundario"
            >
              Criar outra playlist
            </button>
            <a 
              href="/dashboard" 
              className="botao-primario link-botao"
            >
              Ver minhas playlists
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .criar-playlist-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
        }

        .etapa-container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .formulario-mensagem {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .campo-grupo {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .campo-grupo label {
          font-weight: 600;
        }

        textarea, input[type="text"], input[type="number"] {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
        }

        .input-com-botao {
          display: flex;
          gap: 0.5rem;
        }

        .input-com-botao input {
          flex: 1;
        }

        .botao-gerar-nome {
          white-space: nowrap;
          background-color: #1DB954;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0 1rem;
          cursor: pointer;
          font-weight: 600;
        }

        .botao-gerar-nome:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .info-selecao {
          margin-bottom: 1.5rem;
          color: #666;
        }

        .lista-musicas {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
          padding-right: 0.5rem;
        }

        .card-musica {
          display: flex;
          align-items: center;
          background-color: white;
          border-radius: 6px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #eee;
        }

        .card-musica:hover {
          background-color: #f0f0f0;
        }

        .card-musica.selecionada {
          background-color: #e8f7ee;
          border-color: #1DB954;
        }

        .imagem-musica {
          width: 50px;
          height: 50px;
          border-radius: 4px;
          overflow: hidden;
        }

        .imagem-musica img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-imagem {
          width: 100%;
          height: 100%;
          background-color: #eee;
        }

        .info-musica {
          flex: 1;
          margin-left: 1rem;
        }

        .info-musica h3 {
          margin: 0;
          font-size: 1rem;
        }

        .info-musica p {
          margin: 0.25rem 0 0;
          font-size: 0.875rem;
          color: #666;
        }

        .checkbox-container {
          margin-left: 1rem;
        }

        .mensagem-erro {
          color: #e53935;
          margin-bottom: 1rem;
        }

        .acoes-selecao, .acoes-conclusao {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .botao-primario, .botao-secundario, .botao-enviar {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .botao-primario, .botao-enviar {
          background-color: #1DB954;
          color: white;
        }

        .botao-primario:hover, .botao-enviar:hover {
          background-color: #1AA34A;
        }

        .botao-primario:disabled, .botao-enviar:disabled, .botao-secundario:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .botao-secundario {
          background-color: #eee;
          color: #333;
        }

        .botao-secundario:hover {
          background-color: #ddd;
        }

        .link-botao {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .etapa-conclusao {
          text-align: center;
        }

        .icone-sucesso {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #1DB954;
          color: white;
          font-size: 2.5rem;
          margin: 0 auto 1.5rem;
        }

        .carregando-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70vh;
          text-align: center;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #1DB954;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CriarPlaylist;
