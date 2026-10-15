const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const InMemoryPedidoRepository = require('./infrastructure/repositories/InMemoryPedidoRepository');
const ListarPedidos = require('./application/use-cases/ListarPedidos');
const ObtenerPedido = require('./application/use-cases/ObtenerPedido');
const CrearPedido = require('./application/use-cases/CrearPedido');
const PedidoController = require('./infrastructure/http/PedidoController');
const pedidoRoutes = require('./infrastructure/http/routes');
const openapi = require('./infrastructure/http/openapi');

const repository = new InMemoryPedidoRepository();
const controller = new PedidoController({
  listarPedidos: new ListarPedidos(repository),
  obtenerPedido: new ObtenerPedido(repository),
  crearPedido: new CrearPedido(repository),
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pedidos', pedidoRoutes(controller));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`ms-pedidos en http://localhost:${PORT} | Swagger: http://localhost:${PORT}/api-docs`);
});
