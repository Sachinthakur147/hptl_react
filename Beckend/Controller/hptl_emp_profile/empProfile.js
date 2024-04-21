// const { response } = require('express')
const connection = require('../../Model/db_config')

const em_profileGet = (res,req)=>{
     const sql =`select *from hptl_emp_profile`
     connection.query(sql,(err,result)=>{
          if(err){
               console.log('Emp profile not getting...')
               res.json(err)
          }else{
               console.log('Emp profile is getting...')
               res.json(result)
          }
     })
}

const emp_profileGetdata = (req,res)=>{

     const dept_id = req.params.emp_id;
     const sql =`select *from hptl_emp_profile where emp_id = ?`
     connection.query(sql,[dept_id],(err,result)=>{
          if(err){
               console.log('dept data not getting...')
               res.json(err);
          }else{
               console.log('dept data getting succefully....')
               res.json(result)
          }
     })
}

const em_profilePost = (res,req)=>{
     let em_prData = req.body;
     const sql =`INSERT INTO hptl_emp_profile SET ?`
     connection.query(sql,[em_prData],(err,result)=>{
          if(err){
               console.log('Emp profile not getting...')
               res.json(err)
          }else{
               console.log('Emp profile is getting...')
               res.json(result)
          }
     })
}

const em_profileUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.body
     const sql =`UPDATE hptl_emp_profile SET WHERE emp_id = ?`;
     connection.query(sql,[data,emp_id],(err,result)=>{
          if(err){
               console.log('Emp profile not getting...')
               res.json(err)
          }else{
               console.log('Emp profile is getting...')
               res.json(result)
          }
     })
}

const em_profileDelete = (res,req)=>{
     const em_pro = req.params.emp_id;
     const sql =`DELETE from hptl_emp_profile WHERE emp_id = ?`
     connection.query(sql,em_pro,(err,result)=>{
          if(err){
               console.log('Emp profile not getting...')
               res.json(err)
          }else{
               console.log('Emp profile is getting...')
               res.json(result)
          }
     })
}


module.exports={em_profileGet,em_profilePost,em_profileUpdate,em_profileDelete,emp_profileGetdata}