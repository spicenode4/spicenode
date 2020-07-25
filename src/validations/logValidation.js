const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let logValidation = [
  check('userName')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('userLastName')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('userCategory')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('userEmail')
    .isEmail().withMessage('Debes ingresar un email válido'),
  check('userPassword')
    .isLength({ min: 8, max: 30 }).withMessage('La constraseña debe contener como mínimo 8 caracteres')
]

module.exports = logValidation;