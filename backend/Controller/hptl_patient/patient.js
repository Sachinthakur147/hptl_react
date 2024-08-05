const connection = require('../../Model/db_config')

const patientGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_patient`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("patient data not here..")
               res.send(err)
          }else{
               console.log("patient data is here..")
               res.send(result)
          }
     })
}

const patientByDate =(req,res)=>{
     const query = `
     SELECT DATE(date) AS date,  p_name,  age,mobile, sumptoums,gender
     FROM hptl_patient
    ORDER BY DATE(date) DESC
  `;
     const sql =`SELECT *FROM hptl_patient`;
     connection.query(query, (err, results) => {
          if (err) {
            console.error('Error fetching employees:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          const response = results.map(row => ({
               p_name: row.p_name,
               age:row.age,
               mobile:row.mobile,
               gender:row.gender,
               sumptoums:row.sumptoums,
               date: row.date,
             }));

    // Send response with date-wise patient data
    res.json(response);
  });
}
          
         
             // Send response with date-wise employee data
            
          

const patientGetData = (req, res) => {
     const p_id = req.params.p_id;
     const sql = 'SELECT * FROM hptl_patient WHERE p_id = ?';

     connection.query(sql, [p_id], (err, result) => {
          if (err) {
               console.error('Error getting lab data:', err);
               res.status(500).json({ error: 'Internal server error' });
          } else {
               if (result.length === 0) {
                    console.log('lab not found.');
                    res.status(404).json({ error: 'patient not found' });
               } else {
                    console.log('patient data retrieved successfully.');
                    res.json(result[0]);
               }
          }
     });
};

// const patientPost = (res,req)=>{
//      let em_Data = {
//           p_id:req.body.p_id,
//           p_name:req.body.p_name,
//           mobile:req.body.mobile,
//           gender:req.body.gender,
//           age:req.body.age,
//           sumptoums:req.body.sumptoums,
//           date:req.body.data,
//           image:req.file.filename
//      };
//      const sql =`INSERT INTO hptl_patient SET ?`
//      connection.query(sql,[em_Data],(err,result)=>{
//           if(err){
//                console.log('patient not getting...')
//                res.json(err)
//           }else{
//                console.log('patient is getting...')
//                res.json(result)
//           }
//      })
// }

const patientPost = (req, res) => {
     const sql = `INSERT INTO hptl_patient SET ?`;
     let em_Data = {
         p_id: req.body.p_id,
         p_name: req.body.p_name,
         mobile: req.body.mobile,
         gender: req.body.gender,
         age: req.body.age,
         sumptoums: req.body.sumptoums,
         date: req.body.date, 
         image: req.file.location
     };
     
     connection.query(sql,[em_Data], (err, result) => {
         if (err) {
             console.log('patient not getting...');
             res.json(err);
         } else {
             console.log('patient is getting...');
             res.json(result);
         }
     });
 };
 

 const patientUpdate = (req, res) => {
     const data = [
          req.body.p_name,
          req.body.mobile,
          req.body.gender,
          req.body.age,
          req.body.sumptoums,
          req.body.date,
          // req.file.location
     ];
     const p_id = req.params.p_id;
     const sql = `UPDATE hptl_patient SET p_name = ?, mobile = ?, gender = ?, age = ?, sumptoums = ?, date = ?, image = ? WHERE p_id = ?`;
     connection.query(sql, [...data, p_id], (err, result) => {
          if (err) {
               console.log('Error updating patient data:', err.sqlMessage);
               res.status(500).json({ error: 'Error updating patient data' });
          } else {
               console.log('Patient data updated successfully');
               res.status(200).json({ message: 'Patient data updated successfully' });
          }
     });
};


const patientDelete = (req, res) => {
     const p_id = req.params.p_id;
     const sql = `DELETE FROM hptl_patient WHERE p_id = ?`;
     connection.query(sql, [p_id], (err, result) => {
          if (err) {
               console.log('Error deleting patient:', err.sqlMessage);
               res.status(500).json({ error: 'Error deleting patient record' });
          } else {
               console.log('Patient deleted successfully');
               res.status(200).json({ message: 'Patient deleted successfully' });
          }
     });
};


module.exports={patientGet,patientPost,patientUpdate,patientDelete,patientGetData,patientByDate}