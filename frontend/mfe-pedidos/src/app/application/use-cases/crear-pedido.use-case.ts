import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoPedido, Pedido } from '../../domain/models/pedido.model';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';

@Injectable()
export class CrearPedidoUseCase {
  constructor(private readonly repository: PedidoRepository) {}

  execute(data: NuevoPedido): Observable<Pedido> {
    return this.repository.crear(data);
  }
}
