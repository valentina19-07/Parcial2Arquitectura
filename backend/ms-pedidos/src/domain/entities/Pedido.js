const { ValidationError } = require('../errors/DomainError');

const ESTADOS = ['PENDIENTE', 'ENVIADO', 'ENTREGADO'];

class Pedido {
  constructor({ id, clienteId, productoId, cantidad, estado = 'PENDIENTE' }) {
    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      throw new ValidationError('clienteId debe ser un entero positivo');
    }
    if (!Number.isInteger(productoId) || productoId <= 0) {
      throw new ValidationError('productoId debe ser un entero positivo');
    }
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new ValidationError('La cantidad debe ser un entero mayor a 0');
    }
    if (!ESTADOS.includes(estado)) {
      throw new ValidationError(`Estado inválido. Use: ${ESTADOS.join(', ')}`);
    }
    this.id = id;
    this.clienteId = clienteId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.estado = estado;
  }
}

module.exports = Pedido;
