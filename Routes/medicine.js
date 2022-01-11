const express = require('express');
const Router = express.Router();
const {
  createMedicine,
  getMedicine,
  deleteMedicine,
  updateMedicine,
  getMedicineById,
  getAllMedicine,
} = require('../Controllers/medicine');
const { getUserById } = require('../Controllers/user');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('./../Controllers/auth');

//!id
Router.param('medicineId', getMedicineById);
Router.param('userId', getUserById);

//!create
Router.post(
  '/user/:userId/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createMedicine
);

//!read
Router.get(
  '/user/:userId/:medicineId',
  isSignedIn,
  isAuthenticated,
  getMedicine
);

//!get all
Router.get('/user/:userId/all', isSignedIn, isAuthenticated, getAllMedicine);

//!delete
Router.delete(
  '/user/:userId/:medicineId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteMedicine
);

//!update
Router.put(
  'user/:userId/:medicineId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateMedicine
);

module.exports = Router;
