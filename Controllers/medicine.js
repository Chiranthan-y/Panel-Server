const Medicine = require('../models/medicine');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getMedicineById = (req, res, next, id) => {
  Medicine.findById(id).exec((err, medicine) => {
    if (err) {
      return res.status(400).json({
        error: 'Medicine not found in DB',
      });
    }
    req.medicine = medicine;
    next();
  });
};

exports.createMedicine = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with image',
      });
    }
    let medicine = new Medicine(fields);

    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: 'Image should be less than 3mb in size',
        });
      }
      medicine.photo.data = fs.readFileSync(files.photo.path);
      medicine.photo.contentType = files.photo.type;
    }

    medicine.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: 'Saving to DataBase failed',
        });
      }
      res.status(200).json(result);
    });
  });
};

exports.getAllMedicine = (req, res) => {
  Medicine.find().exec((err, medicines) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(medicines);
  });
};

exports.getMedicine = (req, res) => {
  return res.json(req.medicine);
};

exports.deleteMedicine = (req, res) => {
  let medicine = req.medicine;
  medicine.remove((err, deletedMedicine) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete medicine',
      });
    }
    res.status(200).json({
      message: 'Medicine deleted successfully',
    });
  });
};

exports.updateMedicine = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with image',
      });
    }
    let medicine = req.medicine;
    medicine = _.extend(medicine, fields);

    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: 'Image should be less than 3mb in size',
        });
      }
      medicine.photo.data = fs.readFileSync(files.photo.path);
      medicine.photo.contentType = files.photo.type;
    }

    medicine.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: 'Saving to DataBase failed',
        });
      }
      res.status(200).json(result);
    });
  });
};
