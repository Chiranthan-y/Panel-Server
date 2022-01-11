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

Router.get('/:userID/all', isSignedIn, isAuthenticated, isAdmin, getAllUsers);
Router.get('/:userID', isSignedIn, isAuthenticated, getUser);
Router.delete('/:userID', isSignedIn, isAuthenticated, isAdmin, deleteUser);
Router.put('/:userID', isSignedIn, isAuthenticated, updateUser);

module.exports = Router;
