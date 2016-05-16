var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

var view_dirname = 'home/views';
var data = [];
data.title = 'Testing';
data.site_name = 'ExpressHMVC-ORM';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
		res.render(path.join(view_dirname, 'index'), data);
});

router.get('/create', function(req, res, next) {
	data.user = [];
	data.url = '/home/store';
	res.render(path.join(view_dirname, 'create'), data);
});

router.post('/store', function(req, res, next) {
		res.redirect('/home');
});

router.get('/edit/:idhome', function(req, res, next) {
		res.render(path.join(view_dirname, 'edit'), data);
});

router.post('/update/:idhome', function(req, res, next) {
		res.redirect('/home');
});

router.get('/destroy/:idhome', function(req, res, next) {
		res.redirect('/home');
});

module.exports = router;
