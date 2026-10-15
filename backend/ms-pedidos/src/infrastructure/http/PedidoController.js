class PedidoController {
  constructor({ listarPedidos, obtenerPedido, crearPedido }) {
    this.listarPedidos = listarPedidos;
    this.obtenerPedido = obtenerPedido;
    this.crearPedido = crearPedido;
  }

  listar = async (req, res, next) => {
    try {
      res.json(await this.listarPedidos.execute());
    } catch (e) {
      next(e);
    }
  };

  obtener = async (req, res, next) => {
    try {
      res.json(await this.obtenerPedido.execute(Number(req.params.id)));
    } catch (e) {
      next(e);
    }
  };

  crear = async (req, res, next) => {
    try {
      res.status(201).json(await this.crearPedido.execute(req.body));
    } catch (e) {
      next(e);
    }
  };
}

module.exports = PedidoController;
