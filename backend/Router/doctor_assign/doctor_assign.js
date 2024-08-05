const express = require('express');

const {DA_Get,DA_Post,DA_Update,DA_Delete,DA_byId} =require('../../Controller/assign_doctor/hptl_assign_doctor')


const doctor_assign =express.Router();

doctor_assign.get('/hptl/doc_assign',DA_Get);
doctor_assign.get('/hptl/doc_assign/:id',DA_byId);
doctor_assign.post('/hptl/doc_assign',DA_Post);
doctor_assign.put('/hptl/doc_assign/:id',DA_Update);
doctor_assign.delete('/hptl/doc_assign/:id',DA_Delete);


module.exports={doctor_assign};