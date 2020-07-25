const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let productValidation = [
  check('productName')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('productDescription')
    .isLength({ min: 3, max: 1000 }).withMessage('Debe contener como mínimo 1 caracteres'),
  check('productCategory')
    .isLength({ min: 3, max: 30 }).withMessage('Debe contener como mínimo 3 caracteres'),
  check('productPrice')
    .isLength({ min: 3, max: 30 }).withMessage('Debes ingresar un precio'),
  check('productIngredients')
    .isLength({ min: 3, max: 30 }).withMessage('Debes ingresar un ingrediente')
]

module.exports = productValidation;