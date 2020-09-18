const path = require('path');
const fs = require('fs');
let db = require('../database/models');

let productsJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
let productsPARSED;
(productsJSON == '') ? productsPARSED = [] : productsPARSED = JSON.parse(productsJSON);

const indexController = {
   index: (req, res) => {
      res.render('index', {
         products: productsPARSED
      });
   },
   aboutUs: (req, res) => {
      res.render('about')
   },
   contactUs: (req, res) => {
      res.render('contact')
   },
   cart: (req, res) => {
      res.render('cart')
   },
   thankYou: (req, res) => {
      res.render('thank-you')
   },
   pruebaSql: (req, res) => {
      db.Product.findAll(
         {
            include: {
               all: true
            }
         }
      )
         .then(function (products) {
            return res.render('pruebasql', { products: products })
            /* return res.send(products) */
         })
   },
   pruebaUsuarios: (req, res) => {
      db.users.findAll({
         include: {
            all: true
         }
      })
         .then(function (result) {
            return res.send(result)
         })
   },
   pruebaCategorias: (req, res) => {
      db.Category.findAll({
         include: {
            all: true
         }
      })
         .then(function (result) {
            return res.send(result)
         })
         .catch(function (error) {
            return res.send(error)
         })
   },
   pruebaIngredientes: (req, res) => {
      db.Ingredient.findAll({
         include: {
            all: true
         }
      })
         .then(function (result) {
            return res.send(result)
         })
   },
   pruebaSqlFormulario: (req, res) => {
      res.send(req.body)
   }
}

module.exports = indexController;