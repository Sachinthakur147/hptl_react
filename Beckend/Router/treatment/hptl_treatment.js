const express = require('express');

const {treatGet,treatPost,treatUpdate,treatDelete} =require('../../Controller/hptl_treatment/treatment');


const treatment =express.Router();

treatment.get('/hptl/treatment',treatGet);
treatment.post('/hptl/treatment',treatPost);
treatment.put('/hptl/treatment/:p_id',treatUpdate);
treatment.delete('/hptl/treatment/:p_id',treatDelete);


module.exports={treatment};