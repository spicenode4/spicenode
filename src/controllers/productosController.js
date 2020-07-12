const productosController = {
  allProducts: (req, res) => {
    res.render('allProducts')
  },
  singleProduct: (req, res) => {
    res.render('singleProduct')
  }
}

module.exports = productosController;