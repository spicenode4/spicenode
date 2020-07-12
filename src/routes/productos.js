var express = require('express');
var router = express.Router();
var productosController = require('../controllers/productosController');

router.get('/', productosController.allProducts)
router.get('/:id', productosController.singleProduct)

module.exports = router;