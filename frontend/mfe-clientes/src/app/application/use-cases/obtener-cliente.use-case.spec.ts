import { of } from 'rxjs';
import { Cliente } from '../../domain/models/cliente.model';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { ObtenerClienteUseCase } from './obtener-cliente.use-case';

describe('ObtenerClienteUseCase', () => {
  it('pide al repositorio el elemento por id', (done) => {
    const item = { id: 7 } as Cliente;
    const repo = jasmine.createSpyObj<ClienteRepository>('ClienteRepository', ['obtenerPorId']);
    repo.obtenerPorId.and.returnValue(of(item));

    new ObtenerClienteUseCase(repo).execute(7).subscribe((res) => {
      expect(res).toEqual(item);
      expect(repo.obtenerPorId).toHaveBeenCalledWith(7);
      done();
    });
  });
});
