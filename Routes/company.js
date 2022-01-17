const express = require('express');
const Router = express.Router();
const { getUserById } = require('../Controllers/user');
const {
  getCompanyById,
  getCompany,
  createCompany,
  updateCompany,
  getAllCompanies,
  deleteCompany,
} = require('../Controllers/company');

const { isAdmin, isAuthenticated, isSignedIn } = require('../Controllers/auth');

Router.param('userId', getUserById);
Router.param('companyId', getCompanyById);

Router.post(
  '/user/:userId/company/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCompany
);

Router.get(
  '/user/:userId/company/:companyId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getCompany
);

Router.put(
  '/user/:userId/company/:companyId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCompany
);

Router.delete(
  '/user/:userId/company/:companyId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCompany
);

Router.get('/company', getAllCompanies);

module.exports = Router;
