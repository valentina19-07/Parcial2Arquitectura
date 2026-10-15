import { of } from 'rxjs';
import { Producto } from '../../domain/models/producto.model';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { ObtenerProductoUseCase } from './obtener-producto.use-case';

describe('ObtenerProductoUseCase', () => {
  it('pide al repositorio el elemento por id', (done) => {
    const item = { id: 7 } as Producto;
    const repo = jasmine.createSpyObj<ProductoRepository>('ProductoRepository', ['obtenerPorId']);
    repo.obtenerPorId.and.returnValue(of(item));

    new ObtenerProductoUseCase(repo).execute(7).subscribe((res) => {
      expect(res).toEqual(item);
      expect(repo.obtenerPorId).toHaveBeenCalledWith(7);
      done();
    });
  });
});
