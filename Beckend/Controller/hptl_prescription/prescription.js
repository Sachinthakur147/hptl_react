const connection = require('../../Model/db_config')

const presGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_prescription`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("prescription data not here..")
               res.send(err)
          }else{
               console.log("prescription data is here..")
               res.send(result)
          }
     })
}


const presPost = (res,req)=>{
     let em_Data = req.body;
     const sql =`INSERT INTO hptl_prescription SET ?`
     connection.query(sql,[em_Data],(err,result)=>{
          if(err){
               console.log('prescription not getting...')
               res.json(err)
          }else{
               console.log('prescription is getting...')
               res.json(result)
          }
     })
}

const presUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.p_id;
     const sql =`UPDATE hptl_patient SET WHERE p_id = ?`;
     connection.query(sql,[data,emp_id],(err,result)=>{
          if(err){
               console.log('prescription data not updating...')
               res.json(err)
          }else{
               console.log('prescription data updating...')
               res.json(result)
          }
     })
}

const presDelete = (res,req)=>{
     const lab = req.params.lab_id;
     const sql =`DELETE from hptl_prescription WHERE p_id = ?`
     connection.query(sql,lab,(err,result)=>{
          if(err){
               console.log('prescription not getting...')
               res.json(err)
          }else{
               console.log('prescription is getting...')
               res.json(result)
          }
     })
}

module.exports={presGet,presPost,presUpdate,presDelete}