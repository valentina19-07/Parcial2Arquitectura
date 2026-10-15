import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../domain/models/producto.model';
import { ProductoRepository } from '../../domain/repositories/producto.repository';

@Injectable()
export class ListarProductosUseCase {
  constructor(private readonly repository: ProductoRepository) {}

  execute(): Observable<Producto[]> {
    return this.repository.listar();
  }
}
