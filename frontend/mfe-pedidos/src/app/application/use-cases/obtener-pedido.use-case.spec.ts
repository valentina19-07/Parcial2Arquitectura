import { of } from 'rxjs';
import { Pedido } from '../../domain/models/pedido.model';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { ObtenerPedidoUseCase } from './obtener-pedido.use-case';

describe('ObtenerPedidoUseCase', () => {
  it('pide al repositorio el elemento por id', (done) => {
    const item = { id: 7 } as Pedido;
    const repo = jasmine.createSpyObj<PedidoRepository>('PedidoRepository', ['obtenerPorId']);
    repo.obtenerPorId.and.returnValue(of(item));

    new ObtenerPedidoUseCase(repo).execute(7).subscribe((res) => {
      expect(res).toEqual(item);
      expect(repo.obtenerPorId).toHaveBeenCalledWith(7);
      done();
    });
  });
});
