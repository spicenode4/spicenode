var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
var uploadProduct = require('../middlewares/multerMiddlewareProductImage');

router.get('/', productController.allProducts);
router.post('/', uploadProduct.any(), productController.create);
router.get('/create', productController.productForm);
//router.get('/:id', productController.singleProduct);

module.exports = router;