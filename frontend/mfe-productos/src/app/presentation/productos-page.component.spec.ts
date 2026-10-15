import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CrearProductoUseCase } from '../application/use-cases/crear-producto.use-case';
import { ListarProductosUseCase } from '../application/use-cases/listar-productos.use-case';
import { ObtenerProductoUseCase } from '../application/use-cases/obtener-producto.use-case';
import { Producto } from '../domain/models/producto.model';
import { ProductosPageComponent } from './productos-page.component';

describe('ProductosPageComponent', () => {
  let fixture: ComponentFixture<ProductosPageComponent>;
  let component: ProductosPageComponent;
  let listar: jasmine.SpyObj<ListarProductosUseCase>;
  let obtener: jasmine.SpyObj<ObtenerProductoUseCase>;
  let crear: jasmine.SpyObj<CrearProductoUseCase>;
  const item = { id: 1 } as Producto;

  beforeEach(async () => {
    listar = jasmine.createSpyObj('ListarProductosUseCase', ['execute']);
    obtener = jasmine.createSpyObj('ObtenerProductoUseCase', ['execute']);
    crear = jasmine.createSpyObj('CrearProductoUseCase', ['execute']);
    listar.execute.and.returnValue(of([item]));

    await TestBed.configureTestingModule({
      imports: [ProductosPageComponent],
      providers: [
        { provide: ListarProductosUseCase, useValue: listar },
        { provide: ObtenerProductoUseCase, useValue: obtener },
        { provide: CrearProductoUseCase, useValue: crear },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('carga el listado al iniciar', () => {
    expect(component.productos).toEqual([item]);
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
