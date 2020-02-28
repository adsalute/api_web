const Sequelize = require('sequelize');
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    'mis_user',
    {
        id:{
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
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
        created:{
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW
        },
        personID:{
            type: Sequelize.STRING(13)
        }

    },
    {
        timestamps : false
    }

);