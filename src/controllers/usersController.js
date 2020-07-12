const userController = {
  login: (req, res) => {
    res.render('login')
  },
  register: (req, res) => {
    res.render('register')
  },
  admin: (req, res) => {
    res.render('admin')
  },
  usuario: (req, res) => {
    res.render('user')
  }
}

module.exports = userController;