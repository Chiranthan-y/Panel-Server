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

exports.getMedicinePhoto = (req, res, next) => {
  if (req.medicine.photo) {
    res.set('Content-Type', req.medicine.photo.contentType);
    return res.send(req.medicine.photo);
  }
  next();
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

      medicine.photo = fs.readFileSync(files.photo.filepath);
      medicine.photo.contentType = files.photo.mimetype;
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

exports.getMedicines = (req, res) => {
  Medicine.find().exec((err, medicines) => {
    if (err) {
      return res.status(400).json({
        error: 'No medicines in DB',
      });
    }
    medicines.forEach((medicine) => {
      medicine.photo = undefined;
    });
    res.status(200).json(medicines);
  });
};

exports.getMedicine = (req, res) => {
  const id = req.params.medicineId;
  Medicine.findById(id).exec((err, medicine) => {
    if (err) {
      return res.status(400).json({
        error: 'Medicine not found in DB',
      });
    }
    res.json(medicine);
  });
};

exports.deleteMedicine = (req, res) => {
  let id = req.params.medicineId;
  Medicine.findByIdAndRemove(id, (err, medicine) => {
    if (err) {
      return res.status(400).json({
        error: 'Medicine not found',
      });
    }
    res.json({
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
      medicine.photo = fs.readFileSync(files.photo.filepath);
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

exports.getMedicineByCategory = (req, res) => {
  let category = req.params.category;
  Medicine.find({ category: category }).exec((err, medicines) => {
    if (err) {
      return res.status(400).json({
        error: 'No medicines in DB',
      });
    }
    medicines.forEach((medicine) => {
      medicine.photo = undefined;
    });
    res.status(200).json(medicines);
  });
};
