const Router = require('express').Router
const router = new Router()
const sendMailController = require('../controllers/sendMail')

router.get('/send-mail',sendMailController.sendmail)

router.post('/add-client',sendMailController.addClient)

router.post('/add-user',sendMailController.addUser)

router.post('/add-subject',sendMailController.addSubject)

module.exports = router