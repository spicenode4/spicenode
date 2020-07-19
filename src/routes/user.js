var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var uploadAvatar = require('../middlewares/multerMiddlewareAvatar');

//* Login
router.get('/login', userController.login);

//* Register
router.get('/register', userController.register);
router.post('/register', uploadAvatar.any(), userController.create);

//* Usuario
router.get('/:idUsuario', userController.usuario);

module.exports = router;
