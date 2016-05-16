var Sequelize = require('sequelize');

var sequelize = new Sequelize('database_name', 'user', 'password', {
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = sequelize;
