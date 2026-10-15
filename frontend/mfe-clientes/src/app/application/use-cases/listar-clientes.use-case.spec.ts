import { of } from 'rxjs';
import { Cliente } from '../../domain/models/cliente.model';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { ListarClientesUseCase } from './listar-clientes.use-case';

describe('ListarClientesUseCase', () => {
  it('devuelve lo que entrega el repositorio', (done) => {
    const item = { id: 1 } as Cliente;
    const repo = jasmine.createSpyObj<ClienteRepository>('ClienteRepository', ['listar']);
    repo.listar.and.returnValue(of([item]));

    new ListarClientesUseCase(repo).execute().subscribe((res) => {
      expect(res).toEqual([item]);
      expect(repo.listar).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
