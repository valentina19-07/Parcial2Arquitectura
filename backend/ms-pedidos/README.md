# ms-pedidos

Microservicio de pedidos (Node.js + Express) con Clean Architecture.

- Puerto: **3003**
- Swagger: http://localhost:3003/api-docs
- Consumido por: `mfe-pedidos`

## Ejecución

    npm install
    npm start

## Endpoints

| Método | Ruta | Caso de uso |
|---|---|---|
| GET | /api/pedidos | ListarPedidos |
| GET | /api/pedidos/:id | ObtenerPedido |
| POST | /api/pedidos | CrearPedido |

## Capas

- `domain`: entidad `Pedido`, errores y contrato `PedidoRepository`.
- `application`: casos de uso.
- `infrastructure`: repositorio en memoria, controlador, rutas y OpenAPI.
- `main.js`: composición de dependencias.
