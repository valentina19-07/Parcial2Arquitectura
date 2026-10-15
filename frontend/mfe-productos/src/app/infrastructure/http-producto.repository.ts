import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoProducto, Producto } from '../domain/models/producto.model';
import { ProductoRepository } from '../domain/repositories/producto.repository';
import { PRODUCTOS_API_URL } from './api.config';

@Injectable()
export class HttpProductoRepository extends ProductoRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(PRODUCTOS_API_URL);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${PRODUCTOS_API_URL}/${id}`);
  }

  crear(data: NuevoProducto): Observable<Producto> {
    return this.http.post<Producto>(PRODUCTOS_API_URL, data);
  }
}
