import { of } from 'rxjs';
import { NuevoPedido, Pedido } from '../../domain/models/pedido.model';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { CrearPedidoUseCase } from './crear-pedido.use-case';

describe('CrearPedidoUseCase', () => {
  it('envía los datos al repositorio', (done) => {
    const datos = {} as NuevoPedido;
    const creado = { id: 4 } as Pedido;
    const repo = jasmine.createSpyObj<PedidoRepository>('PedidoRepository', ['crear']);
    repo.crear.and.returnValue(of(creado));

    new CrearPedidoUseCase(repo).execute(datos).subscribe((res) => {
      expect(res).toEqual(creado);
      expect(repo.crear).toHaveBeenCalledWith(datos);
      done();
    });
  });
});
