var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

// Pagina Home
router.get('/', indexController.index);
// About
router.get('/about', indexController.aboutUs);
// Contact
router.get('/contact', indexController.contactUs);
// Carrito
router.get('/cart', indexController.cart);
// Thank You
router.get('/thank-you', indexController.thankYou);
// Master
// router.get('/master', indexController.masterMenu);
module.exports = router;
