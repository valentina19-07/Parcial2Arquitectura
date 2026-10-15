import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class='navbar'>
      <span class='brand'>Parcial II</span>
      <a routerLink='/productos' routerLinkActive='active'>Productos</a>
      <a routerLink='/clientes' routerLinkActive='active'>Clientes</a>
      <a routerLink='/pedidos' routerLinkActive='active'>Pedidos</a>
    </nav>
    <main><router-outlet /></main>
  `,
  styles: [`
    .navbar { display: flex; gap: 1rem; align-items: center; padding: .8rem 1.2rem; background: #1f2937; font-family: sans-serif; }
    .brand { color: #fff; font-weight: bold; margin-right: 1rem; }
    .navbar a { color: #d1d5db; text-decoration: none; }
    .navbar a.active { color: #fff; border-bottom: 2px solid #60a5fa; }
  `],
})
export class AppComponent {}
