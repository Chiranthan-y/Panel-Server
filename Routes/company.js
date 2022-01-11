const express = require('express');
const router = express.Router();
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require('./../Controllers/auth');
const { getUserById } = require('./../Controllers/user');
const {
  createCompany,
  getCompanyById,
  getAllCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} = require('./../Controllers/company');

router.param('companyId', getCompanyById);
router.param('userId', getUserById);

router.post(
  '/user/:userId/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCompany
);

router.get(
  '/user/:userId/:companyId/all',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllCompanies
);
router.get('/user/:userId/:companyId', isSignedIn, isAuthenticated, getCompany);
router.delete(
  '/:companyId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCompany
);
router.put(
  '/user/:userId/:companyId',
  isSignedIn,
  isAuthenticated,
  updateCompany
);

module.exports = router;
