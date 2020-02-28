const Sequelize = require('sequelize');
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    'mis_module',
    {
        moduleID:{
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        moduleName:{
            type: Sequelize.STRING
        },
        is_enable:{
            type: Sequelize.STRING(1)
        }

    },
    {
        timestamps : false
    }

);