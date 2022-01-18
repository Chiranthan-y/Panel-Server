const express = require('express');
const Router = express.Router();

const { getUserById } = require('./../Controllers/user');
const {
  isSignedIn,
  isAdmin,
  isAuthenticated,
} = require('./../Controllers/auth');

const {
  getCategoryById,
  createCategory,
  getAllCategories,
  deleteCategory,
} = require('./../Controllers/category');

Router.param('userId', getUserById);
Router.param('categoryId', getCategoryById);

Router.post(
  '/user/:userId/category/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

Router.get('/category', getAllCategories);
Router.delete(
  '/user/:userId/category/:categoryId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = Router;
