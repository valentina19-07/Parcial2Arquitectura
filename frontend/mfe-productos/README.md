# mfe-productos

Microfrontend de productos (Angular 17, standalone) con Clean Architecture. Se integra al host mediante federation.

- Puerto: **4201**
- Consume: **ms-productos** (Node.js) en http://localhost:3001/api/productos
- Expone: `./routes` (`MFE_ROUTES`)

## Ejecución

    npm install
    npm start

## Pruebas y cobertura (>90%)

    ng test --no-watch --code-coverage --browsers=ChromeHeadless

## Capas

| Capa | Carpeta | Contenido |
|---|---|---|
| Dominio | `src/app/domain` | `Producto`, contrato `ProductoRepository` |
| Aplicación | `src/app/application` | 3 casos de uso |
| Infraestructura | `src/app/infrastructure` | `HttpProductoRepository` (HttpClient) |
| Presentación | `src/app/presentation` | `ProductosPageComponent` |
| Composición | `src/app/mfe.routes.ts` | enlaza contrato con implementación |

## Casos de uso

1. `ListarProductosUseCase`: lista todos los productos.
2. `ObtenerProductoUseCase`: obtiene un producto por id.
3. `CrearProductoUseCase`: crea un producto.
