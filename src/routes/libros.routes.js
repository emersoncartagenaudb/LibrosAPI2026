const express = require('express');
const librosController = require('../controllers/libros.controller');
const router = express.Router();

router.get('/', librosController.findAll);
router.get('/:isbn', librosController.findOne);
router.post('/', librosController.create);
router.put('/:isbn', librosController.update);
router.delete('/:isbn', librosController.delete);

module.exports = router;
