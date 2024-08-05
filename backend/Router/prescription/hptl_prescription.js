const express = require('express');

const {presGet,presPost,presUpdate,presDelete} =require('../../Controller/hptl_prescription/prescription')


const prescription =express.Router();

prescription.get('/hptl/prescription',presGet);
prescription.post('/hptl/prescription',presPost);
prescription.put('/hptl/prescription/:p_id',presUpdate);
prescription.delete('/hptl/prescription/:p_id',presDelete);


module.exports={prescription};