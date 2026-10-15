import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../domain/models/producto.model';
import { ProductoRepository } from '../../domain/repositories/producto.repository';

@Injectable()
export class ObtenerProductoUseCase {
  constructor(private readonly repository: ProductoRepository) {}

  execute(id: number): Observable<Producto> {
    return this.repository.obtenerPorId(id);
  }
}
