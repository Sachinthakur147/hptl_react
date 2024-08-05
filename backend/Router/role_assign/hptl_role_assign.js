const express = require('express');

const {RA_Get,RA_Post,RA_Update,RA_Delete,RA_byId,RA_revock} =require('../../Controller/role_assign/role_assign')


const role_assign =express.Router();

role_assign.get('/hptl/role_assign',RA_Get);
role_assign.get('/hptl/role_assign/:emp_id',RA_byId);
role_assign.post('/hptl/role_assign',RA_Post);
role_assign.post('/hptl/role_assign/delete',RA_revock);
role_assign.put('/hptl/role_assign/:emp_id',RA_Update);
role_assign.delete('/hptl/role_assign/:emp_id',RA_Delete);


module.exports={role_assign};