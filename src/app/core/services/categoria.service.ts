import { Injectable } from '@angular/core';
import { Categoria, CategoriaInput, TipoCategoria } from '../../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private categorias: Categoria[] = [
    { id: 1, descricao: 'Salário', tipo: 'RECEITA', ativo: true },
    { id: 2, descricao: 'Alimentação', tipo: 'DESPESA', ativo: true },
    { id: 3, descricao: 'Moradia', tipo: 'DESPESA', ativo: true },
    { id: 4, descricao: 'Freelance', tipo: 'RECEITA', ativo: true },
  ];

  private proximoId = 5;

  listar(): Categoria[] {
    return [...this.categorias];
  }

  cadastrar(dados: CategoriaInput): Categoria | null {
    const descricaoNormalizada = dados.descricao.trim();
    const jaExiste = this.categorias.some(
      categoria => categoria.tipo === dados.tipo && categoria.descricao.toLowerCase() === descricaoNormalizada.toLowerCase()
    );

    if (jaExiste) {
      return null;
    }

    const novaCategoria: Categoria = {
      id: this.proximoId++,
      descricao: descricaoNormalizada,
      tipo: dados.tipo,
      ativo: dados.ativo,
    };

    this.categorias.push(novaCategoria);
    return novaCategoria;
  }

  buscarPorId(id: number): Categoria | undefined {
    return this.categorias.find(categoria => categoria.id === id);
  }

  atualizar(id: number, dados: CategoriaInput): Categoria | null {
    const index = this.categorias.findIndex(categoria => categoria.id === id);

    if (index === -1) {
      return null;
    }

    const descricaoNormalizada = dados.descricao.trim();
    const duplicada = this.categorias.some(
      categoria => categoria.id !== id && categoria.tipo === dados.tipo && categoria.descricao.toLowerCase() === descricaoNormalizada.toLowerCase()
    );

    if (duplicada) {
      return null;
    }

    this.categorias[index] = {
      ...this.categorias[index],
      descricao: descricaoNormalizada,
      tipo: dados.tipo,
      ativo: dados.ativo,
    };

    return this.categorias[index];
  }

  alterarSituacao(id: number): Categoria | null {
    const categoria = this.buscarPorId(id);

    if (!categoria) {
      return null;
    }

    categoria.ativo = !categoria.ativo;
    return categoria;
  }

  filtrarPorTipo(tipo?: TipoCategoria): Categoria[] {
    if (!tipo) {
      return this.listar();
    }

    return this.categorias.filter(categoria => categoria.tipo === tipo);
  }
}
