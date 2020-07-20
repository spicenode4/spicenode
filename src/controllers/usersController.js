const path = require('path');
const fs = require('fs');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let usersPARSED;

if (usersJSON == '') {
  usersPARSED = [];
} else {
  usersPARSED = JSON.parse(usersJSON)
}

const usersController = {
  showLogin: (req, res) => {
    res.render('login')
  },
  showRegister: (req, res) => {
    res.render('register')
  },
  // createUser: (req, res, next) => {
  //   let newUser = {
  //     userID: req.body.userID,
  //     userName: req.body.userName,
  //     userLastName: req.body.userLastName,
  //     userCategory: req.body.userCategory,
  //     userAvatar: req.files[0].filename,
  //     userMail: req.body.userMail,
  //     userPassword: bcrypt.hashSync(req.body.userPassword, 10)
  //   }

  //   usersPARSED.push(newUser);
  //   let newUsersJSON = JSON.stringify(usersPARSED);

  //   fs.writeFileSync(path.join(__dirname, '../data/users.json'), newUsersJSON)
  //   res.redirect('/')
  // }
}

module.exports = usersController;