const express = require('express');
const clientesController = require('../controllers/clientes.controller');
const router = express.Router();

router.get('/', clientesController.findAll);
router.get('/:id', clientesController.findOne);
router.post('/', clientesController.create);
router.put('/:id', clientesController.update);
router.delete('/:id', clientesController.delete);

module.exports = router;
