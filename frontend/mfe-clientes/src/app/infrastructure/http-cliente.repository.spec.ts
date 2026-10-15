import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NuevoCliente, Cliente } from '../domain/models/cliente.model';
import { CLIENTES_API_URL } from './api.config';
import { HttpClienteRepository } from './http-cliente.repository';

describe('HttpClienteRepository', () => {
  let repo: HttpClienteRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClienteRepository, provideHttpClient(), provideHttpClientTesting()],
    });
    repo = TestBed.inject(HttpClienteRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('listar hace GET a la URL base', () => {
    let resultado: Cliente[] = [];
    repo.listar().subscribe((r) => (resultado = r));
    const req = http.expectOne(CLIENTES_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1 }]);
    expect(resultado.length).toBe(1);
  });

  it('obtenerPorId hace GET a la URL con el id', () => {
    let resultado: Cliente | undefined;
    repo.obtenerPorId(5).subscribe((r) => (resultado = r));
    const req = http.expectOne(`${CLIENTES_API_URL}/5`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 5 });
    expect(resultado?.id).toBe(5);
  });

  it('crear hace POST con el cuerpo', () => {
    const datos = {} as NuevoCliente;
    repo.crear(datos).subscribe();
    const req = http.expectOne(CLIENTES_API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(datos);
    req.flush({ id: 9 });
  });
});
