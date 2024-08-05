const connection = require('../../Model/db_config')



const RA_Get = (req, res) => {
     const { emp_id, roll_id } = req.params;
     const sql = 'SELECT e.emp_id, r.roll_name FROM hptl_employee e INNER JOIN hptl_role_assign ra ON e.emp_id = ra.emp_id INNER JOIN hptl_roles r ON ra.roll_id = r.roll_id';
     connection.query(sql, [emp_id, roll_id], (err, result) => {
       if (err) {
         return res.status(500).json({ error: 'Failed to fetch role assignment' });
       }
       if (result.length === 0) {
         return res.status(404).json({ message: 'Role assignment not found' });
       }
       res.status(200).json(result);
     });
   }

   const RA_byId = (req, res) => {
     const sqlQuery = "SELECT * FROM hptl_role_assign WHERE emp_id = ?";
     const getDataById = [req.params.emp_id]; // Assuming emp_id is a URL parameter

     connection.query(sqlQuery, getDataById, (error, result) => {
          if (error) {
               res.status(500).json({ error: "Error fetching data" });
          } else {
               res.json(result);
          }
     });
};

const RA_Post = (req, res) => {
     const userData = req.body;
   
     const sqlQuery = "INSERT INTO hptl_role_assign SET ?";
   
     connection.query(sqlQuery, userData, (error, result) => {
       if (error) {
         // Handle database query error
         console.error("Error inserting role assignment:", error);
         res.status(500).json({ error: 'Failed to insert role assignment' });
       } else {
         // Role assignment successfully inserted
         console.log("Role assignment inserted successfully:", result);
         res.status(201).json({ message: 'Role assignment inserted successfully', result });
       }
     });
   };
   

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

// const RA_Delete = (res,req)=>{
//      const lab = req.params.emp_id;
//      const sql =`DELETE from hptl_role_assign WHERE emp_id = ?`
//      connection.query(sql,lab,(err,result)=>{
//           if(err){
//                console.log('role data not getting...')
//                res.json(err)
//           }else{
//                console.log('role data is getting...')
//                res.json(result)
//           }
//      })
// }


const RA_revock = (req, res) => {
  const {roll_id,emp_id} = req.body;

  const sqlQuery = "DELETE FROM hptl_role_assign WHERE roll_id = ? AND emp_id = ?";

  connection.query(sqlQuery, [roll_id,emp_id], (error, result) => {
    if (error) {
      // Handle database query error
      console.error("Error inserting role assignment:", error);
      res.status(500).json({ error: 'Failed to insert role assignment' });
    } else {
      // Role assignment successfully inserted
      console.log("Role assignment inserted successfully:", result);
      res.status(201).json({ message: 'Role assignment deleted successfully', result });
    }
  });
};


const RA_Delete = (req, res) => {
     const { emp_id, roll_id } = req.params;
     const sql = 'DELETE FROM hptl_role_assign WHERE emp_id = ? AND roll_id = ?';
     connection.query(sql, [emp_id, roll_id], (err, result) => {
       if (err) {
         return res.status(500).json({ error: 'Failed to delete role assignment' });
       }
       res.status(200).json({ message: 'Role assignment deleted successfully' });
     });
   }


module.exports={RA_Get,RA_Post,RA_Update,RA_Delete,RA_byId,RA_revock}