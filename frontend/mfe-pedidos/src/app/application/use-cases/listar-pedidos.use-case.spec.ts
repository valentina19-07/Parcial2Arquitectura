import { of } from 'rxjs';
import { Pedido } from '../../domain/models/pedido.model';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { ListarPedidosUseCase } from './listar-pedidos.use-case';

describe('ListarPedidosUseCase', () => {
  it('devuelve lo que entrega el repositorio', (done) => {
    const item = { id: 1 } as Pedido;
    const repo = jasmine.createSpyObj<PedidoRepository>('PedidoRepository', ['listar']);
    repo.listar.and.returnValue(of([item]));

    new ListarPedidosUseCase(repo).execute().subscribe((res) => {
      expect(res).toEqual([item]);
      expect(repo.listar).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
