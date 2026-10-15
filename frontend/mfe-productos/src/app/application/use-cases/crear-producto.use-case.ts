import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoProducto, Producto } from '../../domain/models/producto.model';
import { ProductoRepository } from '../../domain/repositories/producto.repository';

@Injectable()
export class CrearProductoUseCase {
  constructor(private readonly repository: ProductoRepository) {}

  execute(data: NuevoProducto): Observable<Producto> {
    return this.repository.crear(data);
  }
}
