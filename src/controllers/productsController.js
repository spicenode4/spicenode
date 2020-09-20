const fs = require('fs');
const path = require('path');
let db = require('../database/models');

const { check, validationResult, body } = require('express-validator');
const { parse } = require('path');

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
    db.Product.findAll()
      .then(function (result) {
        res.render('products', { products: result })
      })
  },
  uploadForm: (req, res) => {
    let Category;
    db.Category.findAll()
      .then(function (Category) {
        db.Ingredient.findAll()
          .then(function (Ingredient) {
            res.render('product-upload-form', { Category: Category, Ingredient: Ingredient })
            /* res.json({ Category: Category, Ingredient: Ingredient }) */
          })
      })

  },
  create: (req, res, next) => {
    db.Product.create({
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
      price: req.body.price,
      image: req.files[0].filename
    }).then(function (result) {
      req.body.ingredients.forEach(elemento => {
        db.ProductsIngredients.create({
          product_id: result.id,
          ingredient_id: parseInt(elemento)
        })
      });
    }).then(function (redireccionar) {
      res.redirect('/products')
    })
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: {
        all: true
      }
    })
      .then(function (producto) {
        /* return res.send(producto) */
        res.render('single-product', { product: producto })
      })
    /* for (let i = 0; i < productsPARSED.length; i++) {
       if (productsPARSED[i].productID == req.params.productId) {
          return res.render('single-product', {
             product: productsPARSED[i]
          })
       }
    }
    res.send('Aca hay un error') */
  },
  modifyForm: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: {
        all: true
      }
    }).then(function (producto) {
      db.Category.findAll()
        .then(function (categorias) {
          db.Ingredient.findAll()
            .then(function (ingredientes) {
              // return res.json({ product: producto, categories: categorias, ingredients: ingredientes });
              res.render('modify-product-form', {
                product: producto,
                categories: categorias,
                ingredients: ingredientes
              })
            })
        })
    })
  },
  updateProduct: (req, res) => {
    // let errors = validationResult(req);
    // if (errors.isEmpty()) {
    // } else {
    //    res.render('modify-product-form', {
    //       errors: errors.mapped()
    //    })
    // }
    db.ProductsIngredients.destroy({
      where: {
        product_id: req.params.id
      }
    })
      .then(function (result) {
        req.body.ingredients.forEach(elemento => {
          db.ProductsIngredients.create({
            product_id: req.params.id,
            ingredient_id: parseInt(elemento)
          })
        })
      })
      .then(function (result) {
        return res.send("ok")
      })
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