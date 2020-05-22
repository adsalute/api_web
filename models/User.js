const Sequelize = require('sequelize');
const db = require("../database/db.js");



module.exports = db.sequelize.define(
    'mis_users',
    {   
        personID:{
            type: Sequelize.STRING(13),
            primaryKey:true
        },
        payrollID:{
            type: Sequelize.STRING(7)
        },
        firstName:{
            type: Sequelize.STRING
        },
        lastName:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        active:{
            type: Sequelize.STRING(1),
            defaultValue: "Y"
        }

    },
    {
        timestamps : false
    }

);