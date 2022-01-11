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

Router.param('userId', getUserById);

Router.get('/:userId/all', isSignedIn, isAuthenticated, isAdmin, getAllUsers);
Router.get('/:userId', isSignedIn, isAuthenticated, getUser);
Router.delete('/:userId', isSignedIn, isAuthenticated, isAdmin, deleteUser);
Router.put('/:userId', isSignedIn, isAuthenticated, updateUser);

module.exports = Router;
