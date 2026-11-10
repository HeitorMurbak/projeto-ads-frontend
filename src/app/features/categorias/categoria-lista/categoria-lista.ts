import { Component, computed, signal } from '@angular/core';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { Categoria, TipoCategoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  imports: [CategoriaForm],
  selector: 'app-categoria-lista',
  styleUrl: './categoria-lista.css',
  templateUrl: './categoria-lista.html',
})
export class CategoriaLista {
  private readonly categoriaService = new CategoriaService();
  categoriaSelecionada = signal<Categoria | null>(null);
  filtro = signal<TipoCategoria | 'TODOS'>('TODOS');

  categorias = computed(() => {
    const tipo = this.filtro();
    const lista = this.categoriaService.listar();
    return tipo === 'TODOS' ? lista : lista.filter(categoria => categoria.tipo === tipo);
  });

  atualizarFiltro(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value as TipoCategoria | 'TODOS';
    this.filtro.set(valor);
  }

  editar(categoria: Categoria): void {
    this.categoriaSelecionada.set(categoria);
  }

  aoSalvar(): void {
    this.categoriaSelecionada.set(null);
  }

  alternarSituacao(categoria: Categoria): void {
    const atualizada = this.categoriaService.alterarSituacao(categoria.id);
    if (atualizada) {
      this.categoriaSelecionada.set(null);
    }
  }
}
