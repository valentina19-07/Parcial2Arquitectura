import { Routes } from '@angular/router';
import { CrearClienteUseCase } from './application/use-cases/crear-cliente.use-case';
import { ListarClientesUseCase } from './application/use-cases/listar-clientes.use-case';
import { ObtenerClienteUseCase } from './application/use-cases/obtener-cliente.use-case';
import { ClienteRepository } from './domain/repositories/cliente.repository';
import { HttpClienteRepository } from './infrastructure/http-cliente.repository';
import { ClientesPageComponent } from './presentation/clientes-page.component';

export const MFE_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: ClienteRepository, useClass: HttpClienteRepository },
      ListarClientesUseCase,
      ObtenerClienteUseCase,
      CrearClienteUseCase,
    ],
    children: [{ path: '', component: ClientesPageComponent }],
  },
];
