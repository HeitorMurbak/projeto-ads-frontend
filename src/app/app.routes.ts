import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { CategoriaLista } from './features/categorias/categoria-lista/categoria-lista';
import { PaginaEmBreve } from './shared/pagina-em-breve/pagina-em-breve';

export const routes: Routes =  [
  { path: '', component: MainLayout, children: [
    { path: '', pathMatch: 'full', redirectTo: 'categorias' },
    { path: 'categorias', component: CategoriaLista },
    { path: 'dashboard', component: PaginaEmBreve, data: { titulo: 'Dashboard — Aula 3' } },
    { path: 'lancamentos', component: PaginaEmBreve, data: { titulo: 'Lançamentos — Aula 2' } },
    { path: 'usuarios', component: PaginaEmBreve, data: { titulo: 'Usuários — Aula 3' } }
  ]},
  { path: '**', redirectTo: 'categorias' }
]
