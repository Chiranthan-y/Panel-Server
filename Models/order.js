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
  medicineId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Medicine',
  },
  medicineName: {
    type: String,
    required: true,
  },
  amountpaid: {
    type: Number,
  },
});
