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
      db.products.findAll(
         {
            include: {
               all: true
            }
         }
      )
         .then(function (result) {
            return res.send(result)
         })
   }
}

module.exports = indexController;