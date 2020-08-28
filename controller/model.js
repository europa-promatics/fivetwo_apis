var Sequelize = require('sequelize');
var config    = require('../config.json');
var bcrypt 	  = require('bcryptjs');
// var Instance = require('./node_modules/sequelize/lib/instance.js');
// const Model = Sequelize.Model

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.user,
    config.dev.password,{
        logging: console.log,
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true  // prevent sequelize from pluralizing table names
        }, 
        // operatorsAliases: false,
    }
);

// const PROTECTED_ATTRIBUTES = ['password', 'token']

// class User extends Model {
//   toJSON () {
//     // hide protected fields
//     let attributes = Object.assign({}, this.get())
//     for (let a of PROTECTED_ATTRIBUTES) {
//       delete attributes[a]
//     }
//     return attributes
//   }
// }
exports.User = sequelize.define('users',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    type:{
        type:Sequelize.ENUM('user','officer'),
        defaultValue:'user',
        allowNull:true
    },
    first_name:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    last_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING(100),
    },
    // image:{
    //     type:Sequelize.STRING(100),
    //     allowNull:true
    // },
    password:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:null
    },
    status:{
        type:Sequelize.ENUM('active','inactive'),
        defaultValue:'A',
        allowNull:true
    },
    security_code:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    // deleted_at:{
    //     type:Sequelize.DATE,
    //     allowNull:true,
    // },
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'users'});

exports.Investor = sequelize.define('investors',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    broker_id:{
        type:Sequelize.BIGINT,
        allowNull:true,
        defaultValue:null
    },
    type:{
        type:Sequelize.ENUM('investor','spouse'),
        allowNull:true
    },
    investor_number:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    spouse_id:{
        type:Sequelize.BIGINT,
        allowNull:true,
        defaultValue:null
    },
    UploadId:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    DisclosureName:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    DisclosureDate:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    DisclosureAgree:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    DisclosureSign:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RiskProfilerClientSignature:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RiskProfilerAdvisorSignature:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Year1:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Year2:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Year3:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Year4:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Year5:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Year6:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceDate:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceClient:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceAdvisor:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceSummaryOfDiscussionWithClient:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceSummaryOfAdviceFromAdvisor:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceOfAdvisorTaken:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceOfAdvisorExplain:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceClientSignature:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    RecordAdviceAdvisorSignature:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    LastName:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    FirstName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    IdNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    CellNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Email:{
        type:Sequelize.STRING(100),
        allowNull:true
    },
    HomeNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    WorkNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    HomeAddress:{
        type:Sequelize.STRING,
        allowNull:true
    },
    PostalAddress:{
        type:Sequelize.STRING,
        allowNull:true
    },
    TaxNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    MaritalStatus:{
        type:Sequelize.STRING,
        allowNull:true
    },
    BankName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    BankNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    AccountType:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Note:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    
    // password:{
    //     type:Sequelize.STRING,
    //     allowNull:true,
    //     defaultValue:null
    // },
    // status:{
    //     type:Sequelize.ENUM('active','inactive'),
    //     defaultValue:'A',
    //     allowNull:true
    // },
    // security_code:{
    //     type:Sequelize.STRING,
    //     defaultValue:null
    // },
    // deleted_at:{
    //     type:Sequelize.DATE,
    //     allowNull:true,
    // },
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'investors'});


exports.InvestorChildren = sequelize.define('investor_childrens',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    investor_id:{
        type:Sequelize.INTEGER,
        defaultValue:null,
        allowNull:true,
    },
    FullName:{
        type:Sequelize.STRING,
    },
    IdNumber:{
        type:Sequelize.STRING,
    },
    CellNumber:{
        type:Sequelize.STRING,
    },
    Email:{
        type:Sequelize.STRING,
    },
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'investor_childrens'});

exports.InvestorBeneficiary = sequelize.define('investor_beneficiaries',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    investor_id:{
        type:Sequelize.INTEGER,
        defaultValue:null,
        allowNull:true,
    },
    FullName:{
        type:Sequelize.STRING,
    },
    Relationship:{
        type:Sequelize.STRING,
    },
    CellNumber:{
        type:Sequelize.STRING,
    },
    Percent:{
        type:Sequelize.STRING,
    },
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'investor_beneficiaries'});

exports.Lead = sequelize.define('leads',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    FirstName:{
        type:Sequelize.STRING,
    },
    LastName:{
        type:Sequelize.STRING,
    },
    IdNumber:{
        type:Sequelize.STRING,
    },
    CellNumber:{
        type:Sequelize.STRING,
    },
    Email:{
        type:Sequelize.STRING,
    },
    HomeAddress:{
        type:Sequelize.STRING,
    },
    HomeNumber:{
        type:Sequelize.STRING,
        defaultValue:null,
        allowNull:true,
    },
    MaritalStatus:{
        type:Sequelize.STRING,
        defaultValue:null,
        allowNull:true,
    },
    Note:{
        type:Sequelize.TEXT,
        defaultValue:null,
        allowNull:true,
    },
    status:{
        type:Sequelize.ENUM('visitor','client','called','cancelled'),
        defaultValue:'visitor',
        allowNull:true
    },
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'leads'});

exports.InvestorDocument = sequelize.define('investor_documents',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    investor_id:{
        type:Sequelize.BIGINT,
    },
    upload_id:{
        type:Sequelize.STRING,
    },
    
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'investor_documents'});

exports.Company = sequelize.define('companies',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.BIGINT,
    },
    
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'companies'});

exports.BrokerCode = sequelize.define('broker_codes',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    company_id:{
        type:Sequelize.BIGINT,
    },
    name:{
        type:Sequelize.STRING,
    },
    
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'broker_codes'});

exports.InvestorBrokerAppointment = sequelize.define('investor_broker_appointments',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    investor_id:{
        type:Sequelize.BIGINT,
    },
    company_id:{
        type:Sequelize.BIGINT,
    },
    broker_code_id:{
        type:Sequelize.BIGINT,
    },
    OwnerInsured:{
        type:Sequelize.STRING,
    },
    PostalAddress:{
        type:Sequelize.STRING,
        defaultValue:null,
        allowNull:true,
    },
    IdNumber:{
        type:Sequelize.STRING,
    },
    HomeNumber:{
        type:Sequelize.STRING,
        defaultValue:null,
        allowNull:true,
    },
    WorkNumber:{
        type:Sequelize.STRING,
        defaultValue:null,
        allowNull:true,
    },
    CellNumber:{
        type:Sequelize.STRING,
    },
    Email:{
        type:Sequelize.STRING,
    },
    DateSigned:{
        type:Sequelize.STRING,  
    },
    Signature:{
        type:Sequelize.STRING,  
        defaultValue:null,
        allowNull:true,
    },
    created_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    },
    updated_at:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW(0)
    }  
},{tableName:'investor_broker_appointments'});

