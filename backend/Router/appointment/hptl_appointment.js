
const express = require('express');

const {appoinmentGet,appoinmentPost,appoinmentUpdate,appoinmentDelete,appoinmentGetdata,getDoctorDtl} =require('../../Controller/appoinment/appoinment')


const appointment =express.Router();

appointment.get('/hptl/appointment',appoinmentGet);
appointment.get('/hptl/doctor/dtl',getDoctorDtl);
appointment.get('/hptl/appointment/:id',appoinmentGetdata);
appointment.post('/hptl/appointment',appoinmentPost);
appointment.put('/hptl/appointment/:id',appoinmentUpdate);
appointment.delete('/hptl/appointment/:id',appoinmentDelete);


module.exports={appointment};