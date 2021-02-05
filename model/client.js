const { DataTypes } = require('sequelize')

/** function for address model */
module.exports = (sequelize) => {
	const Client = sequelize.define('Client', {
        First_Name: DataTypes.STRING,
		Last_Name: DataTypes.STRING,
		Email: DataTypes.STRING,
		Address: DataTypes.STRING,
		status : { type: DataTypes.STRING, defaultValue: 'Pending' },
		Template_Id: DataTypes.INTEGER
	})
	return Client
}
