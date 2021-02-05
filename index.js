require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const schedule = require('node-schedule');
const axios = require('axios')

/** use body-parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
/** use morgan */
app.use(require('morgan')('dev'))
/** create DB connection */
const models = require('./model')
models.dbconfig
	.sync()
	.then(() => console.log('Connected to DB'))
	.catch((err) => console.log('Somthing went wrong:', err.message))
/** import routers */
const sendMailRoute = require('./routes/index')
/** use routers */
app.use(sendMailRoute)

schedule.scheduleJob('* * * * *',async function(res){
	axios.get('http://localhost:3000/send-mail').then(function(){
		console.log('Mail send successfully!')
	}).catch(function(err){
		console.log(err)
		console.log('Somthing went wrong!')
	})
})

/** server listining the port */
app.listen(process.env.PORT, () => {
	console.log('server is listining on port:', process.env.PORT)
})

module.exports = app
