export interface PlaylistSpotify {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  totalFaixas: number;
  publica: boolean;
  colaborativa: boolean;
  urlExterna: string;
}

// Exportação padrão para evitar problemas de importação
export default PlaylistSpotify;
