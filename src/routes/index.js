var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const masterController = require('../controllers/masterController');


router.get('/pruebasql', indexController.pruebaSql);

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
router.get('/check-user', masterController.checkUserSession);
router.get('/check-cookies', masterController.checkUserCookies);

module.exports = router;
