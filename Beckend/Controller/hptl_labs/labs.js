const connection = require('../../Model/db_config')

const labsGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_labs`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("labs data not here..")
               res.send(err)
          }else{
               console.log("labs data is here..")
               res.send(result)
          }
     })
}

const labGetData = (req, res) => {
     const lab_id = req.params.lab_id;
     const sql = 'SELECT * FROM hptl_labs WHERE lab_id = ?';

     connection.query(sql, [lab_id], (err, result) => {
          if (err) {
               console.error('Error getting lab data:', err);
               res.status(500).json({ error: 'Internal server error' });
          } else {
               if (result.length === 0) {
                    console.log('lab not found.');
                    res.status(404).json({ error: 'lab not found' });
               } else {
                    console.log('lab data retrieved successfully.');
                    res.json(result[0]);
               }
          }
     });
};


const labsPost = (req, res) => {
     let labData = req.body;
     const sql = `INSERT INTO hptl_labs SET ?`;
     connection.query(sql, [labData], (err, result) => {
          if (err) {
               console.error('Error inserting lab data:', err);
               res.status(500).json({ error: 'Internal server error' });
          } else {
               console.log('Lab data inserted successfully.');
               res.json(result);
          }
     });
};


const labsUpdate = (res,req)=>{
   
     const data = req.body;
     const emp_id = req.params.lab_id;
     const sql =`UPDATE hptl_labs SET WHERE lab_id = ?`;
     connection.query(sql,[data,emp_id],(err,result)=>{
          if(err){
               console.log('lab not getting...')
               res.json(err)
          }else{
               console.log('lab is getting...')
               res.json(result)
          }
     })
}

const labsDelete = (res,req)=>{
     const lab = req.params.lab_id;
     const sql =`DELETE from hptl_labs WHERE test_id = ?`
     connection.query(sql,lab,(err,result)=>{
          if(err){
               console.log('lab not getting...')
               res.json(err)
          }else{
               console.log('lab is getting...')
               res.json(result)
          }
     })
}

module.exports={labsGet,labGetData,labsPost,labsUpdate,labsDelete}