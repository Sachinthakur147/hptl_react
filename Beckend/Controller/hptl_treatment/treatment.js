const connection = require('../../Model/db_config')

const treatGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_treatment`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("report data not here..")
               res.send(err)
          }else{
               console.log("report data is here..")
               res.send(result)
          }
     })
}


const treatPost = (res,req)=>{
     let em_Data = req.body;
     const sql =`INSERT INTO hptl_treatment SET ?`
     connection.query(sql,[em_Data],(err,result)=>{
          if(err){
               console.log('report data not getting...')
               res.json(err)
          }else{
               console.log('report data is getting...')
               res.json(result)
          }
     })
}

const treatUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.test_id;
     const sql =`UPDATE hptl_treatment SET WHERE p_id = ?`;
     connection.query(sql,[data,emp_id],(err,result)=>{
          if(err){
               console.log('report data not getting...')
               res.json(err)
          }else{
               console.log('report data is getting...')
               res.json(result)
          }
     })
}

const treatDelete = (res,req)=>{
     const lab = req.params.p_id;
     const sql =`DELETE from hptl_treatment WHERE p_id = ?`
     connection.query(sql,lab,(err,result)=>{
          if(err){
               console.log('report data not getting...')
               res.json(err)
          }else{
               console.log('report data is getting...')
               res.json(result)
          }
     })
}

module.exports={treatGet,treatPost,treatUpdate,treatDelete}