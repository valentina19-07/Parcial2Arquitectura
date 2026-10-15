import { Observable } from 'rxjs';
import { NuevoPedido, Pedido } from '../models/pedido.model';

export abstract class PedidoRepository {
  abstract listar(): Observable<Pedido[]>;
  abstract obtenerPorId(id: number): Observable<Pedido>;
  abstract crear(data: NuevoPedido): Observable<Pedido>;
}
