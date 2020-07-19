const fs = require('fs');
const path = require('path');

const productController = {
  allProducts: (req, res) => {
    res.render('allProducts')
  },
  productForm: (req, res) => {
    res.render('createProduct')
  },
  create: (req, res, next) => {
    let newProduct = {
      productID: req.body.productID,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productImage: req.files[0].filename,
      productCategory: req.body.productCategory,
      productPrice: req.body.productPrice
    }

    let productsJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let productsPARSED;

    if (productsJSON == '') {
      productsPARSED = [];
    } else {
      productsPARSED = JSON.parse(productsJSON);
    }

    productsPARSED.push(newProduct);
    let newProductsJSON = JSON.stringify(productsPARSED);
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), newProductsJSON)

    res.redirect('/')
  },
  singleProduct: (req, res) => {
    res.render('singleProduct')
  }
}

module.exports = productController;