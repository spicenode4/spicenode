var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');
const uploadProduct = require('../middlewares/multerUploadProduct');
const productValidation = require('../validations/productValidation');
const modifyProductValidation = require('../validations/modifyProductValidation');
const authMiddleware = require('../middlewares/authMiddleware')

// 0 - PRUEBA DE BASE DE DATOS
router.get('/prueba', productsController.prueba)
// 1 - Listado de productos
router.get('/', authMiddleware, productsController.index);
// 2 - Formulario de creacion de productos
router.get('/create', authMiddleware, productsController.uploadForm);
// 3 - Accion de creacion de producto
router.post('/create', uploadProduct.any(), /* productValidation, */ productsController.create);
// 4 - Detalle de un producto en particular
router.get('/:id', productsController.detail);
// 5 - Formulario de edicion de producto
router.get('/:id/edit', modifyProductValidation, productsController.modifyForm);
// 6 - Accion de edicion de producto
router.put('/:id', uploadProduct.any(), /*modifyProductValidation,*/ productsController.updateProduct);
// 7 - Formulario de borrado de productos
router.get('/:id/delete', productsController.deleteForm);
// 8 - Accion de borrado
router.delete('/:id', productsController.deleteProduct);

module.exports = router;