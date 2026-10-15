import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NuevoPedido, Pedido } from '../domain/models/pedido.model';
import { PEDIDOS_API_URL } from './api.config';
import { HttpPedidoRepository } from './http-pedido.repository';

describe('HttpPedidoRepository', () => {
  let repo: HttpPedidoRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpPedidoRepository, provideHttpClient(), provideHttpClientTesting()],
    });
    repo = TestBed.inject(HttpPedidoRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('listar hace GET a la URL base', () => {
    let resultado: Pedido[] = [];
    repo.listar().subscribe((r) => (resultado = r));
    const req = http.expectOne(PEDIDOS_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1 }]);
    expect(resultado.length).toBe(1);
  });

  it('obtenerPorId hace GET a la URL con el id', () => {
    let resultado: Pedido | undefined;
    repo.obtenerPorId(5).subscribe((r) => (resultado = r));
    const req = http.expectOne(`${PEDIDOS_API_URL}/5`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 5 });
    expect(resultado?.id).toBe(5);
  });

  it('crear hace POST con el cuerpo', () => {
    const datos = {} as NuevoPedido;
    repo.crear(datos).subscribe();
    const req = http.expectOne(PEDIDOS_API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(datos);
    req.flush({ id: 9 });
  });
});
