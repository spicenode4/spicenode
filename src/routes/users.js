var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const uploadAvatar = require('../middlewares/multerUploadAvatar');
const logValidation = require('../validations/logValidation');
const registerValidation = require('../validations/registerValidation');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', usersController.showLogin); //* Formulario de login
router.post('/login', logValidation, usersController.logUser); //* Logear usuario
router.get('/register', usersController.showRegister); //* Formulario de registro
router.post('/register', uploadAvatar.any(), registerValidation, usersController.createUser); //* Crear usuario
router.get('/logout', authMiddleware, usersController.userLogOut);

module.exports = router;