const express = require('express');
const Router = express.Router();
const { isSignedIn, isAuthenticated } = require('./../Controllers/auth');
const { getUserById } = require('./../Controllers/user');
const { makePayment } = require('./../Controllers/payments');

Router.param('userId', getUserById);

Router.post('/user/:userId/makepay', isSignedIn, isAuthenticated, makePayment);

module.exports = Router;
