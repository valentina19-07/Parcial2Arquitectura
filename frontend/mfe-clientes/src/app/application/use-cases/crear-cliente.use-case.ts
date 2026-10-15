import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoCliente, Cliente } from '../../domain/models/cliente.model';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';

@Injectable()
export class CrearClienteUseCase {
  constructor(private readonly repository: ClienteRepository) {}

  execute(data: NuevoCliente): Observable<Cliente> {
    return this.repository.crear(data);
  }
}
