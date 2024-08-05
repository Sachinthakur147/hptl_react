const connection = require("../../Model/db_config");



const empGet = (req, res) => {
  const sql = `
         SELECT e.emp_id, e.emp_name, e.email, e.qualification, r.roll_name
         FROM hptl_employee e
         LEFT JOIN hptl_role_assign ra ON e.emp_id = ra.emp_id
         LEFT JOIN hptl_roles r ON ra.roll_id = r.roll_id
     `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "No employees found" });
      return;
    }

    const employeeData = {};
    results.forEach((row) => {
      const { emp_id, emp_name, email, qualification, roll_name } = row;
      if (!employeeData[emp_id]) {
        employeeData[emp_id] = {
          emp_id,
          emp_name,
          email,
          qualification,
          roles: [],
        };
      }
      employeeData[emp_id].roles.push(roll_name);
    });

    const responseData = Object.values(employeeData); // Convert dictionary values to array
    res.json(responseData);
  });
};

const emp_Getdata = (req, res) => {
  const dept_id = req.params.emp_id;
  const sql = `select *from hptl_employee where emp_id = ?`;

  connection.query(sql, [dept_id], (err, result) => {
    if (err) {
      console.log("dept data not getting...");
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const empPost = (req, res) => {
  let em_Data = req.body;
  const sql = `INSERT INTO hptl_employee SET ?`;
  connection.query(sql, [em_Data], (err, result) => {
    if (err) {
      console.log("Emp not getting...");
      res.status(500).json({ error: err.message });
    } else {
      console.log("Emp is getting...");
      res.status(201).json({ message: "Employee added successfully", data: result });
    }
  });
};


const empUpdate = (req, res) => {
     const emp_id = req.params.emp_id;
     const { emp_name, email, qualification,roles,password } = req.body;

     const sql = `
         UPDATE hptl_employee
         SET emp_name = ?, email = ?, qualification = ?, password = ?, roles = ?
         WHERE emp_id = ?
     `;

     connection.query(sql, [emp_name, email, qualification, emp_id,roles,password], (err, result) => {
         if (err) {
             console.error('Error updating employee details:', err);
             res.status(500).json({ message: 'Internal server error' });
             return;
         }

         if (result.affectedRows === 0) {
             res.status(404).json({ message: 'Employee not found' });
             return;
         }

         res.json({ message: 'Employee details updated successfully', status: true });
     });
 }

// const empUpdate = (req, res) => {
//   const emp_id = req.params.emp_id;
//   const { emp_name, email, qualification, roll_name } = req.body;

//   // Start a transaction to ensure data consistency across tables
//   connection.beginTransaction((err) => {
//     if (err) {
//       console.error("Error starting transaction:", err);
//       res.status(500).json({ message: "Internal server error" });
//       return;
//     }

//     const updateEmployeeQuery = `
//              UPDATE hptl_employee
//              SET emp_name = ?, email = ?, qualification = ?
//              WHERE emp_id = ?
//          `;
//     connection.query(
//       updateEmployeeQuery,
//       [emp_name, email, qualification, emp_id],
//       (err, result) => {
//         if (err) {
//           connection.rollback(() => {
//             console.error("Error updating employee details:", err);
//             res.status(500).json({ message: "Internal server error" });
//           });
//           return;
//         }

//         const updateRoleQuery = `
//                  UPDATE hptl_role_assign ra
//                  JOIN hptl_roles r ON ra.roll_id = r.roll_id
//                  SET r.roll_name = ?
//                  WHERE ra.emp_id = ?
//              `;
//         connection.query(
//           updateRoleQuery,
//           [roll_name, emp_id],
//           (err, result) => {
//             if (err) {
//               connection.rollback(() => {
//                 console.error("Error updating employee role:", err);
//                 res.status(500).json({ message: "Internal server error" });
//               });
//               return;
//             }

//             connection.commit((err) => {
//               if (err) {
//                 connection.rollback(() => {
//                   console.error("Error committing transaction:", err);
//                   res.status(500).json({ message: "Internal server error" });
//                 });
//                 return;
//               }

//               res.json({
//                 message: "Employee details and role updated successfully",
//                 status: true,
//               });
//             });
//           }
//         );
//       }
//     );
//   });
// };

const empDelete = (res, req) => {
  const em_pro = req.params.emp_id;
  const sql = `DELETE from hptl_employee WHERE emp_id = ?`;
  connection.query(sql, em_pro, (err, result) => {
    if (err) {
      console.log("Emp profile not getting...");
      res.json(err);
    } else {
      console.log("Emp profile is getting...");
      res.json(result);
    }
  });
};



module.exports = { empGet, empPost, empUpdate, empDelete, emp_Getdata };
