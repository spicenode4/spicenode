var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const uploadAvatar = require('../middlewares/multerUploadAvatar');
const logValidation = require('../validations/logValidation');
const registerValidation = require('../validations/registerValidation');

//* Formulario de login
router.get('/login', usersController.showLogin);
//* Logear usuario
router.post('/login', usersController.logUser);
//* Formulario de registro
router.get('/register', usersController.showRegister);
//* Crear usuario
router.post('/register', uploadAvatar.any(), registerValidation, usersController.createUser);

module.exports = router;