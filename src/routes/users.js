var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

//* Formulario de login
router.get('/login', usersController.showLogin);
//* Formulario de registro
router.get('/register', usersController.showRegister);
//* Crear usuario
//router.post('/register', usersController.createUser);

module.exports = router;