import { Injectable } from '@angular/core';
import {
  Categoria,
  CategoriaInput
} from '../../models/categoria.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly API = `${environment.apiUrl}/categorias`;

  constructor(private http:HttpClient){}

  listar(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API);
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API}/${id}`);
  }

  cadastrar(dados: CategoriaInput): Observable<Categoria> {
    return this.http.post<Categoria>(this.API,dados);
  }

  atualizar(id: number, dados: CategoriaInput): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API}/${id}`,dados);
  }
}
