const Company = require('../models/company');

exports.getCompanyById = (req, res, next, id) => {
  Company.findById(id).exec((err, company) => {
    if (err) {
      return res.status(400).json({
        error: 'Company not found in DB',
      });
    }
    req.company = company;
    next();
  });
};

exports.createCompany = (req, res) => {
  const company = new Company(req.body);
  company.save((err, company) => {
    if (err) {
      return res.status(400).json({
        error: 'Company not created',
      });
    }
    res.json(company);
  });
};

exports.getAllCompanies = (req, res) => {
  Company.find().exec((err, companies) => {
    if (err) {
      return res.status(400).json({
        error: 'No companies found',
      });
    }
    res.json(companies);
  });
};

exports.getCompany = (req, res) => {
  return res.json(req.company);
};

exports.updateCompany = (req, res) => {
  const company = req.company;
  company.name = req.body.name;
  company.description = req.body.description;
  company.website = req.body.website;
  company.location = req.body.location;
  company.save((err, updatedCompany) => {
    if (err) {
      return res.status(400).json({
        error: 'Company not updated',
      });
    }
    res.json(updatedCompany);
  });
};

exports.deleteCompany = (req, res) => {
  const company = req.company;
  company.remove((err, deletedCompany) => {
    if (err) {
      return res.status(400).json({
        error: 'Company not deleted',
      });
    }
    res.json({
      message: 'Company deleted successfully',
    });
  });
};
