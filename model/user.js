const { DataTypes } = require('sequelize')

/** function for address model */
module.exports = (sequelize) => {
	const User = sequelize.define('User', {
        Username: DataTypes.STRING,
		Email: DataTypes.STRING,
        Passward: DataTypes.STRING,
        no_of_mail: DataTypes.INTEGER
	})
	return User
}
