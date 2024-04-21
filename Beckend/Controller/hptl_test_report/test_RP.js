const connection = require('../../Model/db_config')

const reportGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_test_report`;
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


const reportPost = (res,req)=>{
     let em_Data = req.body;
     const sql =`INSERT INTO hptl_test_report SET ?`
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

const reportUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.test_id;
     const sql =`UPDATE hptl_test_report SET WHERE test_id = ?`;
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

const reportDelete = (res,req)=>{
     const lab = req.params.test_id;
     const sql =`DELETE from hptl_test_report WHERE test_id = ?`
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

module.exports={reportGet,reportPost,reportUpdate,reportDelete}