const mongoose = require('mongoose');

exports.OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});
