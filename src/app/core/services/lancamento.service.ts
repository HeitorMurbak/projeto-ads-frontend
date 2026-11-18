import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LancamentoRequest, LancamentoResponse } from '../../models/lancamento.model';
import { environment } from '../../../environments/environment';
 
@Injectable({ providedIn: 'root' })
export class LancamentoService {
  private readonly baseUrl = `${environment.apiUrl}/usuarios`;
 
  constructor(private http: HttpClient) {}
 
  listar(usuarioId: number): Observable<LancamentoResponse[]> {
    return this.http.get<LancamentoResponse[]>(
      `${this.baseUrl}/${usuarioId}/lancamentos`);
  }
 
  cadastrar(usuarioId: number, dados: LancamentoRequest):
      Observable<LancamentoResponse> {
    return this.http.post<LancamentoResponse>(
      `${this.baseUrl}/${usuarioId}/lancamentos`, dados);
  }
 
  // Disponível somente se o desafio do Back-end foi concluído:
  atualizar(usuarioId: number, id: number, dados: LancamentoRequest):
      Observable<LancamentoResponse> {
    return this.http.put<LancamentoResponse>(
      `${this.baseUrl}/${usuarioId}/lancamentos/${id}`, dados);
  }
}

