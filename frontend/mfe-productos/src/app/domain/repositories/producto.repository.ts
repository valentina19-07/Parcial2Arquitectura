import { Observable } from 'rxjs';
import { NuevoProducto, Producto } from '../models/producto.model';

export abstract class ProductoRepository {
  abstract listar(): Observable<Producto[]>;
  abstract obtenerPorId(id: number): Observable<Producto>;
  abstract crear(data: NuevoProducto): Observable<Producto>;
}
