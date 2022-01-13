const express = require('express');
const Router = express.Router();
const {
  getCategoryById,
  createCategory,
  getAllCategories,
} = require('../Controllers/category');
const { getUserById } = require('../Controllers/user');
const { isAdmin, isAuthenticated, isSignedIn } = require('../Controllers/auth');

Router.param('userId', getUserById);
Router.param('categoryId', getCategoryById);

Router.post(
  'user/:userId/category/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

Router.get(
  'user/:userId/category/new',
  isSignedIn,
  isAuthenticated,
  getAllCategories
);

module.exports = Router;
