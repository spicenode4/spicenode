const path = require('path');
const fs = require('fs');

const masterController = {
  checkUserSession: (req, res) => {
    res.send(req.session)
  },
  checkUserCookies: (req, res) => {
    res.send(req.cookies)
  }
}

module.exports = masterController;