const express = require('express');

const {empGet,empPost,empUpdate,empDelete,emp_Getdata} =require('../../Controller/hptl_employee/employee')


const employee =express.Router();

employee.get('/hptl/employee',empGet);
employee.get('/hptl/emp/:emp_id',emp_Getdata);
employee.post('/hptl/epmloyee',empPost);
employee.put('/hptl/employee/:emp_id',empUpdate);
employee.delete('/hptl/employee/:emp_id',empDelete);


module.exports={employee};