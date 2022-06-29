var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8080;
var db = 'mongodb://localhost/example';

var users = require('./routes/user');

mongoose.connect(db);

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use('/users', users);

app.get('/', function (req, res) {
	console.log('app starting on port: ' + port);
	res.send('tes express nodejs mongodb');
});

app.listen(port, function () {
	console.log('app listening on port: ' + port);
});
