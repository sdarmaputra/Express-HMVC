var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var user = loadModel('user');

var view_dirname = 'user/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	user.findAll().then(function(users) {
		data.users = users;
		res.render(path.join(view_dirname, 'index'), data);
	});
});

router.get('/create', function(req, res, next) {
	data.user = [];
	data.url = '/user/store';
	res.render(path.join(view_dirname, 'create'), data);
});

router.post('/store', function(req, res, next) {
	user.create(req.body).then(function() {
		res.redirect('/user');
	});
});

router.get('/edit/:iduser', function(req, res, next) {
	user.findOne({ where: { iduser: req.params.iduser } }).then(function(user) {
		data.url = '/user/update/'+req.params.iduser;
		data.user = user;
		res.render(path.join(view_dirname, 'edit'), data);
	});
});

router.post('/update/:iduser', function(req, res, next) {
	user.update(req.body, { where: { iduser: req.params.iduser } }).then(function() {
		res.redirect('/user/edit/'+req.params.iduser);
	});
});

router.get('/destroy/:iduser', function(req, res, next) {
	user.destroy({ where: { iduser: req.params.iduser } }).then(function() {
		res.redirect('/user');
	});
});

/* GET home page. */
router.get('/getUsers', function(req, res, next) {
	user.findAll().then(function(user) {
		res.json(user);
	});
});

module.exports = router;
