const path = require('path');
const fs = require('fs');

let productsJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
let productsPARSED;

if (productsJSON == '') {
  productsPARSED = [];
} else {
  productsPARSED = JSON.parse(productsJSON);
}

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
  }
}

module.exports = indexController;