const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: Buffer,
    contentType: {
      type: String,
    },
  },
  offer: {
    type: Number,
  },
});

module.exports = mongoose.model('Medicine', medicineSchema);
