const connection = require("../../../Model/db_config")
//////////GET METHOD:
const getEmployee = async(req,res)=>{
    let sqlQuery ="SELECT COUNT(lab_id) FROM hptl_labs";
    await connection.query(sqlQuery,function(err,result){
        if(err)
            console.log("error",err.sqlMessage)
        else
            // res.send(result)
            res.json(result[0])
    })
}



 
module.exports ={ getEmployee };