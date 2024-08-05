const express = require('express');

const {labsGet,labGetData,labsPost,labsUpdate,labsDelete} =require('../../Controller/hptl_labs/labs')


const labs =express.Router();

labs.get('/hptl/lab',labsGet);
labs.get('/hptl/labget/:lab_id',labGetData);
labs.post('/hptl/lab',labsPost);
labs.put('/hptl/lab/:lab_id',labsUpdate);
labs.delete('/hptl/lab/:lab_id',labsDelete);


module.exports={labs};