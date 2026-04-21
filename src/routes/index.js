const express = require('express');
const router = express.Router();

const librosRoutes = require('./libros.routes');
const clientesRoutes = require('./clientes.routes');

router.use('/libros', librosRoutes);
router.use('/clientes', clientesRoutes);

module.exports = router;
