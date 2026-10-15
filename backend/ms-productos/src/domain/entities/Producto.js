const { ValidationError } = require('../errors/DomainError');

class Producto {
  constructor({ id, nombre, precio, stock }) {
    if (!nombre || String(nombre).trim() === '') {
      throw new ValidationError('El nombre es obligatorio');
    }
    if (typeof precio !== 'number' || precio < 0) {
      throw new ValidationError('El precio debe ser un número mayor o igual a 0');
    }
    if (!Number.isInteger(stock) || stock < 0) {
      throw new ValidationError('El stock debe ser un entero mayor o igual a 0');
    }
    this.id = id;
    this.nombre = String(nombre).trim();
    this.precio = precio;
    this.stock = stock;
  }
}

module.exports = Producto;
