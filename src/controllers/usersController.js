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
      let errors = validationResult(req);
      if (errors.isEmpty()) {
         let userToLog;
         db.User.findOne({
            where: {
               email: req.body.email
            }
         })
            .then(function (result) {
               if (result) {
                  if (bcrypt.compareSync(req.body.password, result.password)) {

                     userToLog = {
                        name: result.name,
                        email: result.email,
                        category: result.category
                     }

                     /* if (userToLog == undefined) {
                        console.log('hola');
                        return res.render('login-form', {
                           password: { msg: 'credenciales incorrectas' }
                        })
                     } */

                     req.session.loggedUser = userToLog;

                     if (req.body.rememberMe == "on") {
                        res.cookie('rememberMe', userToLog.email, { maxAge: 1000 * 60 });
                     }
                     /* console.log(req.session);
                     console.log(req.cookies); */
                     res.redirect('/')

                     /* res.render("index", { usuario: usuario, products: productos }) */

                  } else {
                     console.log("LAS CREDENCIALES SON INCORRECTAS")
                     return res.render("login-form", {
                        errors: [{ msg: 'Credenciales incorrectas' }]
                     })
                  }
               } else {
                  console.log("NO SE ENCONTRO UN USUARIO")
               }
            })
      } else {
         /* return res.send(errors.mapped()) */
         console.log("ACA IRIAN LOS ERRORES"),
            res.render("login-form", {
               errors: errors.mapped()
            })
      }



      /* let errors = validationResult(req);
      if (errors.isEmpty()) {
        let userToLog;
        for (let i = 0; i < usersPARSED.length; i++) {
          if (usersPARSED[i].userEmail == req.body.userEmail && bcrypt.compareSync(req.body.userPassword, usersPARSED[i].userPassword)) {
            userToLog = usersPARSED[i];
            break;
          }
        }
        if (userToLog == undefined) {
          return res.render('login-form', {
            errors: [{ msg: 'Credenciales incorrectas' }]
          });
        }
        req.session.loggedUser = userToLog;
        if (req.body.rememberMe == "on") {
          res.cookie('rememberMe', userToLog.userEmail, { maxAge: 1000 * 30 });
        }
        res.send('Usuario logeado con exito')
      } else {
        return res.render('login-form', {
          errors: errores.mapped()
        });
      } */

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
               res.redirect("/")
            })
      } else {
         res.render("register", {
            errors: errors.mapped()
         })
      }
   },
   userLogOut: (req, res) => {
      req.session.destroy();
      res.cookie('rememberMe', '', { maxAge: -1 })
      res.redirect('/')
   }
}

module.exports = usersController;