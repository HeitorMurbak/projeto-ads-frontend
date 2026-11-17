import { Component, OnInit, signal, computed } from '@angular/core';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { Categoria, CategoriaInput } from '../../../models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  imports: [CategoriaForm],
  selector: 'app-categoria-lista',
  styleUrl: './categoria-lista.css',
  templateUrl: './categoria-lista.html',
})
export class CategoriaLista implements OnInit {
  categorias = signal<Categoria[]>([]);
  erro = "";
  carregado = false;
  filtroTipo = signal<'TODOS' | 'RECEITA' | 'DESPESA'>('TODOS');
  categoriaSelecionada: Categoria | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.carregado = true;
    this.erro = "";
    console.log("Estou carregando categorias!!")
    this.categoriaService.listar().subscribe({
      next: dados => {
        this.categorias.set(dados);
        console.log("Carreguei a categoria!");
        console.log(this.categorias());
        this.carregado = false;
      },
      error: erro => {
        this.carregado = false;
        this.erro = "Falha ao carregar categorias";
        console.log(erro);
      }
    })
  }

  editar(categoria: Categoria): void {
    this.categoriaSelecionada = { ...categoria };
  }

  aoSalvar(): void {
    this.categoriaSelecionada = null;
    this.carregarCategorias();
  }

  aoCancelar(): void {
    this.categoriaSelecionada = null;
  }

  alterarSituacao(categoria: Categoria): void {
    const dados: CategoriaInput = {
      descricao: categoria.descricao,
      tipo: categoria.tipo,
      ativa: !categoria.ativa
    }
    this.categoriaService
      .atualizar(categoria.id,dados)
      .subscribe({
        next: ()=>this.carregarCategorias(),
        error: erro => {
          this.erro = 'Não foi possível atualizar a situação,';
          console.error(erro);
        }
      });
  }

  categoriasFiltradas = computed(() => {
    const tipo = this.filtroTipo();

    if (tipo === 'TODOS') {
      return this.categorias();
    }

    return this.categorias().filter(
      categoria => categoria.tipo === tipo
    );
  });
  
  alterarFiltro(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroTipo.set(
      select.value as 'TODOS' | 'RECEITA' | 'DESPESA'
    );
  }

}
