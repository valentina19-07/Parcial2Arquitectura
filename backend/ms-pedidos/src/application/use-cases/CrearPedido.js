const Pedido = require('../../domain/entities/Pedido');

class CrearPedido {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute(data) {
    const pedido = new Pedido({ ...data, id: null });
    return this.pedidoRepository.save(pedido);
  }
}

module.exports = CrearPedido;
