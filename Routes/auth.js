const express = require('express');
const { check } = require('express-validator');
const { login, register } = require('../Controllers/auth');

const Router = express.Router();

Router.post('/login', [check('email', 'Enter invalid email').isEmail()], login);
Router.post(
  '/register',
  [
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Enter valid password').isLength({ min: 6 }),
    check('name', 'Enter valid name').isLength({ min: 3 }),
  ],
  register
);

module.exports = Router;
