export type TipoCategoria = 'RECEITA' | 'DESPESA';

export interface Categoria {
  id: number;
  descricao: string;
  tipo: TipoCategoria;
  ativo: boolean;
}

export type CategoriaInput = Omit<Categoria, 'id'>;
