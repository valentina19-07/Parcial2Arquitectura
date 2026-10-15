# ms-productos

Microservicio de productos (Node.js + Express) con Clean Architecture.

- Puerto: **3001**
- Swagger: http://localhost:3001/api-docs
- Consumido por: `mfe-productos`

## Ejecución

    npm install
    npm start

## Endpoints

| Método | Ruta | Caso de uso |
|---|---|---|
| GET | /api/productos | ListarProductos |
| GET | /api/productos/:id | ObtenerProducto |
| POST | /api/productos | CrearProducto |

## Capas

- `domain`: entidad `Producto`, errores y contrato `ProductoRepository`.
- `application`: casos de uso (no conocen Express ni la persistencia).
- `infrastructure`: repositorio en memoria, controlador, rutas y OpenAPI.
- `main.js`: composición de dependencias.
