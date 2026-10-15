import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../domain/models/pedido.model';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';

@Injectable()
export class ListarPedidosUseCase {
  constructor(private readonly repository: PedidoRepository) {}

  execute(): Observable<Pedido[]> {
    return this.repository.listar();
  }
}
