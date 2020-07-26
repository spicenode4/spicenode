const fs = require('fs');
const path = require('path');

let rememberMeMiddleware = (req, res, next) => {
  if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
    let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
    let usersPARSED;
    if (usersJSON == '') {
      usersPARSED = [];
    } else {
      usersPARSED = JSON.parse(usersJSON)
    }
    let userToLog;
    for (let i = 0; i < usersPARSED.length; i++) {
      if (usersPARSED[i].userEmail == req.cookies.rememberMe) {
        userToLog = usersPARSED[i];
        break;
      }
    }
    req.session.usuarioLogueado = userToLog;
  }
  next();
}

module.exports = rememberMeMiddleware;