var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.get('/', function (req, res) {
	console.log('getting all users');
	User.find({}).exec(function (err, users) {
		if (err) {
			res.send('error has occured');
		} else {
			console.log(users);
			res.json(uesrs);
		}
	});
});

router.get('/:id', function (req, res) {
	console.log('getting one user');
	User.findOne({
		_id: req.params.id
	}).exec(function (err, user) {
		if (err) {
			res.send('error has occured');
		} else {
			console.log(user);
			res.json(user);
		}
	});
});

router.post('/', function (req, res) {
	var newUser = new User();
	newUser.name = req.user.name;
	newUser.email = req.user.email;

	newUser.save(function (err, user) {
		if (err) {
			res.send('error saving user');
		} else {
			console.log(user);
			res.send(user);
		}
	});
});

router.put('/:id', function (req, res) {
	User.findOneAndUpdate(
		{
			_id: req.params.id
		},
		{
			$set: {
				name: req.body.name,
				email: req.body.email
			}
		},
		{
			upsert: true
		},
		function (err, newUser) {
			if (err) {
				res.send('error updating user');
			} else {
				console.log(newUser);
				res.send(newUser);
			}
		}
	);
});

router.delete('/:id', function (req, res) {
	User.findByIdAndRemove(
		{
			_id: req.params.id
		},
		function (err, user) {
			if (err) {
				res.send('error deleting user');
			} else {
				console.log(user);
				res.send(user);
			}
		}
	);
});

module.exports = router;
