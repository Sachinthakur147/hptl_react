const express = require('express');
let multer = require('multer');
const path = require('path');
let multer_S3 =require('multer-s3');
const {S3Client} = require("@aws-sdk/client-s3")



const {patientGet,patientPost,patientUpdate,patientDelete,patientGetData} =require('../../Controller/hptl_patient/patient')


const patient =express.Router();

const bucketName ="manish123412"
const s3 = new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:"AKIAYS2NWDYHWBIHGZPA",
        secretAccessKey:"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"
    }
})
const storage = multer_S3({
     s3: s3,
     bucket: bucketName,
     acl: "public-read",
     metadata: (req, file, cb) => {
         cb(null, { fieldName: file.fieldname });
     },
     contentType: multer_S3.AUTO_CONTENT_TYPE,
     key: (req, file, cb) => {
         cb(null, file.originalname);
     }
 });
 
 let upload = multer({ storage: storage });


patient.get('/hptl/patient',patientGet);
patient.get('/hptl/patient/:p_id',patientGetData);
patient.post('/hptl/patient',upload.single('image'),patientPost);     
patient.put('/hptl/patient/:p_id',patientUpdate);
patient.delete('/hptl/patient/:p_id',patientDelete);


module.exports={patient};