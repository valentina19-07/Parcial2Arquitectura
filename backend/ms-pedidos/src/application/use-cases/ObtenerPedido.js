const { NotFoundError } = require('../../domain/errors/DomainError');

class ObtenerPedido {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute(id) {
    const pedido = await this.pedidoRepository.findById(id);
    if (!pedido) {
      throw new NotFoundError(`Pedido ${id} no encontrado`);
    }
    return pedido;
  }
}

module.exports = ObtenerPedido;
