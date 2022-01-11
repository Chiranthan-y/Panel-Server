const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressWebToken = require('express-jwt');

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: 'Password is incorrect',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.cookie('token', token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.status(200).json({
      message: 'Login successfull',
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.register = (req, res) => {
  const { email, password, name } = req.body;
  const newUser = new User({
    email,
    password,
    name,
  });

  newUser.save((err, user) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    if (user) {
      res.status(200).json({
        message: 'User created successfully',
        user,
      });
    }
  });
};

//middleware

exports.isSignedIn = expressWebToken({
  secret: process.env.SECRET_KEY,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: 'Access Denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'You are not authorized to perform this action',
    });
  }
  next();
};
