var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

//* Login
router.get('/login', usersController.login);
//* Register
router.get('/register', usersController.register);
//* Admin
router.get('/admin', usersController.admin);
//* Usuario
router.get('/:idUsuario', usersController.usuario);

module.exports = router;
