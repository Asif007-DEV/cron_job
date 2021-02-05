const Sequelize = require('sequelize')
/** import all models */
const clientModel = require('./client')
const userModel = require('./user')
const subjectModel = require('./subject')


/** create database connection */
const db = process.env.DB
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
exports.dbconfig = new Sequelize.Sequelize(db, username, password, {
	host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
})

/** export all models */

exports.clientModel = clientModel(exports.dbconfig)
exports.userModel = userModel(exports.dbconfig)
exports.subjectModel = subjectModel(exports.dbconfig)

