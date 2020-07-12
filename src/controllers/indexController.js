let homeController = {
  index: (req, res) => {
    res.render("index")
  },
  cart: (req, res) => {
    res.render('cart')
  },
  about: (req, res) => {
    res.render('about')
  },
  contacto: (req, res) => {
    res.render('contacto')
  },
  thankYou: (req, res) => {
    res.render('gracias')
  }
}

module.exports = homeController;