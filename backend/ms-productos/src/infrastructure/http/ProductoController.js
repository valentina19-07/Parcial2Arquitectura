class ProductoController {
  constructor({ listarProductos, obtenerProducto, crearProducto }) {
    this.listarProductos = listarProductos;
    this.obtenerProducto = obtenerProducto;
    this.crearProducto = crearProducto;
  }

  listar = async (req, res, next) => {
    try {
      res.json(await this.listarProductos.execute());
    } catch (e) {
      next(e);
    }
  };

  obtener = async (req, res, next) => {
    try {
      res.json(await this.obtenerProducto.execute(Number(req.params.id)));
    } catch (e) {
      next(e);
    }
  };

  crear = async (req, res, next) => {
    try {
      res.status(201).json(await this.crearProducto.execute(req.body));
    } catch (e) {
      next(e);
    }
  };
}

module.exports = ProductoController;
