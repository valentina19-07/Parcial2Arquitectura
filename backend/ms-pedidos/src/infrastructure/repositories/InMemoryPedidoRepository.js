const PedidoRepository = require('../../domain/repositories/PedidoRepository');
const Pedido = require('../../domain/entities/Pedido');

class InMemoryPedidoRepository extends PedidoRepository {
  constructor() {
    super();
    this.items = [
      new Pedido({ id: 1, clienteId: 1, productoId: 1, cantidad: 2, estado: 'PENDIENTE' }),
      new Pedido({ id: 2, clienteId: 2, productoId: 3, cantidad: 1, estado: 'ENVIADO' }),
      new Pedido({ id: 3, clienteId: 3, productoId: 2, cantidad: 5, estado: 'ENTREGADO' }),
    ];
    this.nextId = 4;
  }

  async findAll() {
    return [...this.items];
  }

  async findById(id) {
    return this.items.find((p) => p.id === id) || null;
  }

  async save(pedido) {
    const nuevo = new Pedido({ ...pedido, id: this.nextId++ });
    this.items.push(nuevo);
    return nuevo;
  }
}

module.exports = InMemoryPedidoRepository;
