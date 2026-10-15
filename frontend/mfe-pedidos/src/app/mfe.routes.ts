import { Routes } from '@angular/router';
import { CrearPedidoUseCase } from './application/use-cases/crear-pedido.use-case';
import { ListarPedidosUseCase } from './application/use-cases/listar-pedidos.use-case';
import { ObtenerPedidoUseCase } from './application/use-cases/obtener-pedido.use-case';
import { PedidoRepository } from './domain/repositories/pedido.repository';
import { HttpPedidoRepository } from './infrastructure/http-pedido.repository';
import { PedidosPageComponent } from './presentation/pedidos-page.component';

export const MFE_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: PedidoRepository, useClass: HttpPedidoRepository },
      ListarPedidosUseCase,
      ObtenerPedidoUseCase,
      CrearPedidoUseCase,
    ],
    children: [{ path: '', component: PedidosPageComponent }],
  },
];
