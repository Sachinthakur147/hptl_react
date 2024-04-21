const connection = require("../../../Model/db_config")
//////////GET METHOD:
const getEmployee = async(req,res)=>{
    let sqlQuery ="SELECT * FROM hptl_labs COUNT(lab_id)";
    await connection.query(sqlQuery,function(err,result){
        if(err)
            console.log("error",err.sqlMessage)
        else
            // res.send(result)
            res.json(result)
    })
}
// const postEmployee = async(req,res)=>{
//     let userdata = req.body;
//     let sqlQuery ="INSERT INTO employee SET ?";
//     await connection.query(sqlQuery,userdata, function (err, result) { 
//         if(err){
//             console.log("error",err.sqlMessage)
//         }
//         else{
//             res.json(result);
//         }
// })
// };
const postEmployee = async(req,res)=>{
    const userdata = {
        room_id: req.body.room_id,
        
        
      }
      let sqlQuery = "INSERT INTO hptl_rooms SET ?";
    connection.query(sqlQuery, [userdata], (err, result)=>{
      if(err)
        res.send(err)
      else{
        if(result.affectedRows > 0)
          res.send(`${result.affectedRows} employee registered successfully`);
        else
          res.send("Try again!!!")
      }
    })
   
};
//Login API:
// const postLoginEmployee = async(req,res)=>{
//     let sqlQuery ="SELECT email,password FROM employee WHERE email = ? AND password =?";
//     await connection.query(sqlQuery,[req.body.email,req.body.password], function (err, result) { 
//         if(err){
//      return res.json("Login Failed");
//         }
//         if(result.length>0){
//             return res.json("Login Successfully");
//         }
//         else{
//             return res.json("Wrong Credentials")
//         }
// })
// };
////////DELETE Method/////////////
const deleteEmployee =async(req, res)=>{
  let empid = req.query.room_id;
  let sqlQuery = "DELETE FROM hptl_rooms WHERE room_id=?";
  connection.query(sqlQuery, [empid], (err, result)=>{
    if(err){
      res.send(err.sqlMessage)
    }else{
      if(result.affectedRows > 0)
      {
        res.send(`${result.affectedRows} records deleted`)
      }else{
        res.send('Record not found')
      }
    }
  })
};

    
    
 
module.exports ={ getEmployee,postEmployee,deleteEmployee };