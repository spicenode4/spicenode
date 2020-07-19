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
  contact: (req, res) => {
    res.render('contact')
  },
  thankYou: (req, res) => {
    res.render('gracias')
  }
}

module.exports = homeController;