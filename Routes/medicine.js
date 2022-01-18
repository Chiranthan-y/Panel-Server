const express = require('express');
const Router = express.Router();
const { getUserById } = require('./../Controllers/user');
const {
  getMedicineById,
  getMedicine,
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicinePhoto,
  getMedicineByCategory,
} = require('./../Controllers/medicine');
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require('./../Controllers/auth');

const { getCategoryById } = require('./../Controllers/category');

Router.param('userId', getUserById);
Router.param('medicineId', getMedicineById);
Router.param('categoryId', getCategoryById);

Router.get('/medicine', getMedicines);

Router.post(
  '/user/:userId/medicine/new',
  isSignedIn,
  isAuthenticated,
  createMedicine
);

Router.get('/medicine/:medicineId/photo', getMedicinePhoto);

Router.get(
  '/user/:userId/medicine/:medicineId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getMedicine
);
Router.put(
  '/user/:userId/medicine/:medicineId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateMedicine
);
Router.delete(
  '/user/:userId/medicine/:medicineId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteMedicine
);

Router.get(
  'user/:userId/category/:categoryId/',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getMedicineByCategory
);

module.exports = Router;
