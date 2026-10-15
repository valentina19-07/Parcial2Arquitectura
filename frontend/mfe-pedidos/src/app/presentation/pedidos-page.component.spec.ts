import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CrearPedidoUseCase } from '../application/use-cases/crear-pedido.use-case';
import { ListarPedidosUseCase } from '../application/use-cases/listar-pedidos.use-case';
import { ObtenerPedidoUseCase } from '../application/use-cases/obtener-pedido.use-case';
import { Pedido } from '../domain/models/pedido.model';
import { PedidosPageComponent } from './pedidos-page.component';

describe('PedidosPageComponent', () => {
  let fixture: ComponentFixture<PedidosPageComponent>;
  let component: PedidosPageComponent;
  let listar: jasmine.SpyObj<ListarPedidosUseCase>;
  let obtener: jasmine.SpyObj<ObtenerPedidoUseCase>;
  let crear: jasmine.SpyObj<CrearPedidoUseCase>;
  const item = { id: 1 } as Pedido;

  beforeEach(async () => {
    listar = jasmine.createSpyObj('ListarPedidosUseCase', ['execute']);
    obtener = jasmine.createSpyObj('ObtenerPedidoUseCase', ['execute']);
    crear = jasmine.createSpyObj('CrearPedidoUseCase', ['execute']);
    listar.execute.and.returnValue(of([item]));

    await TestBed.configureTestingModule({
      imports: [PedidosPageComponent],
      providers: [
        { provide: ListarPedidosUseCase, useValue: listar },
        { provide: ObtenerPedidoUseCase, useValue: obtener },
        { provide: CrearPedidoUseCase, useValue: crear },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('carga el listado al iniciar', () => {
    expect(component.pedidos).toEqual([item]);
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
