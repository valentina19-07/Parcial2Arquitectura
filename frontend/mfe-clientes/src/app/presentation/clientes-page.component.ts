import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearClienteUseCase } from '../application/use-cases/crear-cliente.use-case';
import { ListarClientesUseCase } from '../application/use-cases/listar-clientes.use-case';
import { ObtenerClienteUseCase } from '../application/use-cases/obtener-cliente.use-case';
import { Cliente, NuevoCliente } from '../domain/models/cliente.model';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class='page'>
      <h2>Clientes</h2>
      @if (error) {
        <p class='error'>{{ error }}</p>
      }

      <h3>Crear cliente</h3>
      <form class='form' (ngSubmit)='guardar()'>
        <label>Nombre <input name='nombre' [(ngModel)]='nuevo.nombre' required /></label>
        <label>Email <input name='email' type='email' [(ngModel)]='nuevo.email' required /></label>
        <label>Ciudad <input name='ciudad' [(ngModel)]='nuevo.ciudad' required /></label>
        <button type='submit'>Crear</button>
      </form>

      <h3>Buscar por ID</h3>
      <div class='form'>
        <input type='number' [(ngModel)]='idBusqueda' placeholder='ID' />
        <button type='button' (click)='buscar()'>Buscar</button>
      </div>
      @if (seleccionado) {
        <p class='detalle'>
          #{{ seleccionado.id }} | {{ seleccionado.nombre }} | {{ seleccionado.email }} | {{ seleccionado.ciudad }}
        </p>
      }

      <h3>Listado</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Ciudad</th></tr>
        </thead>
        <tbody>
          @for (c of clientes; track c.id) {
            <tr><td>{{ c.id }}</td><td>{{ c.nombre }}</td><td>{{ c.email }}</td><td>{{ c.ciudad }}</td></tr>
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
export class ClientesPageComponent implements OnInit {
  private readonly listarUseCase = inject(ListarClientesUseCase);
  private readonly obtenerUseCase = inject(ObtenerClienteUseCase);
  private readonly crearUseCase = inject(CrearClienteUseCase);

  clientes: Cliente[] = [];
  seleccionado: Cliente | null = null;
  idBusqueda: number | null = null;
  error = '';
  nuevo: NuevoCliente = { nombre: '', email: '', ciudad: '' };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.listarUseCase.execute().subscribe({
      next: (data) => (this.clientes = data),
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
        this.nuevo = { nombre: '', email: '', ciudad: '' };
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
