import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'productos' },
  {
    path: 'productos',
    loadChildren: () => loadRemoteModule('mfeProductos', './routes').then((m) => m.MFE_ROUTES),
  },
  {
    path: 'clientes',
    loadChildren: () => loadRemoteModule('mfeClientes', './routes').then((m) => m.MFE_ROUTES),
  },
  {
    path: 'pedidos',
    loadChildren: () => loadRemoteModule('mfePedidos', './routes').then((m) => m.MFE_ROUTES),
  },
];
