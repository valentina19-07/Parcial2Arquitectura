import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CrearClienteUseCase } from '../application/use-cases/crear-cliente.use-case';
import { ListarClientesUseCase } from '../application/use-cases/listar-clientes.use-case';
import { ObtenerClienteUseCase } from '../application/use-cases/obtener-cliente.use-case';
import { Cliente } from '../domain/models/cliente.model';
import { ClientesPageComponent } from './clientes-page.component';

describe('ClientesPageComponent', () => {
  let fixture: ComponentFixture<ClientesPageComponent>;
  let component: ClientesPageComponent;
  let listar: jasmine.SpyObj<ListarClientesUseCase>;
  let obtener: jasmine.SpyObj<ObtenerClienteUseCase>;
  let crear: jasmine.SpyObj<CrearClienteUseCase>;
  const item = { id: 1 } as Cliente;

  beforeEach(async () => {
    listar = jasmine.createSpyObj('ListarClientesUseCase', ['execute']);
    obtener = jasmine.createSpyObj('ObtenerClienteUseCase', ['execute']);
    crear = jasmine.createSpyObj('CrearClienteUseCase', ['execute']);
    listar.execute.and.returnValue(of([item]));

    await TestBed.configureTestingModule({
      imports: [ClientesPageComponent],
      providers: [
        { provide: ListarClientesUseCase, useValue: listar },
        { provide: ObtenerClienteUseCase, useValue: obtener },
        { provide: CrearClienteUseCase, useValue: crear },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('carga el listado al iniciar', () => {
    expect(component.clientes).toEqual([item]);
  });

  it('muestra el mensaje del servidor si falla el listado', () => {
    listar.execute.and.returnValue(throwError(() => ({ error: { error: 'falló' } })));
    component.cargar();
    expect(component.error).toBe('falló');
  });

  it('muestra un mensaje por defecto si el error no trae detalle', () => {
    listar.execute.and.returnValue(throwError(() => ({})));
    component.cargar();
    expect(component.error).toBe('No se pudo completar la operación');
  });

  it('no busca si no hay id', () => {
    component.idBusqueda = null;
    component.buscar();
    expect(obtener.execute).not.toHaveBeenCalled();
  });

  it('busca por id y guarda el resultado', () => {
    obtener.execute.and.returnValue(of(item));
    component.idBusqueda = 1;
    component.buscar();
    expect(obtener.execute).toHaveBeenCalledWith(1);
    expect(component.seleccionado).toEqual(item);
    expect(component.error).toBe('');
  });

  it('limpia la selección y muestra error si la búsqueda falla', () => {
    obtener.execute.and.returnValue(throwError(() => ({ error: { error: 'no existe' } })));
    component.seleccionado = item;
    component.idBusqueda = 99;
    component.buscar();
    expect(component.seleccionado).toBeNull();
    expect(component.error).toBe('no existe');
  });

  it('crea, reinicia el formulario y recarga el listado', () => {
    crear.execute.and.returnValue(of(item));
    const datos = component.nuevo;
    component.guardar();
    expect(crear.execute).toHaveBeenCalledWith(datos);
    expect(component.nuevo).not.toBe(datos);
    expect(listar.execute).toHaveBeenCalledTimes(2);
    expect(component.error).toBe('');
  });

  it('muestra error si la creación falla', () => {
    crear.execute.and.returnValue(throwError(() => ({ error: { error: 'inválido' } })));
    component.guardar();
    expect(component.error).toBe('inválido');
  });
});
