import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoPedido, Pedido } from '../domain/models/pedido.model';
import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { PEDIDOS_API_URL } from './api.config';

@Injectable()
export class HttpPedidoRepository extends PedidoRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(PEDIDOS_API_URL);
  }

  obtenerPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${PEDIDOS_API_URL}/${id}`);
  }

  crear(data: NuevoPedido): Observable<Pedido> {
    return this.http.post<Pedido>(PEDIDOS_API_URL, data);
  }
}
