import { of } from 'rxjs';
import { NuevoCliente, Cliente } from '../../domain/models/cliente.model';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { CrearClienteUseCase } from './crear-cliente.use-case';

describe('CrearClienteUseCase', () => {
  it('envía los datos al repositorio', (done) => {
    const datos = {} as NuevoCliente;
    const creado = { id: 4 } as Cliente;
    const repo = jasmine.createSpyObj<ClienteRepository>('ClienteRepository', ['crear']);
    repo.crear.and.returnValue(of(creado));

    new CrearClienteUseCase(repo).execute(datos).subscribe((res) => {
      expect(res).toEqual(creado);
      expect(repo.crear).toHaveBeenCalledWith(datos);
      done();
    });
  });
});
