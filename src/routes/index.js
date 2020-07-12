var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

//* Pagina home
router.get('/', indexController.index)
//* Carrito de compras
router.get('/carrito', indexController.cart)
//* About
router.get('/about', indexController.about)
//* Contacto
router.get('/contacto', indexController.contacto)
//* Gracias
router.get('/gracias', indexController.thankYou);

module.exports = router;