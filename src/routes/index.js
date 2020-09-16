var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const masterController = require('../controllers/masterController');

//<---------------PRUEBAS DE SEQUELIZE------------------>//
//Todos los productos
router.get('/pruebasql', indexController.pruebaSql);
//Todos las categorías
router.get('/pruebaCategorias', indexController.pruebaCategorias)
//Todos las ingredientes
router.get('/pruebaingredientes', indexController.pruebaIngredientes)
//Aquí podemos ver los usuarios
router.get('/pruebaUsuarios', indexController.pruebaUsuarios);

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
