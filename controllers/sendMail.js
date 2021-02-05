const clientModule = require('../model').clientModel
const userModule = require('../model').userModel
const subjectModule = require('../model').subjectModel
const schedule = require('node-schedule');
const nodemailer = require('nodemailer')
const $ = require('jsrender')
const { Op } = require('sequelize')
const { fn } = require('sequelize')
const templateArr = require('./template_name')
const fs = require('fs')
const csv = require('csv-parser')

const getTemplate =  async () =>{
    let item
    for(let i = 0 ; i < 2 ; i++){
        item = templateArr[Math.floor(Math.random()*templateArr.length)]
        let clients = await clientModule.findAll({ where:{Template_Id:item.id} })
        if(clients && clients.length > 1){
            i=0
            item = templateArr[Math.floor(Math.random()*templateArr.length)]
        }else{
            return item
        }   
    }
}


	


module.exports ={
    async sendmail(req, res){
			try{	
				var flag = true
				do{
					let clientData = await clientModule.findOne({
						where: {status: {[Op.ne]:'done'}},
						order: [
							fn( 'RANDOM' ),
						]
					})
					if(!clientData){
						flag = false
						console.log('all mail are send successfully!')
					}else{
						let userData = await userModule.findOne({
							where: {no_of_mail: { [Op.lt]: 5 }},
							order: [
								fn( 'RANDOM' )
							]
						})
						if(!userData){
							return res.send('user not exist!')
						}else{
							let transporter = nodemailer.createTransport({
								host: 'smtp.gmail.com',
								secureConnection: false,
								port: 587,
								tls: {
									ciphers: 'SSLv3',
								},
								auth: {
									user: userData.Email,
									pass: userData.Passward,
								},
							})
							let subjectData = await subjectModule.findOne({
								order: [
									fn( 'RANDOM' )
								]
							})
							let templateData = await getTemplate()
							let template = $.templates(templateData.name)
							let htmlData = template.render(clientData)
							let mailOptions = {
								from: userData.Email,
								to: clientData.Email,
								subject: subjectData.Subject,
								html: htmlData,
							}
							await transporter.sendMail(mailOptions)
							await clientData.update({Template_Id:templateData.id, status:'done'})
							await userData.update({no_of_mail: userData.no_of_mail+1})
							console.log('mail send successfully!')
						}
					}
				}while(flag)			
			}catch(err){
				console.log(err)
				res.send(err)
			}
			
	},
	
    async addClient(req, res){
		const results = [];
        fs.createReadStream('client.csv')
		.pipe(csv())
		.on('data', (data) => results.push(data))
		.on('end',async () => {
			await clientModule.bulkCreate(results)
			res.send(results)
		});
	},
	
	async addUser(req, res){
		const data = req.body.data
		await userModule.create(data)
		res.send('successfully')
	},

	async addSubject(req, res){
		const data = req.body.data
		await subjectModule.create(data)
		res.send('successfully')
	}


}
