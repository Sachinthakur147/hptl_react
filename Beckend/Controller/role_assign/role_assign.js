const connection = require('../../Model/db_config')

const RA_Get =(req,res)=>{
     const sql =`SELECT *FROM hptl_role_assign`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("role data not here..")
               res.send(err)
          }else{
               console.log("role data is here..")
               res.send(result)
          }
     })
}


const RA_Post = (res,req)=>{
     let em_Data = req.body;
     const sql =`INSERT INTO hptl_role_assign SET ?`
     connection.query(sql,[em_Data],(err,result)=>{
          if(err){
               console.log('role data not getting...')
               res.json(err)
          }else{
               console.log('role data is getting...')
               res.json(result)
          }
     })
}

const RA_Update = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.emp_id;
     const sql =`UPDATE hptl_role_assign SET WHERE emp_id = ?`;
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

const RA_Delete = (res,req)=>{
     const lab = req.params.emp_id;
     const sql =`DELETE from hptl_role_assign WHERE emp_id = ?`
     connection.query(sql,lab,(err,result)=>{
          if(err){
               console.log('role data not getting...')
               res.json(err)
          }else{
               console.log('role data is getting...')
               res.json(result)
          }
     })
}

module.exports={RA_Get,RA_Post,RA_Update,RA_Delete}