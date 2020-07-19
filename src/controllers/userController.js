const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const userController = {
  login: (req, res) => {
    res.render('login')
  },
  register: (req, res) => {
    res.render('register')
  },
  create: (req, res, next) => {
    let newUser = {
      userID: req.body.userID,
      userName: req.body.userName,
      userLastName: req.body.userLastName,
      userCategory: req.body.userCategory,
      userAvatar: req.files[0].filename,
      userMail: req.body.userMail,
      userPassword: bcrypt.hashSync(req.body.userPassword, 10)
    }

    let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
    let usersPARSED;

    if (usersJSON == '') {
      usersPARSED = [];
    } else {
      usersPARSED = JSON.parse(usersJSON)
    }

    usersPARSED.push(newUser);
    let newUsersJSON = JSON.stringify(usersPARSED);

    fs.writeFileSync(path.join(__dirname, '../data/users.json'), newUsersJSON)
    res.render('index')

  },
  usuario: (req, res) => {
    res.render('user')
  }
}

module.exports = userController;