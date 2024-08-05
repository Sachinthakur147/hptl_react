const connection = require("../../Model/db_config");

const roleGet = (req, res) => {
  const sql = `SELECT *FROM hptl_roles`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("role data not here..");
      res.send(err);
    } else {
      console.log("role data updated here..");
      res.send(result);
    }
  });
};

// const roleGetdata =(req,res)=>{
//      const sql =`SELECT *FROM hptl_roles`;
//      connection.query(sql,(err,result)=>{
//           if(err){
//                console.log("role data not here..")
//                res.send(err)
//           }else{
//                console.log("role data is here..")
//                res.send(result)
//           }
//      })
// }
const roleGetdata = (req, res) => {
  const role_id = req.params.roll_id;
  const sql = 'SELECT * FROM hptl_roles  WHERE roll_id = ?';
  connection.query(sql, [role_id], (err, result) => {
    if (err) {
      console.error("Error while fetching department data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("role data fetched successfully");
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "role data not found" });
      }
    }
  });
};

const rolePost = (req, res) => {
  let em_Data = req.body;
  const sql = "INSERT INTO hptl_roles SET ?";

  connection.query(sql, em_Data, (err, result) => {
    if (err) {
      console.error("Error while inserting role:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Role inserted successfully");
      res.status(200).json(result);
    }
  });
};

const roleUpdate = (req, res) => {
  const data = req.body;
  const roll_id = req.params.roll_id;
  const sql = "UPDATE hptl_roles SET ? WHERE roll_id = ?";
  // Replace column1, column2, ... with actual column names from your table

  connection.query(sql, [data,roll_id], (err, result) => {
    if (err) {
      console.log("Roles data not updating...", err);
      res.status(500).json({ error: "An error occurred while updating roles data." });
    } else {
      console.log("Roles data updated successfully.");
      res.status(200).json({ message: "Roles data updated successfully.", result });
    }
  });
};

// const roleUpdate = (req, res) => {
//   const data = req.body
//   const roll_id = req.params.roll_id;
//   const sql = "UPDATE hptl_roles SET ? WHERE roll_id = ?";
//   connection.query(sql, [data, roll_id], (err, result) => {
//     if (err) {
//       console.log("roles data not updating...", err);
//       res
//         .status(500)
//         .json({ error: "An error occurred while updating roles data." });
//     } else {
//       console.log("roles data updated successfully.");
//       res
//         .status(200)
//         .json({ message: "Roles data updated successfully.", result });
//     }
//   });
// };

const roleDelete = (req, res) => {
  const roll_id = req.params.roll_id;
  const sql = `DELETE FROM hptl_roles WHERE roll_id = ?`;
  connection.query(sql, roll_id, (err, result) => {
    if (err) {
      console.error("Error while deleting role:", err);
      logging;
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Role deleted successfully");
      res.status(200).json(result);
    }
  });
};

module.exports = { roleGet, rolePost, roleUpdate, roleDelete, roleGetdata };
