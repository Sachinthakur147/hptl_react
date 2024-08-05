const connection = require('../../Model/db_config')

const testGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_lab_test_price`;
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


const testPost = (res,req)=>{
     let em_Data = req.body;
     const sql =`INSERT INTO hptl_lab_test_price SET ?`
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

const testUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.test_id;
     const sql =`UPDATE hptl_lab_test_price SET WHERE test_id = ?`;
     connection.query(sql,[data,emp_id],(err,result)=>{
          if(err){
               console.log('test not getting...')
               res.json(err)
          }else{
               console.log('test is getting...')
               res.json(result)
          }
     })
}

const testDelete = (res,req)=>{
     const test = req.params.test_id;
     const sql =`DELETE from hptl_lab_test_price WHERE test_id = ?`
     connection.query(sql,test,(err,result)=>{
          if(err){
               console.log('test not getting...')
               res.json(err)
          }else{
               console.log('test is getting...')
               res.json(result)
          }
     })
}

module.exports={testGet,testPost,testUpdate,testDelete};