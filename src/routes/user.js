var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/avatars'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

//* Login
router.get('/login', userController.login);

//* Register
router.get('/register', userController.register);
router.post('/register', upload.any(), userController.create);

//* Admin
router.get('/admin', userController.admin);

//* Usuario
router.get('/:idUsuario', userController.usuario);

module.exports = router;
