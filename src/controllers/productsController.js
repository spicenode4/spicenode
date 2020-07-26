const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let productsJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
let productsPARSED;
(productsJSON == '') ? productsPARSED = [] : productsPARSED = JSON.parse(productsJSON);

let lastProductID = 0;
for (let i = 0; i < productsPARSED.length; i++) {
  if (productsPARSED[i].productID > lastProductID) {
    lastProductID = productsPARSED[i].productID
  }
}

const productsController = {
  index: (req, res) => {
    res.render('products', {
      products: productsPARSED
    })
  },
  uploadForm: (req, res) => {
    res.render('product-upload-form')
  },
  create: (req, res, next) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newProduct = {
        productID: lastProductID + 1,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productCategory: req.body.productCategory,
        productIngredients: req.body.productIngredients,
        productPrice: req.body.productPrice,
        productImage: (req.files[0] != undefined) ? req.files[0].filename : 'defaultProductAvatar.png'
      }
      productsPARSED.push(newProduct);
      fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(productsPARSED));
      res.redirect('/products')
    } else {
      res.render('product-upload-form', {
        errors: errors.mapped()
      })
    }
  },
  detail: (req, res) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productID == req.params.productId) {
        return res.render('single-product', {
          product: productsPARSED[i]
        })
      }
    }
    res.send('Aca hay un error')
  },
  modifyForm: (req, res) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productID == req.params.productId) {
        return res.render('modify-product-form', {
          product: productsPARSED[i]
        });
      }
    }
    res.send('Estás queriendo editar un producto que no existe')
  },
  updateProduct: (req, res, next) => {
    let errors = validationResult(req);
    return res.send(errors);
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productID == req.params.productId) {
        productsPARSED[i] = {
          productID: lastProductID,
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productCategory: req.body.productCategory,
          productIngredients: req.body.productIngredients,
          productPrice: req.body.productPrice,
          productImage: (req.files[0] != undefined) ? req.files[0].filename : 'defaultProductAvatar.png'
        }
        console.log(req.body)
        let newProductsJSON = JSON.stringify(productsPARSED)
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), newProductsJSON);
        res.redirect('/');
      }
    }
  },
  deleteForm: (req, res) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productId == req.params.productId) {
        return res.render('delete-product-form', {
          product: productsPARSED[i]
        });
      }
    }
    //! FALTA AGREGAR Q HACE SI NO ENCUENTRA NADA
  },
  deleteProduct: (req, res) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productId == req.params.productId) {
        productsPARSED.splice(i, 1);
        let newProductsJSON = JSON.stringify(productsPARSED)
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), newProductsJSON);
        res.redirect('/');
      }
    }
  }
}

module.exports = productsController;