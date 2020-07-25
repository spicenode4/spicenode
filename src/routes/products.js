var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');
const uploadProduct = require('../middlewares/multerUploadProduct');
const productValidation = require('../validations/productValidation');

// 1 - Listado de productos
router.get('/', productsController.index);
// 2 - Formulario de creacion de productos
router.get('/create', productsController.uploadForm);
// 3 - Accion de creacion de producto
router.post('/', uploadProduct.any(), productValidation, productsController.create);
// 4 - Detalle de un producto en particular
router.get('/:productId', productsController.detail);
// 5 - Formulario de edicion de producto
router.get('/:productId/edit', productsController.modifyForm);
// 6 - Accion de edicion de producto
router.put('/:productId', uploadProduct.any(), productsController.updateProduct);
// 7 - Formulario de borrado de productos
router.get('/:productId/delete', productsController.deleteForm);
// 8 - Accion de borrado
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;