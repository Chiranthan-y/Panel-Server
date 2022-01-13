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
} = require('./../Controllers/medicine');
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require('./../Controllers/auth');

Router.param('userId', getUserById);
Router.param('medicineId', getMedicineById);

Router.get('/user/:userId/medicine', isSignedIn, isAuthenticated, getMedicines);

Router.post(
  '/user/:userId/medicine/new',
  isSignedIn,
  isAuthenticated,
  createMedicine
);

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

module.exports = Router;
