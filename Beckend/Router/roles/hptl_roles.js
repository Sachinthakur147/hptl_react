const express = require('express');

const {roleGet,rolePost,roleUpdate,roleDelete,roleGetdata} =require('../../Controller/hptl_roles/roles')


const role =express.Router();

role.get('/hptl/role',roleGet);
role.get('/hptl/role/:roll_id',roleGetdata);
role.post('/hptl/role',rolePost);
role.put('/hptl/role/:roll_id',roleUpdate);
role.delete('/hptl/role/:roll_id',roleDelete);


module.exports={role};