const fs = require('fs');
const path = require('path');
let db = require('../database/models');

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
      db.Category.findAll()
         .then(function (Category) {
            res.render('product-upload-form', { Category: Category });
         })

   },
   create: (req, res, next) => {
      db.Product.create({
         productName: req.body.productName,
         productDescription: req.body.productDescription,
         productCategoryId: req.body.productCategoryId,
         productIngredients: req.body.productIngredients,
         productPrice: req.body.productPrice,
         productImage: 'lala.png'
      });
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
      let productToModify;
      for (let i = 0; i < productsPARSED.length; i++) {
         if (productsPARSED[i].productID == req.params.productId) {
            productToModify = productsPARSED[i];
         }
      }
      let errors = validationResult(req);

      if (errors.isEmpty()) {
         for (let i = 0; i < productsPARSED.length; i++) {
            if (productsPARSED[i].productID == req.params.productId) {
               productsPARSED[i] = {
                  productID: productsPARSED[i].productID,
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
      } else {
         res.render('modify-product-form', {
            product: productToModify,
            errors: errors.mapped()
         })
      }
   },
   deleteForm: (req, res) => {
      for (let i = 0; i < productsPARSED.length; i++) {
         if (productsPARSED[i].productID == req.params.productId) {
            return res.render('delete-product-form', {
               product: productsPARSED[i]
            });
         }
      }
      res.send('Estas queriendo borrar algo que no se puede')
   },
   deleteProduct: (req, res) => {
      for (let i = 0; i < productsPARSED.length; i++) {
         if (productsPARSED[i].productID == req.params.productId) {
            productsPARSED.splice(i, 1);
            let newProductsJSON = JSON.stringify(productsPARSED)
            fs.writeFileSync(path.join(__dirname, '../data/products.json'), newProductsJSON);
            return res.redirect('/');
         }
      }
      res.send('Error de delete product')
   },
   prueba: (req, res) => {
      db.sequelize.query("SELECT * FROM products")
         .then(function (result) {
            res.send(result)
         })
   }
}

module.exports = productsController;