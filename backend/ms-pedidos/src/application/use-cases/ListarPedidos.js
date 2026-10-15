class ListarPedidos {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute() {
    return this.pedidoRepository.findAll();
  }
}

module.exports = ListarPedidos;
