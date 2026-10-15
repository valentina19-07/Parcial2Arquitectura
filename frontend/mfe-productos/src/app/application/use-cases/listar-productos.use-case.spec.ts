import { of } from 'rxjs';
import { Producto } from '../../domain/models/producto.model';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { ListarProductosUseCase } from './listar-productos.use-case';

describe('ListarProductosUseCase', () => {
  it('devuelve lo que entrega el repositorio', (done) => {
    const item = { id: 1 } as Producto;
    const repo = jasmine.createSpyObj<ProductoRepository>('ProductoRepository', ['listar']);
    repo.listar.and.returnValue(of([item]));

    new ListarProductosUseCase(repo).execute().subscribe((res) => {
      expect(res).toEqual([item]);
      expect(repo.listar).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
