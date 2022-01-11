const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stockAvailability: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Company', CompanySchema);
