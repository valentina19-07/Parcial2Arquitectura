import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearPedidoUseCase } from '../application/use-cases/crear-pedido.use-case';
import { ListarPedidosUseCase } from '../application/use-cases/listar-pedidos.use-case';
import { ObtenerPedidoUseCase } from '../application/use-cases/obtener-pedido.use-case';
import { NuevoPedido, Pedido } from '../domain/models/pedido.model';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class='page'>
      <h2>Pedidos</h2>
      @if (error) {
        <p class='error'>{{ error }}</p>
      }

      <h3>Crear pedido</h3>
      <form class='form' (ngSubmit)='guardar()'>
        <input name='clienteId' type='number' [(ngModel)]='nuevo.clienteId' placeholder='ID cliente' />
        <input name='productoId' type='number' [(ngModel)]='nuevo.productoId' placeholder='ID producto' />
        <input name='cantidad' type='number' [(ngModel)]='nuevo.cantidad' placeholder='Cantidad' />
        <button type='submit'>Crear</button>
      </form>

      <h3>Buscar por ID</h3>
      <div class='form'>
        <input type='number' [(ngModel)]='idBusqueda' placeholder='ID' />
        <button type='button' (click)='buscar()'>Buscar</button>
      </div>
      @if (seleccionado) {
        <p class='detalle'>
          #{{ seleccionado.id }} | Cliente: {{ seleccionado.clienteId }} | Producto: {{ seleccionado.productoId }} | Cantidad: {{ seleccionado.cantidad }} | {{ seleccionado.estado }}
        </p>
      }

      <h3>Listado</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Estado</th></tr>
        </thead>
        <tbody>
          @for (p of pedidos; track p.id) {
            <tr><td>{{ p.id }}</td><td>{{ p.clienteId }}</td><td>{{ p.productoId }}</td><td>{{ p.cantidad }}</td><td>{{ p.estado }}</td></tr>
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
export class PedidosPageComponent implements OnInit {
  private readonly listarUseCase = inject(ListarPedidosUseCase);
  private readonly obtenerUseCase = inject(ObtenerPedidoUseCase);
  private readonly crearUseCase = inject(CrearPedidoUseCase);

  pedidos: Pedido[] = [];
  seleccionado: Pedido | null = null;
  idBusqueda: number | null = null;
  error = '';
  nuevo: NuevoPedido = { clienteId: 1, productoId: 1, cantidad: 1 };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.listarUseCase.execute().subscribe({
      next: (data) => (this.pedidos = data),
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
        this.nuevo = { clienteId: 1, productoId: 1, cantidad: 1 };
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
