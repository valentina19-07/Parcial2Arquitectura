import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearProductoUseCase } from '../application/use-cases/crear-producto.use-case';
import { ListarProductosUseCase } from '../application/use-cases/listar-productos.use-case';
import { ObtenerProductoUseCase } from '../application/use-cases/obtener-producto.use-case';
import { NuevoProducto, Producto } from '../domain/models/producto.model';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class='page'>
      <h2>Productos</h2>
      @if (error) {
        <p class='error'>{{ error }}</p>
      }

      <h3>Crear producto</h3>
      <form class='form' (ngSubmit)='guardar()'>
        <input name='nombre' [(ngModel)]='nuevo.nombre' placeholder='Nombre' required />
        <input name='precio' type='number' [(ngModel)]='nuevo.precio' placeholder='Precio' />
        <input name='stock' type='number' [(ngModel)]='nuevo.stock' placeholder='Stock' />
        <button type='submit'>Crear</button>
      </form>

      <h3>Buscar por ID</h3>
      <div class='form'>
        <input type='number' [(ngModel)]='idBusqueda' placeholder='ID' />
        <button type='button' (click)='buscar()'>Buscar</button>
      </div>
      @if (seleccionado) {
        <p class='detalle'>
          #{{ seleccionado.id }} | {{ seleccionado.nombre }} | Precio: {{ seleccionado.precio }} | Stock: {{ seleccionado.stock }}
        </p>
      }

      <h3>Listado</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
        </thead>
        <tbody>
          @for (p of productos; track p.id) {
            <tr><td>{{ p.id }}</td><td>{{ p.nombre }}</td><td>{{ p.precio }}</td><td>{{ p.stock }}</td></tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .page { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; font-family: sans-serif; }
    .form { display: flex; gap: .5rem; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: .4rem; text-align: left; }
    .error { color: #b00020; }
  `],
})
export class ProductosPageComponent implements OnInit {
  private readonly listarUseCase = inject(ListarProductosUseCase);
  private readonly obtenerUseCase = inject(ObtenerProductoUseCase);
  private readonly crearUseCase = inject(CrearProductoUseCase);

  productos: Producto[] = [];
  seleccionado: Producto | null = null;
  idBusqueda: number | null = null;
  error = '';
  nuevo: NuevoProducto = { nombre: '', precio: 0, stock: 0 };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.listarUseCase.execute().subscribe({
      next: (data) => (this.productos = data),
      error: (e) => this.mostrarError(e),
    });
  }

  buscar(): void {
    if (this.idBusqueda === null) {
      return;
    }
    this.obtenerUseCase.execute(this.idBusqueda).subscribe({
      next: (data) => {
        this.seleccionado = data;
        this.error = '';
      },
      error: (e) => {
        this.seleccionado = null;
        this.mostrarError(e);
      },
    });
  }

  guardar(): void {
    this.crearUseCase.execute(this.nuevo).subscribe({
      next: () => {
        this.nuevo = { nombre: '', precio: 0, stock: 0 };
        this.error = '';
        this.cargar();
      },
      error: (e) => this.mostrarError(e),
    });
  }

  private mostrarError(e: { error?: { error?: string } }): void {
    this.error = e.error?.error ?? 'No se pudo completar la operación';
  }
}
