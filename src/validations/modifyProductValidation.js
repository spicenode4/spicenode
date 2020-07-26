const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let modifyProductValidation = [
  body('productName')
    .custom((value, { req }) => {
      if (value == req.body.productName) {
        return false;
      }
    }).withMessage('Debes ingresar algo distinto a lo que estaba'),
  body('productDescription')
    .custom((value, { req }) => {
      if (value == req.body.productDescription) {
        return false;
      }
    }).withMessage('Debes ingresar algo distinto a lo que estaba'),
  body('productCategory')
    .custom((value, { req }) => {
      if (value == req.body.productCategory) {
        return false;
      }
    }).withMessage('Debes ingresar algo distinto a lo que estaba'),
  body('productPrice')
    .custom((value, { req }) => {
      if (value == req.body.productPrice) {
        return false;
      }
    }).withMessage('Debes ingresar algo distinto a lo que estaba'),
  body('productIngredients')
    .custom((value, { req }) => {
      if (value == req.body.productIngredients) {
        return false;
      }
    }).withMessage('Debes ingresar algo distinto a lo que estaba'),
  body('productImage')
    .custom((value, { req }) => {
      if (req.files[0] == undefined) {
        return false;
      }
    }).withMessage('Debes ingresar algo distinto a lo que estaba')
]

module.exports = modifyProductValidation;