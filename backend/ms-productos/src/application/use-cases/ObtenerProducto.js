const { NotFoundError } = require('../../domain/errors/DomainError');

class ObtenerProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(id) {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundError(`Producto ${id} no encontrado`);
    }
    return producto;
  }
}

module.exports = ObtenerProducto;
