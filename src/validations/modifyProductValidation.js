const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let modifyProductValidation = [
   body('name')
      .custom((value, { req }) => {
         if (value == req.body.name) {
            return false;
         }
      }).withMessage('Debes ingresar algo distinto a lo que estaba'),
   body('description')
      .custom((value, { req }) => {
         if (value == req.body.description) {
            return false;
         }
      }).withMessage('Debes ingresar algo distinto a lo que estaba'),
   body('category')
      .custom((value, { req }) => {
         if (value == req.body.category) {
            return false;
         }
      }).withMessage('Debes ingresar algo distinto a lo que estaba'),
   body('price')
      .custom((value, { req }) => {
         if (value == req.body.price) {
            return false;
         }
      }).withMessage('Debes ingresar algo distinto a lo que estaba'),
   body('ingredients')
      .custom((value, { req }) => {
         if (value == req.body.ingredients) {
            return false;
         }
      }).withMessage('Debes ingresar algo distinto a lo que estaba'),
   body('image')
      .custom((value, { req }) => {
         if (!req.files[0]) {
            return false;
         }
      }).withMessage('Debes ingresar una imagen nueva')
]

module.exports = modifyProductValidation;