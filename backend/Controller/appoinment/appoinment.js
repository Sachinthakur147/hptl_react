const connection = require('../../Model/db_config')

const appoinmentGet = (req,res)=>{
     const sql =`select *from hptl_appointment`
     connection.query(sql,(err,result)=>{
          if(err){
               console.log('appointment data not getting...')
               res.json(err);
          }else{
               console.log('appointment data getting succefully....')
               res.json(result)
          }
     })
}
const getDoctorDtl = (req,res)=>{
     const sql =`SELECT e.emp_id, e.emp_name FROM hptl_employee e JOIN hptl_role_assign ra ON e.emp_id = ra.emp_id JOIN hptl_roles r ON ra.roll_id = r.roll_id WHERE r.roll_name = 'Doctor'`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log('doctor data not getting...')
               res.json(err);
          }else{
               console.log('Doctor data getting succefully....')
               res.json(result)
          }
     })
}

const appoinmentGetdata = (req,res)=>{

     const id = req.params.id;
     const sql =`select *from hptl_appointment where id = ?`
     connection.query(sql,[id],(err,result)=>{
          if(err){
               console.log('appointment data not getting...')
               res.json(err);
          }else{
               console.log('appointment data getting succefully....')
               res.json(result[0])
          }
     })
}

const appoinmentPost = async (req,res)=>{
     let deptData = req.body;
     let sql =`insert into hptl_appointment set ?`
     connection.query(sql,deptData,(err,result)=>{
         if (err) {
                 console.log("Error occurred while adding department:", err);
                 res.status(500).json({ error: "An error occurred while adding appointment." });
             } else {
                 console.log('appointment added successfully.');
                 res.json({ success: true, message: "appointment added successfully.", data: result.data });
             }
     })
}

const appoinmentUpdate = (req,res)=>{
     const sql =`update hptl_appointment set ? where id = ?`
     const data =req.body;
     console.log(data)
     const id = req.params.id;
     connection.query(sql,[data,id],(err,result)=>{
          if(err){
               console.log('appointment data not updated...')
               res.json(err);
          }else{
               console.log('appointment data getting succefully....')
               res.json(result)
          }
     })
}

const appoinmentDelete = (req,res)=>{
     const sql = `delete from hptl_appointment where id = ?`

     const id =req.params.id;
     connection.query(sql,id,(err,result)=>{
          if(err){
               console.log("appointment data not deleted...")
               res.json(err);
          }else{
               console.log("appointment data deleted...")
               res.json(result)
          }
     })
}



module.exports={appoinmentGet,appoinmentPost,appoinmentUpdate,appoinmentDelete,appoinmentGetdata,getDoctorDtl}