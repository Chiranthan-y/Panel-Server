const express = require('express');
const Router = express.Router();
const { getUserById } = require('../Controllers/user');
const { isAuthenticated, isAdmin, isSignedIn } = require('../Controllers/auth');
const {
  getCompanyById,
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../Controllers/company');

Router.param('userId', getUserById);
Router.param('companyId', getCompanyById);

Router.get(
  '/:userId/company/all',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllCompanies
);
Router.get(
  '/user/:userId/company/:companyId',
  isSignedIn,
  isAuthenticated,
  getCompany
);
Router.post(
  '/user/:userId/company/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCompany
);
Router.put(
  'user/:userId/company/:companyId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCompany
);
Router.delete(
  'user/:userId/company/:companyId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCompany
);

module.exports = Router;
