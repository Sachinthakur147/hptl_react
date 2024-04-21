const connection = require('../../Model/db_config')

const roomGet =(req,res)=>{
     const sql =`SELECT *FROM hptl_rooms`;
     connection.query(sql,(err,result)=>{
          if(err){
               console.log("role data not here..")
               res.send(err)
          }else{
               console.log("role data is here..")
               res.send(result)
          }
     })
}


const roomPost = (req, res) => {
     const deptData = req.body;
     const sql = `INSERT INTO hptl_rooms SET ?`;
 
     connection.query(sql, deptData, (err, result) => {
         if (err) {
             console.log("Error occurred while adding department:", err);
             res.status(500).json({ error: "An error occurred while adding department." });
         } else {
             console.log('Department added successfully.');
             res.json({ success: true, message: "Department added successfully.", data: result });
         }
     });
 };
 
const roomUpdate = (req,res)=>{
   
     const data = req.body;
     const room_id = req.params.room_id;
     const sql =`UPDATE hptl_rooms SET WHERE room_id = ?`;
     connection.query(sql,[data,room_id],(err,result)=>{
          if(err){
               console.log('room data not updating...')
               res.json(err)
          }else{
               console.log('room data updating...')
               res.json(result)
          }
     })
}

// const roomDelete = (res,req)=>{
//      const room = req.params.room_id;
//      const sql ='DELETE from hptl_rooms WHERE room_id = ?'
//      connection.query(sql,room,(err,result)=>{
//           if(err){
//                console.log('room not getting...')
//                res.json(err)
//           }else{
//                console.log('room is getting...')
//                res.json(result)
//           }
//      })
// }
const roomDelete = (req, res) => {
     const room = req.params.room_id;
     const sql = 'DELETE FROM hptl_rooms WHERE room_id = ?';
     connection.query(sql, room, (err, result) => {
          if (err) {
               console.log('Error deleting room:', err);
               res.status(500).json({ error: 'Error deleting room' });
          } else {
               console.log('Room deleted successfully');
               res.json({ message: 'Room deleted successfully',result});
          }
     });
};


module.exports={roomGet,roomPost,roomUpdate,roomDelete}