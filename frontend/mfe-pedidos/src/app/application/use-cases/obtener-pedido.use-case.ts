import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../domain/models/pedido.model';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';

@Injectable()
export class ObtenerPedidoUseCase {
  constructor(private readonly repository: PedidoRepository) {}

  execute(id: number): Observable<Pedido> {
    return this.repository.obtenerPorId(id);
  }
}
