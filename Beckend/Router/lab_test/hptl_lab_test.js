const express = require('express');

const {testGet,testPost,testUpdate,testDelete} =require('../../Controller/hptl_lab_test_price/lab_test')

const test = express.Router();

test.get('/hptl/test',testGet);
test.post('/hptl/test',testPost);
test.put('/hptl/test/:test_id',testUpdate);
test.delete('/hptl/test/:test_id',testDelete);


module.exports={test};