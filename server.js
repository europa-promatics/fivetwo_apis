var express = require('express');
var app = express();
var controller 	= require('./controller/controller.js');
var config 		= require('./config.json');
var bodyParser 	= require('body-parser');
// var file_upload 	= require('file-upload');
var Model 		= require('./controller/model.js');
var messages 	= require('./messages.json');
var fileupload = require("express-fileupload");
const https = require("https");
var fs 	= require('fs');
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/production.promaticstechnologies.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/production.promaticstechnologies.com/cert.pem")
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(fileupload());





var port = process.env.PORT || 3001;

app.all('/*', function(req,res,next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Credentials", "true");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH");
   next()
}); // here we try to enable url can access cross origin

/// middleware
	function checkUser(req,res,next){
		if (req.body.user_id == '' || req.body.user_id == null) {
			res.send({
				success:0,
				message:messages.REQUIRED_FIELDS_ERROR
			})
		}else{
			Model.User.findOne({
				where:{
					id:req.body.user_id,
					deleted_at:null
				}
			}).then(user=>{
				if (user=='' || user == null) {
					res.send({
						success:0,
						message:messages.USER_NOT_EXIST
					})
				}else if (user.status == 'A'){
					next()
				}else{
					res.send({
						success:0,
						message:messages.INACTIVE_MSG
					})
				}
			})
		}
	}

////End

app.post('/login',controller.login);
app.post('/officer-login',controller.login_officer);
app.post('/add-investor',controller.investor_add);
app.post('/update-investor',controller.investor_update);
app.post('/add-investor-second-form',controller.investor_add_second_form);
app.post('/add-investor-third-form',controller.investor_add_third_form);
app.post('/add-investor-forth-form',controller.investor_add_forth_form);
app.post('/add-investor-fifth-form',controller.investor_add_fifth_form);
app.post('/investor',controller.investor);
app.post('/lead',controller.lead);
app.post('/add-lead',controller.lead_add);
app.post('/lead-status',controller.lead_status);
app.post('/broker',controller.broker);
app.get('/companies',controller.companies);
app.post('/broker-codes',controller.broker_codes);
app.post('/broker-appointment',controller.broker_appointment);
app.post('/single-investor',controller.single_investor);
app.post('/forgot-password',controller.forgot_password);
app.post('/set-password',controller.set_password);



// app.get('/', function (req, res) {
//   res.send('hello world')
// });
https.createServer(options, app).listen(port, function(){
	console.log('Fivetwo running on port number: '+port);
})

// app.listen(port, function(){
// 	console.log('Fivetwo running on port number: '+port);
// })
