const { DataTypes } = require('sequelize')

/** function for address model */
module.exports = (sequelize) => {
	const Subject = sequelize.define('Subject', {
        Subject: DataTypes.STRING
	})
    return Subject
    
}
