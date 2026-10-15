import { of } from 'rxjs';
import { NuevoProducto, Producto } from '../../domain/models/producto.model';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { CrearProductoUseCase } from './crear-producto.use-case';

describe('CrearProductoUseCase', () => {
  it('envía los datos al repositorio', (done) => {
    const datos = {} as NuevoProducto;
    const creado = { id: 4 } as Producto;
    const repo = jasmine.createSpyObj<ProductoRepository>('ProductoRepository', ['crear']);
    repo.crear.and.returnValue(of(creado));

    new CrearProductoUseCase(repo).execute(datos).subscribe((res) => {
      expect(res).toEqual(creado);
      expect(repo.crear).toHaveBeenCalledWith(datos);
      done();
    });
  });
});
