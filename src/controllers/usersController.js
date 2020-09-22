const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
let db = require('../database/models');
const { check, validationResult, body } = require('express-validator');

// 1) Leo el JSON
// 2) Creo la variable usersPARSED
// 3) Hago un if para ver si usersJSON esta vacío, porque sino tira un error de Object JSON Anonymous. Si esta vacio le digo que es un array vacío. Si tiene algo que haga el JSON parse
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
    res.render('login-form')
  },
  logUser: (req, res) => {
    // let errors = validationResult(req);
    // if (errors.isEmpty()) {
    //   let userToLog;
    //   for (let i = 0; i < usersPARSED.length; i++) {
    //     if (usersPARSED[i].userEmail == req.body.userEmail && bcrypt.compareSync(req.body.userPassword, usersPARSED[i].userPassword)) {
    //       userToLog = usersPARSED[i];
    //       break;
    //     }
    //   }
    //   if (userToLog == undefined) {
    //     return res.render('login-form', {
    //       errors: [{ msg: 'Credenciales incorrectas' }]
    //     });
    //   }
    //   req.session.loggedUser = userToLog;
    //   if (req.body.rememberMe == "on") {
    //     res.cookie('rememberMe', userToLog.userEmail, { maxAge: 1000 * 30 });
    //   }
    //   res.send('Usuario logeado con exito')
    // } else {
    //   return res.render('login-form', {
    //     errors: errores.mapped()
    //   });
    // }

  },
  showRegister: (req, res) => {
    res.render('register')
  },
  createUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: (req.files[0] != undefined) ? req.files[0].filename : 'defaultUserAvatar.png'
      })
        .then(function (result) {
          res.send("se registro el usuario")
        })
    } else {
      res.render("register", {
        errors: errors.mapped()
      })
    }
    // let errors = validationResult(req);
    // if (errors.isEmpty()) {
    //   let newUser = {
    //     userID: lastID + 1,
    //     userName: req.body.userName,
    //     userLastName: req.body.userLastName,
    //     userCategory: "user",
    //     userEmail: req.body.userEmail,
    //     userPassword: bcrypt.hashSync(req.body.userPassword, 10),
    //     userAvatar: (req.files[0] != undefined) ? req.files[0].filename : 'defaultUserAvatar.png'
    //   }
    //   usersPARSED.push(newUser);
    //   let newUsersJSON = JSON.stringify(usersPARSED);
    //   fs.writeFileSync(path.join(__dirname, '../data/users.json'), newUsersJSON)
    //   res.send('Se registro un usuario correctamente');
    // } else {
    //   res.render('register', {
    //     errors: errors.mapped()
    //   })
    // }
  },
  userLogOut: (req, res) => {
    req.session.destroy();
    res.cookie('rememberMe', '', { maxAge: -1 })
    res.send('Te deslogueaste con éxito')
  }
}

module.exports = usersController;