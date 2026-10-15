import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoCliente, Cliente } from '../domain/models/cliente.model';
import { ClienteRepository } from '../domain/repositories/cliente.repository';
import { CLIENTES_API_URL } from './api.config';

@Injectable()
export class HttpClienteRepository extends ClienteRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(CLIENTES_API_URL);
  }

  obtenerPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${CLIENTES_API_URL}/${id}`);
  }

  crear(data: NuevoCliente): Observable<Cliente> {
    return this.http.post<Cliente>(CLIENTES_API_URL, data);
  }
}
