const express = require('express');

const {RA_Get,RA_Post,RA_Update,RA_Delete} =require('../../Controller/role_assign/role_assign')


const role_assign =express.Router();

role_assign.get('/hptl/role_assign',RA_Get);
role_assign.post('/hptl/role_assign',RA_Post);
role_assign.put('/hptl/role_assign/:emp_id',RA_Update);
role_assign.delete('/hptl/role_assign/:emp_id',RA_Delete);


module.exports={role_assign};