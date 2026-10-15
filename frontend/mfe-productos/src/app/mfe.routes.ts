import { Routes } from '@angular/router';
import { CrearProductoUseCase } from './application/use-cases/crear-producto.use-case';
import { ListarProductosUseCase } from './application/use-cases/listar-productos.use-case';
import { ObtenerProductoUseCase } from './application/use-cases/obtener-producto.use-case';
import { ProductoRepository } from './domain/repositories/producto.repository';
import { HttpProductoRepository } from './infrastructure/http-producto.repository';
import { ProductosPageComponent } from './presentation/productos-page.component';

export const MFE_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: ProductoRepository, useClass: HttpProductoRepository },
      ListarProductosUseCase,
      ObtenerProductoUseCase,
      CrearProductoUseCase,
    ],
    children: [{ path: '', component: ProductosPageComponent }],
  },
];
