const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const InMemoryProductoRepository = require('./infrastructure/repositories/InMemoryProductoRepository');
const ListarProductos = require('./application/use-cases/ListarProductos');
const ObtenerProducto = require('./application/use-cases/ObtenerProducto');
const CrearProducto = require('./application/use-cases/CrearProducto');
const ProductoController = require('./infrastructure/http/ProductoController');
const productoRoutes = require('./infrastructure/http/routes');
const openapi = require('./infrastructure/http/openapi');

const repository = new InMemoryProductoRepository();
const controller = new ProductoController({
  listarProductos: new ListarProductos(repository),
  obtenerProducto: new ObtenerProducto(repository),
  crearProducto: new CrearProducto(repository),
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes(controller));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ms-productos en http://localhost:${PORT} | Swagger: http://localhost:${PORT}/api-docs`);
});
