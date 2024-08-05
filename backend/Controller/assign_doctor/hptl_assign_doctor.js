
const connection = require('../../Model/db_config')

const DA_Get = (req, res) => {
     const { id, emp_id } = req.params;
     const sql = 'SELECT r.id, e.emp_name FROM hptl_employee e INNER JOIN hptl_assign_doctor ra ON e.emp_id = ra.emp_id INNER JOIN hptl_appointment r ON ra.id = r.id';


     connection.query(sql, [emp_id, id], (err, result) => {
       if (err) {
         return res.status(500).json({ error: 'Failed to fetch role assignment' });
       }
       if (result.length === 0) {
         return res.status(404).json({ message: 'Role assignment not found' });
       }
       res.status(200).json(result);
     });
   }

   const DA_byId = (req, res) => {
     const sqlQuery = "SELECT * FROM hptl_assign_doctor WHERE id = ?";
     const getDataById = [req.params.id]; // Assuming emp_id is a URL parameter

     connection.query(sqlQuery, getDataById, (error, result) => {
          if (error) {
               res.status(500).json({ error: "Error fetching data" });
          } else {
               res.json(result);
          }
     });
};

const DA_Post = (req, res) => {
     const userData = req.body;
   
     const sqlQuery = "INSERT INTO hptl_assign_doctor SET ?";
   
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
   

   const DA_Update = (req, res) => {
     const data = req.body;
     const id = req.params.id;
 
     const sql = `UPDATE hptl_assign_doctor SET emp_id = ? WHERE id = ?`;
 
     connection.query(sql, [data.emp_id, id], (err, result) => {
         if (err) {
             console.log('Error updating data...');
             res.json(err);
         } else {
             console.log('Data updated successfully...');
             res.json(result);
         }
     });
 };
 

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



const DA_Delete = (req, res) => {
     const {  id } = req.params;
     const sql = 'DELETE FROM hptl_assign_doctor WHERE  id = ?';
     connection.query(sql, [ id], (err, result) => {
       if (err) {
         return res.status(500).json({ error: 'Failed to delete role assignment' });
       }
       res.status(200).json({ message: 'Role assignment deleted successfully' });
     });
   }


module.exports={DA_Get,DA_Post,DA_Update,DA_Delete,DA_byId}