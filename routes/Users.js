const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Op } = require("sequelize");


const userModel = require("../models/User.js");

router.use(cors());

// insert Data
router.post('/', async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const personID = req.body.personID;
    const payrollID = req.body.payrollID;
    const active = req.body.active;



    if (personID) {
        userModel.create({
            personID: personID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            payrollID: payrollID,
            active: active
        })
            .then(() => {
                res.send({ status: true, code: 200 });
            })
            .catch(() => {
                res.send({ status: false, code: 500, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
            });

    } else {
        res.send({ ok: false, error: 'ข้อมูลไม่มีจ๊ะ' });
    }
});


//call total
router.get('/', async (req, res) => {
    const offset = +req.query.offset || 0;
    const limit = +req.query.limit || 10;
    const query = req.query.query || '';
    console.log(query);
    if (query) {

         userModel.findAndCountAll({
             attributes: ['personID', 'payrollID', 'firstName', 'lastName', 'email', 'active'],
             where: {
                 [Op.or]:[
                 {firstName: {
                     [Op.like]: query+'%'
                 }},
                {lastName: {
                     [Op.like]: query+'%'
                 }},
                 {email: {
                     [Op.like]: query+'%'
                 }}
                ]
             },
             limit: limit, 
             offset: offset
         }) 
            .then(user => {
                res.send({ status: true, code: 200, datas: user });
            })
            .catch(err => {
                //res.send('error: '+ err);
                res.send({ status: false, code: 500, error: 'เกิดข้อผิดพลาดในการเรียกดูข้อมูล' });
            });
    } else {
        userModel.findAndCountAll({
            attributes: ['personID', 'payrollID', 'firstName', 'lastName', 'email', 'active'],
            limit: limit,
            offset: offset
        })
            .then(user => {
                res.send({ status: true, code: 200, datas: user });
            })
            .catch(err => {
                //res.send('error: '+ err);
                res.send({ status: false, code: 500, error: 'เกิดข้อผิดพลาดในการเรียกดูข้อมูล' });
            });

    }

});

// call view data by case
router.get('/:id', async (req, res) => {
    const personID = req.params.id;
    userModel.findAll({
        attributes: ['personID', 'payrollID', 'firstName', 'lastName', 'email', 'active'],
        where: { personID: personID }
    })
        .then(user => {
            res.send({ status: true, code: 200, datas: user });
        })
        .catch(err => {
            res.send({ status: false, code: 500, error: 'เกิดข้อผิดพลาดในการเรียกดูข้อมูล' });
        });
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;


    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const active = req.body.active;

    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        active: active
    }

    userModel.update(data, {
        where: {
            personID: id
        }
    })
        .then(() => {
            res.send({ status: true, code: 200 });
        });
});

router.delete('/:id', async (req, res) => {

    const personID = req.params.id;

    userModel.destroy({
        where: {
            personID: personID
        }
    })
        .then(() => {
            res.send({ status: true, code: 200 });
        });
});


module.exports = router;