const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = 'ot';

const today = new Date();
   

users.post('/register', (req, res) => {
    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.email,
        created: today,
        personID: req.body.personID
    }
    User.findOne({
        where: {
            personID : req.body.personID
        }
    }).then(function(user){
        if(!user){
            const salt = bcrypt.genSaltSync(10);
            const password = userData.password; 
            const hash = bcrypt.hashSync(password, salt);
            userData.password = hash;

              
            User.create(userData)
            .then(user => {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1400
                });
                res.json({token:token});
            })
            .catch(err => {
                res.send('error: '+ error);
            });
        }else{
            res.send({error: 'User already exists'});
        }
    })
    .catch(err => {
        res.send('error: '+ err);
    });

});


users.post('/login2', (req, res) => {
    
    User.findOne({
        where: {
            personID :req.body.personID
        }
    })
    .then(user =>{
       res.send(req);
    })
    .catch(err => {
        res.send('error: '+ err);
    });

});

// find one user
users.post('/login', (req, res) => {
    User.findOne(
        {
            where: { personID: req.body.personID, },
        })
    .then(user => res.json(user))
    .catch(err => res.send('error:' + err));
});


users.post('/regis', (req, res) => {
    const today = new Date();
    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.email,
        created: today,
        personID: req.body.personID
    }

    User.findOne(
        {
            where: { personID: req.body.personID, },
        })
    .then(user => res.json(user));
});

users.get('/profile', (req, res) => {
    User.findOne({
        where: {
            personID: req.body.personID
        }
    }).then(user =>{
        if(user){
            res.json(user);
        }else{
            res.send('User does not exist');
        }
    }).catch(err => {
        res.send('error: ' + err);
    });
});

module.exports = users;