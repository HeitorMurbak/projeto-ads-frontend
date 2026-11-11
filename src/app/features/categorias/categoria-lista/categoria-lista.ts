import { Component, OnInit } from '@angular/core';
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
  categorias: Categoria[] = [];
  erro = "";
  carregado = false;

  categoriaSelecionada: Categoria | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.carregado = true;
    this.erro = "";
    this.categoriaService.listar().subscribe({
      next: dados => {
        this.categorias = dados;
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
}