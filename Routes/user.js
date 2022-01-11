const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');

const {
  getUser,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers,
} = require('../Controllers/user');
const Router = express.Router();

Router.param('userID', getUserById);

Router.get('/', isAuthenticated, isSignedIn, isAdmin, getAllUsers);
Router.get('/:userID', isAuthenticated, isSignedIn, getUser);
Router.delete('/:userID', isAuthenticated, isSignedIn, isAdmin, deleteUser);
Router.put('/:userID', isAuthenticated, isSignedIn, updateUser);

module.exports = Router;
