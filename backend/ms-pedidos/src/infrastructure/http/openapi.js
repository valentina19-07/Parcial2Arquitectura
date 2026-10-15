const pedido = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    clienteId: { type: 'integer', example: 1 },
    productoId: { type: 'integer', example: 2 },
    cantidad: { type: 'integer', example: 3 },
    estado: { type: 'string', enum: ['PENDIENTE', 'ENVIADO', 'ENTREGADO'] },
  },
};

const pedidoInput = {
  type: 'object',
  required: ['clienteId', 'productoId', 'cantidad'],
  properties: {
    clienteId: { type: 'integer', example: 1 },
    productoId: { type: 'integer', example: 2 },
    cantidad: { type: 'integer', example: 3 },
    estado: { type: 'string', enum: ['PENDIENTE', 'ENVIADO', 'ENTREGADO'] },
  },
};

const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const json = (schema) => ({ 'application/json': { schema } });

module.exports = {
  openapi: '3.0.0',
  info: { title: 'API de Pedidos', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3003' }],
  paths: {
    '/api/pedidos': {
      get: {
        summary: 'Listar pedidos',
        responses: {
          200: { description: 'OK', content: json({ type: 'array', items: ref('Pedido') }) },
        },
      },
      post: {
        summary: 'Crear pedido',
        requestBody: { required: true, content: json(ref('PedidoInput')) },
        responses: {
          201: { description: 'Creado', content: json(ref('Pedido')) },
          400: { description: 'Datos inválidos' },
        },
      },
    },
    '/api/pedidos/{id}': {
      get: {
        summary: 'Obtener pedido por id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: json(ref('Pedido')) },
          404: { description: 'No encontrado' },
        },
      },
    },
  },
  components: { schemas: { Pedido: pedido, PedidoInput: pedidoInput } },
};
