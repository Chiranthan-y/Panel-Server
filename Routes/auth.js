const express = require('express');
const { check } = require('express-validator');
const { login, register } = require('../Controllers/auth');

const Router = express.Router();

Router.post(
  '/login',
  [check('username', 'enter the username').isLength({ min: 3 })],
  login
);
Router.post(
  '/register',
  [
    check('password', 'Enter valid password').isLength({ min: 6 }),
    check('username', 'Enter valid name').isLength({ min: 3 }),
  ],
  register
);

module.exports = Router;
