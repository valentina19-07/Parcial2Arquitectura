# ms-clientes

Microservicio de clientes (Spring Boot 3, Java 17) con Clean Architecture.

- Puerto: **8082**
- Swagger: http://localhost:8082/swagger-ui.html
- Consumido por: `mfe-clientes`

## Ejecución

    mvn spring-boot:run

## Endpoints

| Método | Ruta | Caso de uso |
|---|---|---|
| GET | /api/clientes | ListarClientesUseCase |
| GET | /api/clientes/{id} | ObtenerClienteUseCase |
| POST | /api/clientes | CrearClienteUseCase |

## Capas

- `domain`: entidad `Cliente`, excepción y contrato `ClienteRepository`.
- `application`: casos de uso (Java puro, sin Spring).
- `infrastructure`: repositorio en memoria, controlador REST, CORS y configuración de beans.
