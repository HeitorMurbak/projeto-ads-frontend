import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria, CategoriaInput, TipoCategoria } from '../../../models/categoria.model';

type CategoriaFormulario = FormGroup<{
  descricao: FormControl<string>;
  tipo: FormControl<TipoCategoria>;
  ativo: FormControl<boolean>;
}>;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-categoria-form',
  styleUrl: './categoria-form.css',
  templateUrl: './categoria-form.html',
})
export class CategoriaForm {
  categoria = input<Categoria | null>(null);
  salvo = output<void>();

  formulario: CategoriaFormulario = new FormGroup({
    descricao: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
    }),
    tipo: new FormControl<TipoCategoria>('DESPESA', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ativo: new FormControl(true, {
      nonNullable: true,
    }),
  });

  erro = '';

  constructor(private readonly categoriaService: CategoriaService) {
    effect(() => {
      const categoriaSelecionada = this.categoria();
      this.erro = '';

      this.formulario.reset(
        categoriaSelecionada
          ? {
              descricao: categoriaSelecionada.descricao,
              tipo: categoriaSelecionada.tipo,
              ativo: categoriaSelecionada.ativo,
            }
          : {
              descricao: '',
              tipo: 'DESPESA',
              ativo: true,
            }
      );
    });
  }

  get descricaoControl() {
    return this.formulario.controls.descricao;
  }

  get tipoControl() {
    return this.formulario.controls.tipo;
  }

  get ativoControl() {
    return this.formulario.controls.ativo;
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.erro = 'Preencha corretamente os campos obrigatórios.';
      return;
    }

    const dados: CategoriaInput = this.formulario.getRawValue();
    const categoriaAtual = this.categoria();

    if (categoriaAtual === null) {
      const categoriaCadastrada = this.categoriaService.cadastrar(dados);

      if (!categoriaCadastrada) {
        this.erro = 'Já existe uma categoria com essa descrição para o mesmo tipo.';
        return;
      }
    } else {
      const categoriaAtualizada = this.categoriaService.atualizar(categoriaAtual.id, dados);

      if (!categoriaAtualizada) {
        this.erro = 'Categoria não encontrada para atualização ou já existe uma descrição duplicada.';
        return;
      }
    }

    this.formulario.reset({ descricao: '', tipo: 'DESPESA', ativo: true });
    this.erro = '';
    this.salvo.emit();
  }

  cancelar(): void {
    this.formulario.reset({ descricao: '', tipo: 'DESPESA', ativo: true });
    this.erro = '';
  }
}
