var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.get('/', productController.allProducts);
//router.get('/create', productController.create);
router.get('/:id', productController.singleProduct);

module.exports = router;