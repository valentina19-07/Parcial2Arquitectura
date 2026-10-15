# mfe-pedidos

Microfrontend de pedidos (Angular 17, standalone) con Clean Architecture. Se integra al host mediante federation.

- Puerto: **4203**
- Consume: **ms-pedidos** (Node.js) en http://localhost:3003/api/pedidos
- Expone: `./routes` (`MFE_ROUTES`)

## Ejecución

    npm install
    npm start

## Pruebas y cobertura (>90%)

    ng test --no-watch --code-coverage --browsers=ChromeHeadless

## Capas

| Capa | Carpeta | Contenido |
|---|---|---|
| Dominio | `src/app/domain` | `Pedido`, contrato `PedidoRepository` |
| Aplicación | `src/app/application` | 3 casos de uso |
| Infraestructura | `src/app/infrastructure` | `HttpPedidoRepository` (HttpClient) |
| Presentación | `src/app/presentation` | `PedidosPageComponent` |
| Composición | `src/app/mfe.routes.ts` | enlaza contrato con implementación |

## Casos de uso

1. `ListarPedidosUseCase`: lista todos los pedidos.
2. `ObtenerPedidoUseCase`: obtiene un pedido por id.
3. `CrearPedidoUseCase`: crea un pedido.
