const producto = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    nombre: { type: 'string', example: 'Laptop' },
    precio: { type: 'number', example: 3200000 },
    stock: { type: 'integer', example: 10 },
  },
};

const productoInput = {
  type: 'object',
  required: ['nombre', 'precio', 'stock'],
  properties: {
    nombre: { type: 'string', example: 'Monitor' },
    precio: { type: 'number', example: 900000 },
    stock: { type: 'integer', example: 5 },
  },
};

const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const json = (schema) => ({ 'application/json': { schema } });

module.exports = {
  openapi: '3.0.0',
  info: { title: 'API de Productos', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3001' }],
  paths: {
    '/api/productos': {
      get: {
        summary: 'Listar productos',
        responses: {
          200: { description: 'OK', content: json({ type: 'array', items: ref('Producto') }) },
        },
      },
      post: {
        summary: 'Crear producto',
        requestBody: { required: true, content: json(ref('ProductoInput')) },
        responses: {
          201: { description: 'Creado', content: json(ref('Producto')) },
          400: { description: 'Datos inválidos' },
        },
      },
    },
    '/api/productos/{id}': {
      get: {
        summary: 'Obtener producto por id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: json(ref('Producto')) },
          404: { description: 'No encontrado' },
        },
      },
    },
  },
  components: { schemas: { Producto: producto, ProductoInput: productoInput } },
};
