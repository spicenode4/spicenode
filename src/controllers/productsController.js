const fs = require('fs');
const path = require('path');

let productsJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
let productsPARSED;

if (productsJSON == '') {
  productsPARSED = [];
} else {
  productsPARSED = JSON.parse(productsJSON);
}

//* Contador para determinar ID de producto
// let lastId = (array) => {
//   let contador = array[0].productId;
//   for (let i = 0; i < array.length; i++) {
//     if (productsPARSED[i].productId > contador) {
//       contador = array[i].productId;
//     }
//   }
// }

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
    let newProduct = {
      productId: req.body.productId,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productImage: req.files[0].filename,
      productCategory: req.body.productCategory,
      productPrice: req.body.productPrice
    }

    console.log(req)
    productsPARSED.push(newProduct);
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(productsPARSED));

    res.redirect('/products')
  },
  detail: (req, res) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productId == req.params.productId) {
        return res.render('single-product', {
          product: productsPARSED[i]
        })
      }
    }
    res.send('Aca hay un error')
  },
  modifyForm: (req, res) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productId == req.params.productId) {
        return res.render('modify-product-form', {
          product: productsPARSED[i]
        });
      }
    }
    //! FALTA AGREGAR Q HACE SI NO ENCUENTRA NADA
  },
  updateProduct: (req, res, next) => {
    for (let i = 0; i < productsPARSED.length; i++) {
      if (productsPARSED[i].productId == req.params.productId) {
        productsPARSED[i] = {
          productId: req.body.productId,
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productImage: req.files[0].filename,
          productCategory: req.body.productCategory,
          productPrice: req.body.productPrice
        }
        console.log(req.body)
        //! Aca le digo que le asigne a products en la posicion i lo que ponga en req.body
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