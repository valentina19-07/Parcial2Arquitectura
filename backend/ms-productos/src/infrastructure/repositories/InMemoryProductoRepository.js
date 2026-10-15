const ProductoRepository = require('../../domain/repositories/ProductoRepository');
const Producto = require('../../domain/entities/Producto');

class InMemoryProductoRepository extends ProductoRepository {
  constructor() {
    super();
    this.items = [
      new Producto({ id: 1, nombre: 'Laptop', precio: 3200000, stock: 10 }),
      new Producto({ id: 2, nombre: 'Mouse', precio: 80000, stock: 50 }),
      new Producto({ id: 3, nombre: 'Teclado', precio: 150000, stock: 30 }),
    ];
    this.nextId = 4;
  }

  async findAll() {
    return [...this.items];
  }

  async findById(id) {
    return this.items.find((p) => p.id === id) || null;
  }

  async save(producto) {
    const nuevo = new Producto({ ...producto, id: this.nextId++ });
    this.items.push(nuevo);
    return nuevo;
  }
}

module.exports = InMemoryProductoRepository;
