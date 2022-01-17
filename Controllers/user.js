const User = require('./../models/user');
const _ = require('lodash');

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: 'User not found',
			});
		}
		req.profile = user;
		next();
	});
};

exports.getAllUsers = (req, res) => {
	User.find().exec((err, users) => {
		if (err) {
			return res.status(400).json({
				error: 'Users not found',
			});
		}
		return res.json(users);
	});
};

exports.getUser = (req, res) => {
	req.profile.en_password = undefined;
	return res.json(req.profile);
};

exports.deleteUser = (req, res) => {
	let { id } = req.body;
	User.findByIdAndRemove(id, (err, user) => {
		if (err) {
			return res.status(400).json({
				error: 'User not found',
			});
		}
		res.json({
			message: 'User deleted successfully',
		});
	});
};

exports.updateUser = (req, res) => {
	let user = req.profile;
	user = _.extend(user, req.body);
	user.updated = Date.now();
	user.save((err) => {
		if (err) {
			return res.status(400).json({
				error: 'You are not authorized to perform this action',
			});
		}
		user.en_password = undefined;
		res.json(user);
	});
};
