const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

// 1) Leo el JSON
// 2) Creo la variable usersPARSED
// 3) Hago un if para ver si usersJSON esta vacío, porque sino tira un error de Object JSON Anonymous
//    Si esta vacio le digo que es un array vacío. Si tiene algo que haga el JSON parse
let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let usersPARSED;
(usersJSON == '') ? usersPARSED = [] : usersPARSED = JSON.parse(usersJSON);


// Contador de usuarios para que el ID se agregue automaticamente
let lastID = 0;
for (let i = 0; i < usersPARSED.length; i++) {
  if (usersPARSED[i].userID > lastID) {
    lastID = usersPARSED[i].userID
  }
}

const usersController = {
  showLogin: (req, res) => {
    res.render('login')
  },
  logUser: (req, res) => {

  },
  showRegister: (req, res) => {
    res.render('register')
  },
  createUser: (req, res, next) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newUser = {
        userID: lastID + 1,
        userName: req.body.userName,
        userLastName: req.body.userLastName,
        userCategory: "user / admin",
        userEmail: req.body.userEmail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10),
        userAvatar: (req.files[0] != undefined) ? req.files[0].filename : 'defaultUserAvatar.png'
      }
      usersPARSED.push(newUser);
      let newUsersJSON = JSON.stringify(usersPARSED);
      fs.writeFileSync(path.join(__dirname, '../data/users.json'), newUsersJSON)
      res.redirect('/');
    } else {
      res.render('register', {
        errors: errors.mapped()
      })
    }
  }
}

module.exports = usersController;