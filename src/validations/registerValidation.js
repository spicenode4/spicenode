const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let registerValidation = [
  check('name')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('lastname')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),
  // body('mail')
  //   .custom((value) => {
  //     let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
  //     let usersPARSED;
  //     (usersJSON == '') ? usersPARSED = [] : usersPARSED = JSON.parse(usersJSON);
  //     for (let i = 0; i < usersPARSED.length; i++) {
  //       if (usersPARSED[i].userEmail == value) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   }).withMessage('Ya hay otro usuario registrado con este email'),
  check('password')
    .isLength({ min: 3, max: 30 }).withMessage('La constraseña debe contener como mínimo 8 caracteres')
]

module.exports = registerValidation;