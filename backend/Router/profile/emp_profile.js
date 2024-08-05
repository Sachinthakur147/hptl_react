const express = require('express');

const {em_profileGet,em_profilePost,em_profileUpdate,em_profileDelete,emp_profileGetdata} =require('../../Controller/hptl_emp_profile/empProfile')

const profile1 =express.Router();

profile1.get('/hptl/profile',em_profileGet);
profile1.get('/hptl/profid/:emp_id',emp_profileGetdata);
profile1.post('/hptl/profile',em_profilePost);
profile1.put('/hptl/profile/:emp_id',em_profileUpdate);
profile1.delete('/hptl/profile/:emp_id',em_profileDelete);


module.exports={profile1};