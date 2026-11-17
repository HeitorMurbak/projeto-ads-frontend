export type TipoCategoria = 'RECEITA' | 'DESPESA';

export interface Categoria {
  id: number;
  descricao: string;
  tipo: TipoCategoria;
  ativa: boolean;
}
// Isso faz com que essa categoria abaixo omita o id que será definido no backend
export type CategoriaInput = Omit<Categoria, 'id'>;

