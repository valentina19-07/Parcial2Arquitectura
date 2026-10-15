const Producto = require('../../domain/entities/Producto');

class CrearProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(data) {
    const producto = new Producto({ ...data, id: null });
    return this.productoRepository.save(producto);
  }
}

module.exports = CrearProducto;
