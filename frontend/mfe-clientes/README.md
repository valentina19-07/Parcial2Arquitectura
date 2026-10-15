# mfe-clientes

Microfrontend de clientes (Angular 17, standalone) con Clean Architecture. Se integra al host mediante federation.

- Puerto: **4202**
- Consume: **ms-clientes** (Spring Boot) en http://localhost:8082/api/clientes
- Expone: `./routes` (`MFE_ROUTES`)

## Ejecución

    npm install
    npm start

## Pruebas y cobertura (>90%)

    ng test --no-watch --code-coverage --browsers=ChromeHeadless

## Capas

| Capa | Carpeta | Contenido |
|---|---|---|
| Dominio | `src/app/domain` | `Cliente`, contrato `ClienteRepository` |
| Aplicación | `src/app/application` | 3 casos de uso |
| Infraestructura | `src/app/infrastructure` | `HttpClienteRepository` (HttpClient) |
| Presentación | `src/app/presentation` | `ClientesPageComponent` |
| Composición | `src/app/mfe.routes.ts` | enlaza contrato con implementación |

## Casos de uso

1. `ListarClientesUseCase`: lista todos los clientes.
2. `ObtenerClienteUseCase`: obtiene un cliente por id.
3. `CrearClienteUseCase`: crea un cliente.
