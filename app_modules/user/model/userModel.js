var Sequelize = require('sequelize');
var db = loadConfig('database');

var user = db.define('user', {
	iduser: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	full_name: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	created_at: Sequelize.DATE
},{
	freezeTableName: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});


module.exports = user;
