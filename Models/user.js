const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuid } = require('uuid');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  en_password: {
    type: String,
    required: true,
  },
  customerType: {
    type: String,
    enum: ['premium', 'normal'],
    default: 'normal',
  },
  salt: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
});

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.en_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods.authenticate = function (plainText) {
  return this.encryptPassword(plainText) === this.en_password;
};
userSchema.methods.encryptPassword = function (plainText) {
  if (!plainText) {
    return '';
  }
  try {
    return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
  } catch (err) {
    return '';
  }
};

module.exports = mongoose.model('User', userSchema);
