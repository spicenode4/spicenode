const fs = require('fs');
const path = require('path');
const db = require('../database/models')

let rememberMeMiddleware = (req, res, next) => {
   if (req.cookies.rememberMe != undefined && req.session.loggedUser != undefined) {

      db.User.findOne({
         where: {
            email: req.cookies.rememberMe
         }
      })
         .then(function (result) {
            req.session.usuarioLogueado = result.email
            let usuarioLogueado = req.session.usuarioLogueado
         })
   }

   next();
}

module.exports = rememberMeMiddleware;