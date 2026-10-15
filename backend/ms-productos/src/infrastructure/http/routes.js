const { Router } = require('express');

module.exports = (controller) => {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);
  router.post('/', controller.crear);
  return router;
};
