const express = require('express');

const {reportGet,reportPost,reportUpdate,reportDelete} =require('../../Controller/hptl_test_report/test_RP')


const report =express.Router();

report.get('/hptl/report',reportGet);
report.post('/hptl/report',reportPost);
report.put('/hptl/report/:test_id',reportUpdate);
report.delete('/hptl/report/:test_id',reportDelete);


module.exports={report};