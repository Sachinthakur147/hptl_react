const express =require('express')

const {deptGet,deptPost,deptUpdate,deptDelete,deptGetdata} =require('../../Controller/hptl_department/department')

const department =express.Router();

department.get('/hptl/department',deptGet);
department.get('/hptl/department/:dept_id',deptGetdata);
department.post('/hptl/department',deptPost);
department.put('/hptl/department/:dept_id',deptUpdate);
department.delete('/hptl/department/:dept_id',deptDelete);

module.exports={department};