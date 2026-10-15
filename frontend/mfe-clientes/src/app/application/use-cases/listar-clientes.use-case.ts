import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../domain/models/cliente.model';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';

@Injectable()
export class ListarClientesUseCase {
  constructor(private readonly repository: ClienteRepository) {}

  execute(): Observable<Cliente[]> {
    return this.repository.listar();
  }
}
