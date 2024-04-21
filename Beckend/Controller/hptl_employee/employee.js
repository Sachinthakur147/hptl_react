const connection = require('../../Model/db_config')

const empGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_employee`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("employee data not here..")
               res.send(err)
          }else{
               console.log("employee data is here..")
               res.send(result)
          }
     })
}

const emp_Getdata = (req,res)=>{

     const dept_id = req.params.emp_id;
     const sql =`select *from hptl_employee where emp_id = ?`
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

const empPost = (res,req)=>{
     let em_Data = req.body;
     const sql =`INSERT INTO hptl_employee SET ?`
     connection.query(sql,[em_Data],(err,result)=>{
          if(err){
               console.log('Emp not getting...')
               res.json(err)
          }else{
               console.log('Emp is getting...')
               res.json(result)
          }
     })
}

const empUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.emp_id;
     const sql =`UPDATE hptl_employee SET WHERE emp_id = ?`;
     connection.query(sql,[data,emp_id],(err,result)=>{
          if(err){
               console.log('Emp not getting...')
               res.json(err)
          }else{
               console.log('Emp is getting...')
               res.json(result)
          }
     })
}

const empDelete = (res,req)=>{
     const em_pro = req.params.emp_id;
     const sql =`DELETE from hptl_employee WHERE emp_id = ?`
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

module.exports={empGet,empPost,empUpdate,empDelete,emp_Getdata}