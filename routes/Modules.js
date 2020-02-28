const express = require("express");
const modes = express.Router();
const cors = require("cors");


const Mode = require("../models/Module.js");
modes.use(cors());


//read
modes.get('/all', async (req, res) => {

    await Mode.findAll()
    .then(mode => {
       res.json({status: true, rows: mode});
    })
    .catch(err => {
        //res.send('error: '+ err);
        res.send({status: false, code: 500, error: 'เกิดข้อผิดพลาดในการเรียกดูข้อมูล'});
    });

});

modes.get('/getmodes', async (req, res) => {

    await Mode.findAll()
    .then(mode => {
       res.json({status: true, rows: mode});
    })
    .catch(err => {
        //res.send('error: '+ err);
        res.send({status: false, code: 500, error: 'เกิดข้อผิดพลาดในการเรียกดูข้อมูล'});
    });

});



modes.post('/', async (req, res) => {

    const moduleName = req.body.moduleName;
    const is_enable = req.body.is_enable;
    if(moduleName){

       const data = {
            moduleName : moduleName,
            is_enable : is_enable
            }
           await Mode.create(data)
           .then(mode => {
               if(mode){
                   res.send({status: true});
               }else{
                   res.send({status: false});
               }
            })
            .catch(err => {
                   // res.send('error: ' + err);
                    res.send({status: false, code: 500, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'});
            });
        
    } else {
        res.send({ok: false, error: 'ข้อมูลไม่มีจ๊ะ'});
    }
});

modes.put('/:moduleID', async (req, res) => {

    const moduleName = req.body.moduleName;
    const is_enable = req.body.is_enable;

    const moduleID = req.params.moduleID;

    if(moduleName && moduleID){

       const data = {

            moduleName : moduleName,
            is_enable : is_enable

            }

           await Mode.update(data, { where: {moduleID: moduleID}})
           .then(mode => {
               if(mode){
                   res.send({status: true});
               }else{
                   res.send({status: false});
               }
            })
            .catch(err => {
                   // res.send('error: ' + err);
                    res.send({status: false, code: 500, error: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล'});
            });
        
    } else {
        res.send({ok: false, error: 'ข้อมูลไม่มีจ๊ะ'});
    }
});

modes.delete('/:moduleID', async (req, res) => {

    const moduleID = req.params.moduleID;

    if(moduleID){

        await Mode.destroy({ where: {moduleID: moduleID}})
           .then(mode => {
               if(mode){
                   res.send({status: true});
               }else{
                   res.send({status: false});
               }
            })
            .catch(err => {
                   // res.send('error: ' + err);
                    res.send({status: false, code: 500, error: 'เกิดข้อผิดพลาดในการลบข้อมูล'});
            });
        
    } else {
        res.send({ok: false, error: 'ข้อมูลไม่มีจ๊ะ'});
    }
});

module.exports = modes;