import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NuevoProducto, Producto } from '../domain/models/producto.model';
import { PRODUCTOS_API_URL } from './api.config';
import { HttpProductoRepository } from './http-producto.repository';

describe('HttpProductoRepository', () => {
  let repo: HttpProductoRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpProductoRepository, provideHttpClient(), provideHttpClientTesting()],
    });
    repo = TestBed.inject(HttpProductoRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('listar hace GET a la URL base', () => {
    let resultado: Producto[] = [];
    repo.listar().subscribe((r) => (resultado = r));
    const req = http.expectOne(PRODUCTOS_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1 }]);
    expect(resultado.length).toBe(1);
  });

  it('obtenerPorId hace GET a la URL con el id', () => {
    let resultado: Producto | undefined;
    repo.obtenerPorId(5).subscribe((r) => (resultado = r));
    const req = http.expectOne(`${PRODUCTOS_API_URL}/5`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 5 });
    expect(resultado?.id).toBe(5);
  });

  it('crear hace POST con el cuerpo', () => {
    const datos = {} as NuevoProducto;
    repo.crear(datos).subscribe();
    const req = http.expectOne(PRODUCTOS_API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(datos);
    req.flush({ id: 9 });
  });
});
