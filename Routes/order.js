const express = require('express');
const router = express.Router();
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require('./../Controllers/auth');

const { getUserById } = require('./../Controllers/user');
const { getOrderById, createOrder } = require('./../Controllers/order');

router.param('userId', getUserById);
router.param('orderId', getOrderById);

router.post('/user/:userId/new', isSignedIn, isAuthenticated, createOrder);
router.get(
  '/user/:userId/all',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.delete(
  '/user/:userId/:orderId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteOrder
);

router.put(
  '/user/:userId/:orderId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrder
);
