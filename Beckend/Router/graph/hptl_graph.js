const express =require('express')

const {earningGet} =require('../../Controller/graph/earning_gp')

const graph =express.Router();

graph.get('/hptl/grapg',earningGet);
// department.get('/hptl/department/:dept_id',deptGetdata);
// department.post('/hptl/department',deptPost);
// department.put('/hptl/department/:dept_id',deptUpdate);
// department.delete('/hptl/department/:dept_id',deptDelete);

module.exports={graph};