var express     = require('express');
var Model 		= require('./model.js');
var config 		= require('../config.json');
var messages 	= require('../messages.json');
var bcrypt 		= require('bcryptjs');
var mailer      = require('express-mailer');
var base64 		= require('base-64'); //to encode/decode
var Sequelize 	= require('sequelize');
var format      = require('date-format');
const formatCurrency = require('format-currency');
// const curl = new (require( 'curl-request' ))();
const querystring = require('querystring');
// const { Curl } = require('node-libcurl');
var fs 			= require('fs');
var Promise = require('promise');
var path = require("path");
// var ejs = require('ejs');
const Op 		= Sequelize.Op;

var app         = express();

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

var sequelize = new Sequelize(
    config.dev.database,
    config.dev.user,
    config.dev.password, {
        logging: console.log,
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        // operatorsAliases: false
    }
);


const pagination_limit  = 10;
// const clientEmail       = "promatics.example@gmail.com";
// const clientEmailPass   = "Promatics@321";
const clientEmail       = "promatics.ionicteam@gmail.com";
const clientEmailPass   = "Gagz@123";
const serverPath        = "https://production.promaticstechnologies.com/fivetwo";
const appName           = "FiveTwo";


mailer.extend(app, {
  from: clientEmail,
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port:465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: clientEmail,
    pass: clientEmailPass
  }
});


// var AboutUsImgPath 		= "http://13.233.185.124/test/public/images/about_us";
// var ProductImgPath 		= "http://13.233.185.124/test/public/images/products";


// var InvestorIdBasePath             = "/var/www/html/fivetwo/public/images/users/";
// var InvestorIdBasePath             = "/var/www/html/fivetwo/public/images/users/";
var InvestorIdBasePath             = "/var/www/html/fivetwo/assets/img/investorId/";
var InvestorSignBasePath           = "/var/www/html/fivetwo/assets/img/investorSign/";
var BrokerAppointmentSignBasePath  = "/var/www/html/fivetwo/assets/img/brokerAppointmentSign/";




/*static functions*/



function generateRandomNumber(){
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 2; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));  
    }
    return text;
}
function timestamp(){
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 2; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));  
    }

    var timestamp = Math.round(new Date().getTime()/1000);
    return timestamp+''+text;
}
// var template = 'welcome_letter';
// var email = 'promatics.rohit1@gmail.com';
// var subject = 'Reset Password';
// var data = {
//     id:'3'
// }

function send_email(email,subject,template,data){
    app.mailer.send(template, {
        // to:'promatics.ajeet.kumar@gmail.com',
        to:email,
        subject: subject,
        user:data
      }, function (err,message) {
        if (err) {
              console.log(err);
             
            return false;
        }else{
            console.log('sent')
            
            return true;
        }
    });
}

// send_email(email,subject,template,data);

/*End*/


/*Associations*/

Model.Investor.hasMany(Model.InvestorChildren,{
	foreignKey:'investor_id',
	as:'investor_childrens'
});
Model.Investor.hasMany(Model.InvestorBeneficiary,{
    foreignKey:'investor_id',
    as:'investor_beneficiaries'
});
Model.Investor.hasMany(Model.InvestorDocument,{
    foreignKey:'investor_id',
    as:'investor_documents'
});
Model.Investor.hasOne(Model.InvestorBrokerAppointment,{
    foreignKey:'investor_id',
    as:'investor_broker_appointments'
});





exports.login = function(req,res){
    if(req.body.email == '' || req.body.password == ''|| req.body.type == ''){
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.User.findOne({
            where:{
                email:req.body.email,
                type:req.body.type
            }
        }).then(data=>{
            if(data == '' || data == null){
                res.send({
                    success:0,
                    message:messages.USER_NOT_EXIST
                })
            } else{
                if(data.status == 'active'){
                    if(bcrypt.compareSync(req.body.password,data.password) ){
                        var full_name = data.first_name+' '+data.last_name;
                        res.send({
                            success:1,
                            message:"Welcome "+full_name,
                            data:data,
                        })
                    } else{
                        res.send({
                            success:0,
                            message:messages.INCORRECT_EMAIL_PASSWORD_COMBINATION
                        })
                    }
                } else{
                    res.send({
                        success:0,
                        message:messages.INACTIVE_MSG
                    })
                }
            }
        },error=>{
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.login_officer = function(req,res){
    if(req.body.email == '' || req.body.password == ''|| req.body.type == ''){
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.User.findOne({
            where:{
                email:req.body.email,
                type:req.body.type
            }
        }).then(data=>{
            if(data == '' || data == null){
                res.send({
                    success:0,
                    message:messages.USER_NOT_EXIST
                })
            } else{
                if(data.status == 'active'){
                    if(bcrypt.compareSync(req.body.password,data.password) ){
                        var full_name = data.first_name+' '+data.last_name;
                        res.send({
                            success:1,
                            message:"Welcome "+full_name,
                            data:data,
                        })
                    } else{
                        res.send({
                            success:0,
                            message:messages.INCORRECT_EMAIL_PASSWORD_COMBINATION
                        })
                    }
                } else{
                    res.send({
                        success:0,
                        message:messages.INACTIVE_MSG
                    })
                }
            }
        },error=>{
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor_add = function(req, res) {
    // console.log(req.body.form);
    if(req.body.form.LastName == '' || req.body.form.LastName == null || req.body.form.FirstName == '' || req.body.form.FirstName == null
     || req.body.form.IdNumber == '' || req.body.form.IdNumber == null){
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.create({
            // req.files for files move
            broker_id:req.body.broker_id,
            type:'investor',
            investor_number:timestamp(),
            LastName:req.body.form.LastName,
            FirstName:req.body.form.FirstName,
            IdNumber:req.body.form.IdNumber,
            CellNumber:req.body.form.CellNumber,
            Email:req.body.form.Email,
            HomeNumber:req.body.form.HomeNumber,
            WorkNumber:req.body.form.WorkNumber,
            HomeAddress:req.body.form.HomeAddress,
            PostalAddress:req.body.form.PostalAddress,
            TaxNumber:req.body.form.TaxNumber,
            MaritalStatus:req.body.form.MaritalStatus,
            BankName:req.body.form.BankName,
            BankNumber:req.body.form.BankNumber,
            AccountType:req.body.form.AccountType,
            Note:req.body.form.Note,

        }).then((investor)=>{

            if(req.body.form.LastName2 == '' || req.body.form.LastName2 == null){

                console.log('empty spouse');
            }else{

                Model.Investor.create({
                    // req.files for files move
                    broker_id:req.body.broker_id,
                    type:'spouse',
                    investor_number:timestamp(),
                    spouse_id:investor.id,
                    LastName:req.body.form.LastName2,
                    FirstName:req.body.form.FirstName2,
                    IdNumber:req.body.form.IdNumber2,
                    CellNumber:req.body.form.CellNumber2,
                    Email:req.body.form.Email2,
                    HomeNumber:req.body.form.HomeNumber2,
                    WorkNumber:req.body.form.WorkNumber2,
                    HomeAddress:req.body.form.HomeAddress2,
                    PostalAddress:req.body.form.PostalAddress2,
                    TaxNumber:req.body.form.TaxNumber2,
                    MaritalStatus:req.body.form.MaritalStatus2,
                    BankName:req.body.form.BankName2,
                    BankNumber:req.body.form.BankNumber2,
                    AccountType:req.body.form.AccountType2,
                    Note:req.body.form.Note,

                })

            }

            req.body.children.forEach(function(val,ind){
                if (val.FullName=='' ) {
                    console.log('empty');
                }else{
                    Model.InvestorChildren.create({
                        investor_id:investor.id,
                        FullName:val.FullName,
                        IdNumber:val.IdNumber,
                        CellNumber:val.CellNumber,
                        Email:val.Email

                    }).then(child=>{
                        console.log(child);
                    },error=>{
                        console.log(error);
                    })
                }
            })

            req.body.beneficiaries.forEach(function(val,ind){
                if (val.FullName=='' ) {
                    console.log('empty');
                }else{
                    Model.InvestorBeneficiary.create({
                        investor_id:investor.id,
                        FullName:val.FullName,
                        Relationship:val.Relationship,
                        CellNumber:val.CellNumber,
                        Percent:val.Percent

                    }).then(child=>{
                        console.log(child);
                    },error=>{
                        console.log(error);
                    })
                }
            })
            

            res.send({
                success:1,
                message:'Investor inserted successfully.',
                data:investor
            });

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor_update = function (req, res) {
    // console.log(req.body);
    // console.log(req.files);
    if (req.body.id == '' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.findOne({
            where: {
                id:req.body.id,
            }
        }).then(data=>{

            if (data!='' && data!=null && data.id != req.body.id) {
                res.send({
                    success:0,
                    message:messages.ERROR
                })
            }else{
                
                data.update({ 
                    LastName:req.body.form.LastName,
                    FirstName:req.body.form.FirstName,
                    IdNumber:req.body.form.IdNumber,
                    CellNumber:req.body.form.CellNumber,
                    Email:req.body.form.Email,
                    HomeNumber:req.body.form.HomeNumber,
                    WorkNumber:req.body.form.WorkNumber,
                    HomeAddress:req.body.form.HomeAddress,
                    PostalAddress:req.body.form.PostalAddress,
                    TaxNumber:req.body.form.TaxNumber,
                    MaritalStatus:req.body.form.MaritalStatus,
                    BankName:req.body.form.BankName,
                    BankNumber:req.body.form.BankNumber,
                    AccountType:req.body.form.AccountType,
                    Note:req.body.form.Note,

                    updated_at:new Date()
                }).then(updated_data=>{

                    if(req.body.form.LastName2 == '' || req.body.form.LastName2 == null){

                        console.log('empty spouse');
                    }else{

                        Model.Investor.findOne({
                            where: {
                                spouse_id:req.body.id,
                            }
                        }).then(spouse=>{
                            spouse.update({

                                // spouse_id:investor.id,
                                LastName:req.body.form.LastName2,
                                FirstName:req.body.form.FirstName2,
                                IdNumber:req.body.form.IdNumber2,
                                CellNumber:req.body.form.CellNumber2,
                                Email:req.body.form.Email2,
                                HomeNumber:req.body.form.HomeNumber2,
                                WorkNumber:req.body.form.WorkNumber2,
                                HomeAddress:req.body.form.HomeAddress2,
                                PostalAddress:req.body.form.PostalAddress2,
                                TaxNumber:req.body.form.TaxNumber2,
                                MaritalStatus:req.body.form.MaritalStatus2,
                                BankName:req.body.form.BankName2,
                                BankNumber:req.body.form.BankNumber2,
                                AccountType:req.body.form.AccountType2,
                                Note:req.body.form.Note,
                                updated_at:new Date()
                            })
                        })    
                        
                    }

                    Model.InvestorChildren.findAll({
                        where: {
                            investor_id:req.body.id,
                        }
                    }).then(data=>{
                        data.destroy()
                        
                    })

                    req.body.children.forEach(function(val,ind){
                        if (val.FullName=='' ) {
                            console.log('empty');
                        }else{
                            Model.InvestorChildren.create({
                                investor_id:investor.id,
                                FullName:val.FullName,
                                IdNumber:val.IdNumber,
                                CellNumber:val.CellNumber,
                                Email:val.Email

                            }).then(child=>{
                                console.log(child);
                            },error=>{
                                console.log(error);
                            })
                        }
                    })


                    Model.InvestorBeneficiary.findAll({
                        where: {
                            investor_id:req.body.id,
                        }
                    }).then(data=>{
                        data.destroy()
                        
                    })

                    req.body.beneficiaries.forEach(function(val,ind){
                        if (val.FullName=='' ) {
                            console.log('empty');
                        }else{
                            Model.InvestorBeneficiary.create({
                                investor_id:investor.id,
                                FullName:val.FullName,
                                Relationship:val.Relationship,
                                CellNumber:val.CellNumber,
                                Percent:val.Percent

                            }).then(child=>{
                                console.log(child);
                            },error=>{
                                console.log(error);
                            })
                        }
                    })

                    res.send({
                        success:1,
                        message:"advisor updated successfully",
                        data:updated_data
                    })
                }, error=>{
                    res.send({
                        success:0,
                        message:error
                    })
                })
                
            }    

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor_add_second_form = function (req, res) {
    // console.log(req.body);
    // console.log(req.files);
    if (req.body.id == '' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.findOne({
            where: {
                id:req.body.id,
            },
            include:[
                {
                    model:Model.InvestorChildren,
                    as:'investor_childrens'
                },
                {
                    model:Model.InvestorBeneficiary,
                    as:'investor_beneficiaries'
                },
                {
                    model:Model.InvestorDocument,
                    as:'investor_documents'
                },
                
            ],
            // distinct:true
        }).then(data=>{

            if (data!='' && data!=null && data.id != req.body.id) {
                res.send({
                    success:0,
                    message:messages.ERROR
                })
            }else{
                    console.log('files----------',req.files)
                    console.log('count----------',req.files.image.length)
                    // console.log('image----------',req.image)
                if(req.files){
                    // var old_image = data.UploadId;
                    // if(old_image != '' || old_image != null){
                    //     if(fs.existsSync(InvestorIdBasePath+old_image)){
                    //         fs.unlink(InvestorIdBasePath+old_image, (err) => {
                    //             if (err) throw err;
                    //             console.log('file deleted');
                    //         });
                    //     }
                    // }
                    // Model.InvestorDocument.findAll({
                    //     where: {
                    //         investor_id:req.body.id,
                    //     }
                    // }).then(data=>{
                    //     if (data) {
                    //         data.destroy()
                    //     }    
                    // })
                    var length = req.files.image.length
                    
                    if (length!=undefined) {

                        req.files.image.forEach(function(val,ind){
                            i++
                            if (val) {
                               

                                var new_image = val;
                                console.log(new_image)
                                image_name = Math.random().toString(36).slice(-8)+new_image.name;
                                new_image.mv(InvestorIdBasePath+image_name, function(err){
                                    if(err){
                                        res.send({
                                            success:0,
                                            message:"Image not uploaded"
                                        })
                                    }else{
                                        console.log('innnnnnnnnnnnnn')
                                        Model.InvestorDocument.create({
                                            investor_id:data.id,
                                            upload_id:image_name,
                                            

                                        }).then(child=>{
                                            console.log(child);
                                        },error=>{
                                            console.log(error);
                                        })
                                        
                                    }
                                })
                            }
                        })
                    }else{

                        var i=0;
                        var image = []
                        image.push(req.files.image);
                            
                        image.forEach(function(val,ind){
                            i++
                            if (val) {
                               

                                var new_image = val;
                                console.log(new_image)
                                image_name = Math.random().toString(36).slice(-8)+new_image.name;
                                new_image.mv(InvestorIdBasePath+image_name, function(err){
                                    if(err){
                                        res.send({
                                            success:0,
                                            message:"Image not uploaded"
                                        })
                                    }else{
                                        console.log('innnnnnnnnnnnnn')
                                        Model.InvestorDocument.create({
                                            investor_id:data.id,
                                            upload_id:image_name,
                                            

                                        }).then(child=>{
                                            console.log(child);
                                        },error=>{
                                            console.log(error);
                                        })
                                        
                                    }
                                })
                            }
                        })
                    }

                    
                }
                data.update({
                    // UploadId:image_name,
                    updated_at:new Date()
                }).then(updated_data=>{
                    res.send({
                        success:1,
                        message:"Upload Id updated successfully",
                        data:updated_data
                    })
                }, error=>{
                    res.send({
                        success:0,
                        message:error
                    })
                })
                
            }    

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor_add_third_form = function (req, res) {
    console.log(req.body);
    console.log(req.files);
    if (req.body.id == '' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.findOne({
            where: {
                id:req.body.id,
            },
            include:[
                {
                    model:Model.InvestorChildren,
                    as:'investor_childrens'
                },
                {
                    model:Model.InvestorBeneficiary,
                    as:'investor_beneficiaries'
                },
                {
                    model:Model.InvestorDocument,
                    as:'investor_documents'
                },
                
            ],
        }).then(data=>{

            if (data!='' && data!=null && data.id != req.body.id) {
                res.send({
                    success:0,
                    message:messages.ERROR
                })
            }else{
                if (req.body.DisclosureSign) {
                    var image = Math.random().toString(36).slice(-8)+'.png';
                    try {
                        
                        const base64Data = req.body.DisclosureSign.replace(/^data:([A-Za-z-+/]+);base64,/, '');

                        fs.writeFileSync(InvestorSignBasePath+image, base64Data,  {encoding: 'base64'});
                        data.update({
                            DisclosureSign: image
                        });
                    }catch (err) {
                        console.log(err)
                    }
                }
               
                data.update({
                    DisclosureName:req.body.DisclosureName,
                    DisclosureDate:req.body.DisclosureDate,
                    DisclosureAgree:req.body.DisclosureAgree,
                    // DisclosureSign:image_name,
                    updated_at:new Date()
                }).then(updated_data=>{
                    res.send({
                        success:1,
                        message:"Third form updated successfully",
                        data:updated_data
                    })
                }, error=>{
                    res.send({
                        success:0,
                        message:error
                    })
                })
                
            }    

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor_add_forth_form = function (req, res) {
    console.log(req.body);
    // console.log(req.files);
    if (req.body.id == '' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.findOne({
            where: {
                id:req.body.id,
            },
            include:[
                {
                    model:Model.InvestorChildren,
                    as:'investor_childrens'
                },
                {
                    model:Model.InvestorBeneficiary,
                    as:'investor_beneficiaries'
                },
                {
                    model:Model.InvestorDocument,
                    as:'investor_documents'
                },
                
            ],
        }).then(data=>{

            if (data!='' && data!=null && data.id != req.body.id) {
                res.send({
                    success:0,
                    message:messages.ERROR
                })
            }else{
                if (req.body.RecordAdviceClientSignature) {
                    var image = Math.random().toString(36).slice(-8)+'.png';
                    try {
                        
                        const base64Data = req.body.RecordAdviceClientSignature.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                        
                        fs.writeFileSync(InvestorSignBasePath+image, base64Data,  {encoding: 'base64'});
                        data.update({
                            RecordAdviceClientSignature: image
                        });
                    }catch (err) {
                        console.log(err)
                    }
                }
                if (req.body.RecordAdviceAdvisorSignature) {
                    var image = Math.random().toString(36).slice(-8)+'.png';
                    try {
                        
                        const base64Data = req.body.RecordAdviceAdvisorSignature.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                        
                        fs.writeFileSync(InvestorSignBasePath+image, base64Data,  {encoding: 'base64'});
                        data.update({
                            RecordAdviceAdvisorSignature: image
                        });
                    }catch (err) {
                        console.log(err)
                    }
                }
               
                data.update({
       
                    RecordAdviceDate:req.body.RecordAdviceDate,
                    RecordAdviceClient:req.body.RecordAdviceClient,
                    RecordAdviceAdvisor:req.body.RecordAdviceAdvisor,
                    RecordAdviceSummaryOfDiscussionWithClient:req.body.RecordAdviceSummaryOfDiscussionWithClient,
                    RecordAdviceSummaryOfAdviceFromAdvisor:req.body.RecordAdviceSummaryOfAdviceFromAdvisor,
                    RecordAdviceOfAdvisorTaken:req.body.RecordAdviceOfAdvisorTaken,
                    RecordAdviceOfAdvisorExplain:req.body.RecordAdviceOfAdvisorExplain,
                    updated_at:new Date()
                }).then(updated_data=>{
                    res.send({
                        success:1,
                        message:"Upload Id updated successfully",
                        data:updated_data
                    })
                }, error=>{
                    res.send({
                        success:0,
                        message:error
                    })
                })
                
            }    

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor_add_fifth_form = function (req, res) {
    // console.log(req.body);
    // console.log(req.files);
    if (req.body.id == '' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.findOne({
            where: {
                id:req.body.id,
            },
            include:[
                {
                    model:Model.InvestorChildren,
                    as:'investor_childrens'
                },
                {
                    model:Model.InvestorBeneficiary,
                    as:'investor_beneficiaries'
                },
                {
                    model:Model.InvestorDocument,
                    as:'investor_documents'
                },
                
            ],
        }).then(data=>{

            if (data!='' && data!=null && data.id != req.body.id) {
                res.send({
                    success:0,
                    message:messages.ERROR
                })
            }else{
                if (req.body.RiskProfilerClientSignature) {
                    var image = Math.random().toString(36).slice(-8)+'.png';
                    try {
                        
                        const base64Data = req.body.RiskProfilerClientSignature.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                        
                        fs.writeFileSync(InvestorSignBasePath+image, base64Data,  {encoding: 'base64'});
                        data.update({
                            RiskProfilerClientSignature: image
                        });
                    }catch (err) {
                        console.log(err)
                    }
                }
                if (req.body.RiskProfilerAdvisorSignature) {
                    var image = Math.random().toString(36).slice(-8)+'.png';
                    try {
                        
                        const base64Data = req.body.RiskProfilerAdvisorSignature.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                        
                        fs.writeFileSync(InvestorSignBasePath+image, base64Data,  {encoding: 'base64'});
                        data.update({
                            RiskProfilerAdvisorSignature: image
                        });
                    }catch (err) {
                        console.log(err)
                    }
                }
               
                data.update({
       
                    Year1:req.body.Year1,
                    Year2:req.body.Year2,
                    Year3:req.body.Year3,
                    Year4:req.body.Year4,
                    Year5:req.body.Year5,
                    Year6:req.body.Year6,
                    
                    // DisclosureSign:image_name,
                    updated_at:new Date()
                }).then(updated_data=>{

                    var user_data = {
                        FirstName:updated_data.FirstName,
                        LastName:updated_data.LastName,
                        logoPath:serverPath+'/'+"assets/img/logo.png",
                        year:new Date().getFullYear()
                    }
                    var email = updated_data.Email;
                    var subject = 'Welcome Letter';
                    var template = 'welcome_letter';

                    send_email(email,subject,template,user_data)

                    res.send({
                        success:1,
                        message:"Advisor added successfully",
                        data:updated_data
                    })
                }, error=>{
                    res.send({
                        success:0,
                        message:error
                    })
                })
                
            }    

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.investor = function(req,res){
    // console.log(req.body);
    var offset;
    var limit;
    var investor_filter = {}

    var order_by
    var sort
    if(req.body.order_by == '' || req.body.order_by == null){
        order_by = [['created_at','DESC']];
    } else{
        

        order_by = [[req.body.order_by, req.body.sort]];
        
    }

    if(req.body.offset == '' || req.body.offset == null){
        offset = 0
    } else{
        offset = parseInt(req.body.offset)
    }
    if(req.body.limit == '' || req.body.limit == null){
        limit = 50
    } else{
        limit = parseInt(req.body.limit)
    }

    if (req.body.option != '' && req.body.option != null && req.body.search != '' && req.body.search != null) {
        if (req.body.option=='FirstName') {
            investor_filter.FirstName = {[Op.like]:'%'+req.body.search+'%'};
        }else if(req.body.option=='LastName') {
            investor_filter.LastName = {[Op.like]:'%'+req.body.search+'%'};
        }else if(req.body.option=='Email') {
            investor_filter.Email = {[Op.like]:'%'+req.body.search+'%'};
        }
    }

    if (req.body.broker_id != '' && req.body.broker_id != null) {
        investor_filter.broker_id=req.body.broker_id
    }

    investor_filter.type='investor'

    Model.Investor.findAndCountAll({
        // where:{
        //     type:'investor'
        // },
        where:investor_filter,
        limit:limit,
        offset:offset,
        order:order_by,
        include:[
                {
                    model:Model.InvestorChildren,
                    as:'investor_childrens'
                },
                {
                    model:Model.InvestorBeneficiary,
                    as:'investor_beneficiaries'
                },
                {
                    model:Model.InvestorDocument,
                    as:'investor_documents'
                },
                {
                    model:Model.InvestorBrokerAppointment,
                    as:'investor_broker_appointments'
                },
            ],
        distinct:true
    }).then(data=>{
        if (data) {
            res.send({
                success:1,
                data:data.rows,
                count:data.count
            })
        }else{
            res.send({
                success:0,
                message:messages.NO_RECORD_FOUND
            })
        }
    },error=>{
        console.log(error);
        res.send({
            success:0,
            message:messages.ERROR
        })
    })
}

exports.lead = function(req,res){
    // console.log(req.body);
    var offset;
    var limit;
    var lead_filter = {}

    var order_by
    var sort
    if(req.body.order_by == '' || req.body.order_by == null){
        order_by = [['created_at','DESC']];
    } else{
        order_by = [[req.body.order_by, req.body.sort]];
    }

    if(req.body.offset == '' || req.body.offset == null){
        offset = 0
    } else{
        offset = parseInt(req.body.offset)
    }
    if(req.body.limit == '' || req.body.limit == null){
        limit = 50
    } else{
        limit = parseInt(req.body.limit)
    }

    if (req.body.search != '' && req.body.search != null) {

        lead_filter[Op.or] = [{FirstName:{[Op.like]:'%'+req.body.search+'%'}},
                                {LastName:{[Op.like]:'%'+req.body.search+'%'}},
                                {Email:{[Op.like]:'%'+req.body.search+'%'}},
                                {IdNumber:{[Op.like]:'%'+req.body.search+'%'}},
                                {CellNumber:{[Op.like]:'%'+req.body.search+'%'}},
                                {Email:{[Op.like]:'%'+req.body.search+'%'}},
                                {HomeAddress:{[Op.like]:'%'+req.body.search+'%'}},
                                {HomeNumber:{[Op.like]:'%'+req.body.search+'%'}}
                            ];
    }

    Model.Lead.findAndCountAll({
        order:order_by,
        where:lead_filter,
        limit:limit,
        offset:offset
    }).then(data=>{
        if (data) {
            res.send({
                success:1,
                data:data.rows,
                count:data.count
            })
        }else{
            res.send({
                success:0,
                message:messages.NO_RECORD_FOUND
            })
        }
    },error=>{
        console.log(error);
        res.send({
            success:0,
            message:messages.ERROR
        })
    })
}

exports.lead_add = function(req,res){
    // console.log(req.body)
    
    if(req.body.LastName == '' || req.body.LastName == null || req.body.FirstName == '' || req.body.FirstName == null
     || req.body.IdNumber == '' || req.body.IdNumber == null){
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Lead.create(
            req.body
        ).then(data=>{
            res.send({
                success:1,
                message:'Lead added successfully.',
                data:data
            });

        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.lead_status = function(req,res){
    if (req.body.id=='' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Lead.findOne({
            where:{
                id:req.body.id
            }
        }).then(data=>{
            if (data!='' && data!=null && data.id != req.body.id) {
                res.send({
                    success:0,
                    message:messages.ERROR
                })
            }else{
                data.update({
                    status:req.body.status,
                    updated_at:new Date()
                }).then(updated_data=>{
                    res.send({
                        success:1,
                        message:"Lead updated successfully",
                        data:updated_data
                    })
                },error=>{
                    console.log(error);
                    res.send({
                        success:0,
                        message:messages.ERROR
                    })
                })
            }
        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.broker = function(req,res){
    // console.log(req.body);
    var offset;
    var limit;
    var search_filter = {}

    var order_by
    var sort
    if(req.body.order_by == '' || req.body.order_by == null){
        order_by = [['created_at','DESC']];
    } else{
        order_by = [[req.body.order_by, req.body.sort]];
    }

    if(req.body.offset == '' || req.body.offset == null){
        offset = 0
    } else{
        offset = parseInt(req.body.offset)
    }
    if(req.body.limit == '' || req.body.limit == null){
        limit = 50
    } else{
        limit = parseInt(req.body.limit)
    }

    if (req.body.option != '' && req.body.option != null && req.body.search != '' && req.body.search != null) {
        console.log(req.body.option)
        if (req.body.option=='first_name') {
            search_filter.first_name = {[Op.like]:'%'+req.body.search+'%'};
        }else if(req.body.option=='last_name') {
            search_filter.last_name = {[Op.like]:'%'+req.body.search+'%'};
        }else if(req.body.option=='email') {
            search_filter.email = {[Op.like]:'%'+req.body.search+'%'};
        }
    }
    search_filter.type='user';

    Model.User.findAndCountAll({
        attributes: ['id','type', 'first_name', 'last_name','email','status','broker_number','company'],
        order:order_by,
        where:search_filter,
        // where:{
        //     // lead_filter,
        //     type:'user'
        // },
        limit:limit,
        offset:offset
    }).then(data=>{
        if (data) {
            res.send({
                success:1,
                data:data.rows,
                count:data.count
            })
        }else{
            res.send({
                success:0,
                message:messages.NO_RECORD_FOUND
            })
        }
    },error=>{
        console.log(error);
        res.send({
            success:0,
            message:messages.ERROR
        })
    })
}


exports.companies = function (req, res) {
    // console.log(req.body);
    // console.log(req.files);
    
    Model.Company.findAll({
        
    }).then(data=>{
        if (data) {
            res.send({
                success:1,
                data:data
            })
        }else{
            res.send({
                success:0,
                message:messages.NO_RECORD_FOUND
            })
        }
    },error=>{
        console.log(error);
        res.send({
            success:0,
            message:messages.ERROR
        })
    })
}

exports.broker_codes = function (req, res) {
    console.log(req.body);
    // console.log(req.files);
    if (req.body.company_id == '' || req.body.company_id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.BrokerCode.findAll({
            where:{
                company_id:req.body.company_id
            }
            
        }).then(data=>{
            if (data) {
                res.send({
                    success:1,
                    data:data
                })
            }else{
                res.send({
                    success:0,
                    message:messages.NO_RECORD_FOUND
                })
            }
        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.broker_appointment = function(req,res){
    console.log(req.body);
    // console.log('form----------',req.body.form);
    // console.log('investor_id----------',req.body.form.investor_id);
    if (req.body.investor_id== '' || req.body.investor_id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{

        

        Model.InvestorBrokerAppointment.create({
            
            investor_id:req.body.investor_id,
            DateSigned:req.body.DateSigned,
            company_id:req.body.form.company_id,
            broker_code_id:req.body.form.broker_code_id,
            OwnerInsured:req.body.form.OwnerInsured,
            PostalAddress:req.body.form.PostalAddress,
            IdNumber:req.body.form.IdNumber,
            HomeNumber:req.body.form.HomeNumber,
            WorkNumber:req.body.form.WorkNumber,
            CellNumber:req.body.form.CellNumber,
            Email:req.body.form.Email,
            
        }).then(data=>{
            

            if (req.body.image) {
                var image = Math.random().toString(36).slice(-8)+'.png';
                try {
                    
                    const base64Data = req.body.image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                    
                    fs.writeFileSync(BrokerAppointmentSignBasePath+image, base64Data,  {encoding: 'base64'});
                    data.update({
                        Signature: image
                    });
                }catch (err) {
                    console.log(err)
                }
            }

            res.send({
                success:1,
                message:'Broker appointment inserted successfully.',
                data:data
            });
            
        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })       
    }
}


exports.single_investor = function (req, res) {
    // console.log(req.body);
    // console.log(req.files);
    if (req.body.id == '' || req.body.id == null) {
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        })
    }else{
        Model.Investor.findOne({
            where:{
                id:req.body.id
            },
            include:[
                {
                    model:Model.InvestorChildren,
                    as:'investor_childrens'
                },
                {
                    model:Model.InvestorBeneficiary,
                    as:'investor_beneficiaries'
                },
                {
                    model:Model.InvestorDocument,
                    as:'investor_documents'
                },
                {
                    model:Model.InvestorBrokerAppointment,
                    as:'investor_broker_appointments'
                },
            ],
            
        }).then(data=>{
            if (data) {
                res.send({
                    success:1,
                    data:data
                })
            }else{
                res.send({
                    success:0,
                    message:messages.NO_RECORD_FOUND
                })
            }
        },error=>{
            console.log(error);
            res.send({
                success:0,
                message:messages.ERROR
            })
        })
    }
}

exports.forgot_password = function(req, res){
    
    if(req.body.email == null || req.body.email == ''){
        res.send({
            success:0,
            message:messages.REQUIRED_FIELDS_ERROR
        });
    } else{
        Model.User.findOne({
            where:{
                email: req.body.email,
                type:req.body.type,
            }
        }).then(data=>{
            if(data == '' || data == null){
                res.send({
                    success:0,
                    message:messages.EMAIL_NOT_EXIST
                })
            } else{
                var value         = {};
                var random_no     = Math.floor(Math.random()*90000) + 10000;
                // var user_id       = base64.encode(data.id);
                var user_id       = data.id;
                
                //encoding
                // var security_code = base64.encode(random_no);
                // var saltRounds = 10;

                // var security_code = bcrypt.hashSync(random_no.toString(), saltRounds);
                var security_code = Math.random().toString(36).slice(-8);
                

                
                value.security_code = security_code;
                data.update(value).then(updated_data =>{
                    if (updated_data) {

                        var middle=''
                        if (updated_data.type=='user') {
                            middle='/#/set-password'
                        }else{
                            middle='/#/officer-set-password'
                        }
                        var user_data = {
                            first_name:updated_data.first_name,
                            last_name:updated_data.last_name,
                            email:updated_data.email,
                            set_password_url:serverPath+middle+'/'+user_id+'/'+security_code,
                            logoPath:serverPath+'/'+"assets/img/logo.png",
                            year:new Date().getFullYear()
                        }
                        
                        var email = updated_data.email;
                        var subject = 'Reset Password';
                        var template = 'forgot_password';

                        // var mailstatus= send_email(email,subject,template,user_data)

                        app.mailer.send(template, {
                            // to:'promatics.ajeet.kumar@gmail.com',
                            to:email,
                            subject: subject,
                            user:user_data
                          }, function (err,message) {
                            if (err) {
                                  console.log(err);
                                  res.send({
                                       success:0,
                                       message:messages.ERROR
                                  });
                                return;
                            }else{
                                console.log('sent')
                                res.send({
                                    success:1,
                                    message:'Email sent successfully to your registered email address.'
                                });
                                return;
                            }
                        });

                        
                    }else{
                        res.send({
                             success:0,
                             message:messages.ERROR
                        });
                    }

                },error=>{
                    console.log(error);
                    res.send({
                         success:0,
                         message:messages.ERROR,
                    });
                });
            }
        },error=>{
            console.log(error);
            res.send({
                 success:0,
                 message:messages.ERROR,
            });
        });
    }
}

exports.set_password = function(req,res){
    if (req.body.password == '' || req.body.confirm_password == '' || req.body.type=='') {
        res.send({
            success:0,
            message:REQUIRED_FIELDS_ERROR
        });
    }else if(req.body.password.length < 6){
        // console.log(req.body.password);
        // console.log(req.body.confirm_password);
        res.send({
            success:0,
            message:'Password must be at least 6 characters long'
        }); 
    }else{
        if(req.body.password == req.body.confirm_password){
            // var user_id = req.params.user_id;
            Model.User.findOne({
                where:{
                    id:req.body.id,
                    type:req.body.type
                    // deleted_at:null
                }
            }).then((data)=>{
                if (data == '' || data == null) {
                    res.send({
                        success:0,
                        message:'This user does not exist'
                    })
                }else{
                    if (req.body.security_code==data.security_code) {

                        var hashPassword = '';
                        var saltRounds = 10;
                        hashPassword = bcrypt.hashSync(req.body.password.toString(), saltRounds);

                        data.update({
                            password:hashPassword,
                            security_code:null,
                            updated_at:new Date()
                        }).then((updated)=>{
                            res.send({
                                success:1,
                                message:'Password reset successfully'
                            })
                        },error=>{
                            res.send({
                                success:0,
                                message:ERROR
                            })
                        });
                    }else{
                        res.send({
                            success:0,
                            message:'This link has been used already'
                        })
                        
                    }
                }
            });
        
        }else{    
            // console.log(req.body.password);
            // console.log(req.body.confirm_password);
            res.send({
                success:0,
                message:'Password and confirm password does not matched'
            });
        }
    }  
}
