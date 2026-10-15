import { Observable } from 'rxjs';
import { NuevoCliente, Cliente } from '../models/cliente.model';

export abstract class ClienteRepository {
  abstract listar(): Observable<Cliente[]>;
  abstract obtenerPorId(id: number): Observable<Cliente>;
  abstract crear(data: NuevoCliente): Observable<Cliente>;
}
