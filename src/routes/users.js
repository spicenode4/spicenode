var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const uploadAvatar = require('../middlewares/multerUploadAvatar');
const logValidation = require('../validations/logValidation');

//* Formulario de login
router.get('/login', usersController.showLogin);
//* Formulario de registro
router.get('/register', usersController.showRegister);
//* Crear usuario
router.post('/register', uploadAvatar.any(), logValidation, usersController.createUser);

module.exports = router;